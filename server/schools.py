"""NEIS adapter and membership storage. Never accept a client-supplied user ID."""
import json
import os
import re
import sqlite3
import time
from urllib.parse import urlencode
from urllib.request import urlopen

class SchoolError(Exception):
    pass

def search_term(value):
    value = re.sub(r'\s+', '', value.strip())
    # Expand conventional suffixes while leaving the school's identifying name intact.
    for short, full in [('여고', '여자고등학교'), ('여중', '여자중학교'),
                        ('남고', '남자고등학교'), ('남중', '남자중학교'),
                        ('초', '초등학교'), ('중', '중학교'), ('고', '고등학교')]:
        if value.endswith(short) and len(value) > len(short):
            return value[:-len(short)] + full
    return value

class Neis:
    def __init__(self, key=None):
        self.key = key if key is not None else os.environ.get('NEIS_API_KEY', '')
        self.cache = {}

    def search(self, query):
        query = search_term(query)
        if not query or len(query) > 60:
            return []
        if not self.key:
            raise SchoolError('학교 검색 연결을 준비하고 있어요. 잠시 후 다시 시도해 주세요.')
        cached = self.cache.get(query)
        if cached and cached[0] > time.monotonic():
            return cached[1]
        params = urlencode(dict(KEY=self.key, Type='json', pIndex=1, pSize=100, SCHUL_NM=query))
        try:
            with urlopen('https://open.neis.go.kr/hub/schoolInfo?' + params, timeout=8) as response:
                payload = json.load(response)
        except Exception:
            raise SchoolError('학교 정보를 불러오지 못했어요. 다시 시도해 주세요.') from None
        result = payload.get('RESULT', {})
        if result.get('CODE') == 'INFO-200':
            return []
        if result and result.get('CODE') != 'INFO-000':
            raise SchoolError('학교 검색 서비스에 연결할 수 없어요. 잠시 후 다시 시도해 주세요.')
        rows = [row for block in payload.get('schoolInfo', []) for row in block.get('row', [])]
        if not payload.get('schoolInfo'):
            raise SchoolError('학교 검색 응답을 확인할 수 없어요. 다시 시도해 주세요.')
        schools = {}
        for row in rows:
            office, code = row.get('ATPT_OFCDC_SC_CODE'), row.get('SD_SCHUL_CODE')
            if not office or not code or not row.get('SCHUL_NM'):
                continue
            school_id = f'neis:{office}:{code}'
            schools[school_id] = dict(id=school_id, name=row['SCHUL_NM'],
                area=row.get('ORG_RDNMA', '') or row.get('LCTN_SC_NM', ''),
                kind=row.get('SCHUL_KND_SC_NM', ''), officeCode=office, schoolCode=code)
        data = list(schools.values())
        if len(self.cache) >= 256:
            self.cache.clear()
        self.cache[query] = (time.monotonic() + 3600, data)
        return data

class Memberships:
    """For the future Kakao callback: user_id MUST come from verified server session.
    One membership per event/user; switching schools moves the membership atomically.
    school_id MUST be validated against a NEIS result by the calling server.
    """
    def __init__(self, path):
        self.path = path
        with sqlite3.connect(path) as db:
            db.execute('CREATE TABLE IF NOT EXISTS memberships (event_id TEXT NOT NULL, user_id TEXT NOT NULL, school_id TEXT NOT NULL, PRIMARY KEY(event_id, user_id))')
            db.execute('CREATE INDEX IF NOT EXISTS school_members ON memberships(event_id, school_id)')

    def select(self, event_id, user_id, school_id):
        if not user_id:
            raise ValueError('Verified login required')
        if school_id is not None and not re.fullmatch(r'neis:[A-Z]\d+:\d+', school_id):
            raise ValueError('Invalid canonical school ID')
        with sqlite3.connect(self.path) as db:
            if school_id is None:
                db.execute('DELETE FROM memberships WHERE event_id=? AND user_id=?', (event_id, user_id))
            else:
                db.execute('INSERT INTO memberships VALUES (?,?,?) ON CONFLICT(event_id,user_id) DO UPDATE SET school_id=excluded.school_id', (event_id, user_id, school_id))

    def count(self, event_id, school_id):
        with sqlite3.connect(self.path) as db:
            return db.execute('SELECT COUNT(*) FROM memberships WHERE event_id=? AND school_id=?', (event_id, school_id)).fetchone()[0]

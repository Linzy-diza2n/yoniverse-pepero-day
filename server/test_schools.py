import io
import json
import tempfile
import unittest
from unittest.mock import patch
from schools import Neis, SchoolError, search_term, Memberships

class SchoolsTest(unittest.TestCase):
    def test_abbreviations(self):
        for q, expected in [('금호고', '금호고등학교'), ('서울 여고', '서울여자고등학교'), ('서울여중', '서울여자중학교'), ('서울고등학교', '서울고등학교'), ('금호', '금호')]:
            self.assertEqual(search_term(q), expected)

    def test_official_codes_deduplicate_but_distinguish_regions(self):
        rows = [dict(ATPT_OFCDC_SC_CODE='B10', SD_SCHUL_CODE='123', SCHUL_NM='금호고등학교', ORG_RDNMA='서울'), dict(ATPT_OFCDC_SC_CODE='F10', SD_SCHUL_CODE='456', SCHUL_NM='금호고등학교', ORG_RDNMA='광주')]
        payload = {'schoolInfo': [{'row': [rows[0], rows[0], rows[1]]}]}
        with patch('schools.urlopen', return_value=io.BytesIO(json.dumps(payload).encode())):
            results = Neis('test-key').search('금호고')
        self.assertEqual([s['id'] for s in results], ['neis:B10:123', 'neis:F10:456'])

    def test_missing_key_and_empty_result(self):
        with self.assertRaises(SchoolError): Neis('').search('서울고')
        with patch('schools.urlopen', return_value=io.BytesIO(b'{"RESULT":{"CODE":"INFO-200"}}')):
            self.assertEqual(Neis('test-key').search('없는학교'), [])

    def test_unique_members_and_school_change(self):
        with tempfile.TemporaryDirectory() as directory:
            db = Memberships(directory + '/test.sqlite')
            a, b = 'neis:B10:123', 'neis:F10:456'
            db.select('2026', 'verified-user-1', a)
            db.select('2026', 'verified-user-1', a)
            db.select('2026', 'verified-user-2', a)
            self.assertEqual(db.count('2026', a), 2)
            db.select('2026', 'verified-user-1', b)
            self.assertEqual(db.count('2026', a), 1)
            self.assertEqual(db.count('2026', b), 1)
            db.select('2026', 'verified-user-1', None)
            self.assertEqual(db.count('2026', b), 0)
            with self.assertRaises(ValueError): db.select('2026', '', a)
            with self.assertRaises(ValueError): db.select('2026', 'user', '금호고')

if __name__ == '__main__': unittest.main()

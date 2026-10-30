"""Local static preview plus server-side NEIS search proxy."""
import json
import os
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit, parse_qs
from schools import Neis, SchoolError

ROOT = Path(__file__).resolve().parents[1]
# Read only the expected secret; never serve the repository root or .env.
env = ROOT / '.env'
if env.exists() and not os.environ.get('NEIS_API_KEY'):
    for line in env.read_text().splitlines():
        if line.startswith('NEIS_API_KEY='):
            os.environ['NEIS_API_KEY'] = line.split('=', 1)[1].strip().strip('\"\'')
neis = Neis()

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT / 'cabinet-preview'), **kwargs)

    def do_GET(self):
        url = urlsplit(self.path)
        if url.path == '/api/schools':
            query = parse_qs(url.query).get('q', [''])[0]
            try:
                body, status = {'schools': neis.search(query)}, 200
            except SchoolError as error:
                body, status = {'error': str(error)}, 503
            data = json.dumps(body, ensure_ascii=False).encode()
            self.send_response(status)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Cache-Control', 'no-store')
            self.send_header('Content-Length', str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        elif url.path.startswith('/api/'):
            self.send_error(404)
        else:
            super().do_GET()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', '4174'))
    print(f'Preview: http://127.0.0.1:{port} (NEIS configured: {bool(neis.key)})', flush=True)
    ThreadingHTTPServer(('127.0.0.1', port), Handler).serve_forever()

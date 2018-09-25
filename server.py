#!/usr/bin/python
import re
from http.server import BaseHTTPRequestHandler, HTTPServer
from os import curdir, sep
import sys

PORT_NUMBER = int(sys.argv[1]) if len(sys.argv) > 1 else 8080


class RequestHandler(BaseHTTPRequestHandler):
    def _get_extension(self, path):
        try:
            return re.findall(r'\.(.+)$', path)[0]
        except Exception as e:
            return None

    def _get_mime_type(self, ext):
        types = {
            'js': 'application/javascript',
            'css': 'text/css',
            'html': 'text/html',
            'svg': 'image/svg+xml',
            'png': 'image/png',
            'jpg': 'image/jpeg'
            # images, other files, etc...
        }
        try:
            return types[ext]
        except KeyError:
            return 'text/html'

    def send_file(self, path, mime):
        with open(curdir + sep + 'public' + sep + path) as f:
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Content-type', mime)
            self.end_headers()
            self.wfile.write(bytes(f.read(), 'utf8'))

    def do_GET(self):
        if self.path == '/data':
            self.send_file('dashboard_data.json', 'application/json')
            return

        ext = self._get_extension(self.path)
        if ext is None:
            self.send_file('index.html', 'text/html')
            return

        try:
            self.send_file(self.path, self._get_mime_type(ext))
            return

        except IOError:
            self.send_error(404, 'File Not Found: %s' % self.path)
        except Exception as e:
            self.send_error(500, e)


if __name__ == '__main__':
    server = None
    try:
        server = HTTPServer(('localhost', PORT_NUMBER), RequestHandler)
        print('Http server started on port %s' % PORT_NUMBER)
        server.serve_forever()

    except KeyboardInterrupt:
        print('KeyboardInterrupt, exiting...')
        if server:
            server.server_close()

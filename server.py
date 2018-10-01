#!/usr/bin/python3
import re
from http.server import BaseHTTPRequestHandler, HTTPServer
from os import curdir, sep
import sys

PORT_NUMBER = 3030
try:
    data_dir = 'public' if sys.argv[1] else 'build'
except IndexError:
    data_dir = 'build'


class RequestHandler(BaseHTTPRequestHandler):
    def _get_extension(self, path):
        ext = ''
        i = len(path)-1
        while(path[i] != '.' and i >= 0):
            ext += path[i]
            i -= 1
        return ext[::-1]

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
        needs_slash = sep if path[0] != '/' else ''
        compiled_path = curdir + sep + data_dir + needs_slash + path
        with open(compiled_path, 'rb') as f:
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Content-type', mime)
            self.end_headers()
            self.wfile.write(f.read())

    def do_GET(self):
        if self.path == '/data':
            self.send_file('dashboard_data.json', 'application/json')
            return

        ext = self._get_extension(self.path)
        if ext is None or self.path[-1] == '/':
            self.send_file(self.path+'index.html', 'text/html')
            return

        try:
            self.send_file(self.path, self._get_mime_type(ext))
            return

        except IOError as err:
            print(err)
            self.send_error(404, 'File Not Found: %s' % self.path)
        except Exception as err:
            print(err)
            self.send_error(500, err)


if __name__ == '__main__':
    server = None
    try:
        server = HTTPServer(('localhost', PORT_NUMBER), RequestHandler)
        print('Http server started on http://localhost:%s' % PORT_NUMBER)
        server.serve_forever()

    except KeyboardInterrupt:
        print('KeyboardInterrupt, exiting...')
        if server:
            server.server_close()

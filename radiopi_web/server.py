import http.server
import socketserver
import os

WWW_DIR = os.path.join(os.path.dirname(__file__), 'www')
os.chdir(WWW_DIR)

Handler = http.server.SimpleHTTPRequestHandler

def run(address='0.0.0.0', port=8020):
    with socketserver.TCPServer((address, port), Handler) as httpd:
        print("serving at port ", port, " from ", WWW_DIR)
        httpd.serve_forever()
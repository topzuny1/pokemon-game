from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, template_folder='.', static_folder='.', static_url_path='')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<filename>')
def serve_file(filename):
    return send_from_directory('.', filename)

@app.route('/css/<filename>')
def serve_css(filename):
    return send_from_directory('./css', filename)

@app.route('/js/<filename>')
def serve_js(filename):
    return send_from_directory('./js', filename)

@app.route('/images/<filename>')
def serve_images(filename):
    return send_from_directory('./images', filename)

if __name__ == '__main__':
    print("🎮 포켓몬 웹 서버 시작!")
    print("📍 http://localhost:5000 에 접속하세요")
    print("🛑 종료하려면 Ctrl+C를 누르세요\n")
    app.run(debug=True, host='localhost', port=5000)

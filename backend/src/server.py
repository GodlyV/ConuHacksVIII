import json
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from pathlib import Path
import os
import pathlib
import json
# from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
# CORS(app)
srcDir = str(pathlib.Path().resolve())+"/src"

@app.route('/api/v1/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(host="localhost", port=3001, debug=True)
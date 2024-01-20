import json
from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
import pathlib
import uuid  # Import UUID for unique file naming

load_dotenv()

app = Flask(__name__)
srcDir = str(pathlib.Path().resolve()) + "/backend/src/wardrobes/"  # Ensure the path ends with '/'

@app.route('/api/v1/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

@app.route('/api/v1/getWardrobe', methods=['GET'])
def getWardrobe():
    # Get wardrobe name from query parameters
    wardrobe_name = request.args.get('name')
    if not wardrobe_name:
        return jsonify({'error': 'Name parameter is missing'}), 400

    try:
        with open(f'{srcDir}{wardrobe_name}.json') as json_file:
            data = json.load(json_file)
            return jsonify(data)
    except FileNotFoundError:
        return jsonify({'error': 'Wardrobe not found'}), 404

@app.route('/api/v1/getWardrobes', methods=['GET'])
def getWardrobes():
    try:
        files = os.listdir(srcDir)
        data = []
        for file in files:
            with open(f'{srcDir}{file}') as json_file:
                data.append(json.load(json_file))
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({'error': 'Wardrobes not found'}), 404

@app.route('/api/v1/saveWardrobe', methods=['POST'])
def saveWardrobe():
    data = request.get_json()
        
    # Extract the name parameter from JSON body
    wardrobe_name = data.get('name')
    if not wardrobe_name:
        return jsonify({'error': 'Name parameter is missing'}), 400

    # Construct the file path
    file_path = os.path.join(srcDir, f'{wardrobe_name}.json')

    # Check if the file already exists
    if os.path.exists(file_path):
        return jsonify({'error': 'A wardrobe with this name already exists'}), 409

    # Write the JSON data to the file
    try:
        with open(file_path, 'w') as outfile:
            json.dump(data, outfile)
        return jsonify({'status': 'ok', 'name': wardrobe_name})
    except IOError as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/v1/updateWardrobe', methods=['PUT'])
def updateWardrobe():
    data = request.get_json()
        
    # Extract the name parameter from JSON body
    wardrobe_name = data.get('name')
    if not wardrobe_name:
        return jsonify({'error': 'Name parameter is missing'}), 400

    # Construct the file path
    file_path = os.path.join(srcDir, f'{wardrobe_name}.json')

    # Check if the file already exists
    if not os.path.exists(file_path):
        return jsonify({'error': 'Wardrobe not found'}), 404

    # Write the JSON data to the file
    try:
        with open(file_path, 'w') as outfile:
            json.dump(data, outfile)
        return jsonify({'status': 'ok', 'name': wardrobe_name})
    except IOError as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/v1/deleteWardrobe', methods=['DELETE'])
def deleteWardrobe():
    # Get wardrobe name from query parameters
    wardrobe_name = request.args.get('name')
    if not wardrobe_name:
        return jsonify({'error': 'Name parameter is missing'}), 400

    # Construct the file path
    file_path = os.path.join(srcDir, f'{wardrobe_name}.json')

    # Check if the file already exists
    if not os.path.exists(file_path):
        return jsonify({'error': 'Wardrobe not found'}), 404

    # Delete the file
    try:
        os.remove(file_path)
        return jsonify({'status': 'ok', 'name': wardrobe_name})
    except IOError as e:
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(host="localhost", port=3001, debug=True)

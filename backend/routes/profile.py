from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os
import uuid
from .. import db

profile_blueprint = Blueprint('profile', __name__)

# Helper functions
def save_image(file):
    filename = secure_filename(file.filename)
    file_extension = os.path.splitext(filename)[1].lower()
    allowed_extensions = ['.jpg', '.jpeg', '.png', '.webp']
    if file_extension not in allowed_extensions:
        return None, "Invalid file type"
    
    if file.content_length > 5 * 1024 * 1024:
        return None, "File size exceeds 5MB"

    new_filename = str(uuid.uuid4()) + file_extension
    upload_folder = 'static/uploads/'
    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, new_filename)
    file.save(file_path)
    return file_path, None

def delete_file(file_path):
    try:
        os.remove(file_path)
    except FileNotFoundError:
        pass

@profile_blueprint.route('/upload-picture', methods=['POST'])
def upload_picture():
    user_id = request.user_id
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    file_path, error = save_image(file)
    if error:
        return jsonify({"error": error}), 400

    user = db.users.find_one({'_id': user_id})
    if user.get('profile_picture'):
        delete_file(user['profile_picture'])

    db.users.update_one({'_id': user_id}, {'$set': {'profile_picture': file_path}})
    return jsonify({"message": "Profile picture updated successfully"}), 200

@profile_blueprint.route('/remove-picture', methods=['DELETE'])
def remove_picture():
    user_id = request.user_id
    user = db.users.find_one({'_id': user_id})
    if user.get('profile_picture'):
        delete_file(user['profile_picture'])
        db.users.update_one({'_id': user_id}, {'$unset': {'profile_picture': ""}})
        return jsonify({"message": "Profile picture removed successfully"}), 200
    else:
        return jsonify({"error": "No profile picture found"}), 404

@profile_blueprint.route('/change-password', methods=['POST'])
def change_password():
    user_id = request.user_id
    data = request.get_json()
    old_password = data.get('old_password')
    new_password = data.get('new_password')

    if not old_password or not new_password:
        return jsonify({"error": "Missing required fields"}), 400

    user = db.users.find_one({'_id': user_id})
    if not check_password_hash(user['password'], old_password):
        return jsonify({"error": "Invalid old password"}), 401

    new_password_hash = generate_password_hash(new_password)
    db.users.update_one({'_id': user_id}, {'$set': {'password': new_password_hash}})
    return jsonify({"message": "Password changed successfully"}), 200

from flask import Blueprint, request, jsonify
from backend import db


admin_blueprint = Blueprint('admin', __name__)

# Create a new user account
@admin_blueprint.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing required data"}), 400

    required_fields = ['firstName', 'lastName', 'email', 'gender', 'dateOfBirth', 'accountType', 'address', 'postalCode', 'state', 'country', 'currency', 'password', 'pin']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400

    existing_user = db.users.find_one({'email': data['email']})
    if existing_user:
        return jsonify({"error": "Email already taken"}), 400

    if data['password'] != data.get('confirmPassword'):
        return jsonify({"error": "Passwords do not match"}), 400

    user_data = {
        'firstName': data['firstName'],
        'middleName': data.get('middleName', ''),
        'lastName': data['lastName'],
        'email': data['email'],
        'gender': data['gender'],
        'dateOfBirth': data['dateOfBirth'],
        'accountType': data['accountType'],
        'address': data['address'],
        'postalCode': data['postalCode'],
        'state': data['state'],
        'country': data['country'],
        'currency': data['currency'],
        'password': data['password'],
        'pin': data['pin'],
        'agreeToTerms': data['agreeToTerms'],
        'blocked': False
    }

    db.users.insert_one(user_data)
    return jsonify({"message": "User account created successfully"}), 201

# Edit a user's account
@admin_blueprint.route('/users/<email>', methods=['PATCH'])
def edit_user(email):
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing required data"}), 400

    db.users.update_one({'email': email}, {'$set': data})
    return jsonify({"message": "User account updated successfully"}), 200

# Block a user's account
@admin_blueprint.route('/users/<email>/block', methods=['PUT'])
def block_user(email):
    db.users.update_one({'email': email}, {'$set': {'blocked': True}})
    return jsonify({"message": "User account blocked successfully"}), 200

# Unblock a user's account
@admin_blueprint.route('/users/<email>/unblock', methods=['PUT'])
def unblock_user(email):
    db.users.update_one({'email': email}, {'$set': {'blocked': False}})
    return jsonify({"message": "User account unblocked successfully"}), 200

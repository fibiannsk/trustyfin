import random
from flask import Blueprint, request, jsonify
from bson import ObjectId
from datetime import datetime
from backend.extensions import db  # assuming Mongo client is set up
import traceback

admin_blueprint = Blueprint('admin', __name__)

def safe_str(obj):
    """Convert object to string, return None if fails."""
    try:
        return str(obj)
    except Exception:
        return None

def format_date(dt, fmt="%Y-%m-%d"):
    if isinstance(dt, datetime):
        return dt.strftime(fmt)
    return dt  # leave as-is if already string or None

def generate_unique_account_number():
    prefix = "00103"
    while True:
        # 7 random digits → total length = 12
        suffix = str(random.randint(10**6, 10**7 - 1))
        account_number = prefix + suffix

        # check uniqueness in DB
        if not db.users.find_one({"accountNumber": account_number}):
            return account_number

@admin_blueprint.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing required data"}), 400

    required_fields = [
        'firstName', 'lastName', 'email', 'gender', 'dateOfBirth',
        'accountType', 'address', 'postalCode', 'state', 'country',
        'currency', 'password', 'pin'
    ]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400

    existing_user = db.users.find_one({'email': data['email']})
    if existing_user:
        return jsonify({"error": "Email already taken"}), 400

    if data['password'] != data.get('confirmPassword'):
        return jsonify({"error": "Passwords do not match"}), 400

    user_data = {
        "_id": ObjectId(),
        "firstName": data['firstName'],
        "middleName": data.get('middleName', ''),
        "lastName": data['lastName'],
        "email": data['email'],
        "gender": data['gender'],
        "dateOfBirth": data['dateOfBirth'],
        "accountType": data['accountType'],
        "address": data['address'],
        "postalCode": data['postalCode'],
        "state": data['state'],
        "country": data['country'],
        "currency": data['currency'],
        "password": data['password'],  # ⚠️ should hash in production
        "pin": data['pin'],
        "agreeToTerms": data.get('agreeToTerms', True),
        "blocked": False,
        "accountNumber": generate_unique_account_number(),
        "balance": 0.0,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow(),
        "role": "user"  # default role
    }

    db.users.insert_one(user_data)

    return jsonify({
        "message": "User account created successfully",
        "userId": str(user_data["_id"]),
        "accountNumber": user_data["accountNumber"]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    }), 201


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

# ---------------- Get All Users and Transactions ----------------
@admin_blueprint.route("/all-data", methods=["GET"])
def get_all_data():
    try:
        users = list(db.users.find({}))
        for user in users:
            user["_id"] = str(user["_id"])
            user["dateOfBirth"] = format_date(user.get("dateOfBirth"))
            user["createdAt"] = format_date(user.get("createdAt"), "%Y-%m-%d %H:%M:%S")
            user["updatedAt"] = format_date(user.get("updatedAt"), "%Y-%m-%d %H:%M:%S")

        transactions = list(db.transactions.find({}))
        for tx in transactions:
            tx["_id"] = str(tx["_id"])
            tx["user_id"] = str(tx.get("user_id"))

        return jsonify({
            "users": users,
            "transactions": transactions
        }), 200

    except Exception as e:
        import traceback
        print(traceback.format_exc())
        return jsonify({"error": "Internal server error"}), 500

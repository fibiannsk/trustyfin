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
        # Fetch users
        users = list(db.users.find({}))
        formatted_users = []
        for user in users:
            try:
                formatted_users.append({
                    "_id": safe_str(user.get("_id")),
                    "accountNumber": user.get("accountNumber"),
                    "name": user.get("name", ""),
                    "email": user.get("email", ""),
                    "phone": user.get("phone", "—"),
                    "balance": user.get("balance", 0),
                    "status": user.get("status", "Active"),
                    "accountType": user.get("accountType", "Standard"),
                    "password": user.get("password", ""),
                    "pin": user.get("pin", ""),
                    "joinDate": format_date(user.get("joinDate"), "%Y-%m-%d"),
                })
            except Exception as e:
                print(f"Error formatting user {user.get('_id')}: {e}")
                continue  # skip problematic user

        # Fetch transactions
        transactions = list(db.transactions.find({}))
        formatted_transactions = []
        for tx in transactions:
            try:
                formatted_transactions.append({
                    "_id": safe_str(tx.get("_id")),
                    "user_id": safe_str(tx.get("user_id")),
                    "amount": tx.get("amount", 0),
                    "type": tx.get("type", ""),
                    "status": tx.get("status", ""),
                    "createdAt": tx.get("createdAt")  # optional, or format if needed
                })
            except Exception as e:
                print(f"Error formatting transaction {tx.get('_id')}: {e}")
                continue

        return jsonify({
            "users": formatted_users,
            "transactions": formatted_transactions
        }), 200

    except Exception:
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500
    

# Get user by account number
# backend/routes/admin/admin.py (continued)

@admin_blueprint.route("/user/<accountNumber>", methods=["GET"])
def get_user_by_account_number(accountNumber):
    try:
        user = db.users.find_one({"accountNumber": accountNumber})
        if not user:
            return jsonify({"error": "User not found"}), 404

        payload = {
            "_id": safe_str(user.get("_id")),
            "accountNumber": user.get("accountNumber"),
            "firstName": user.get("firstName", ""),
            "lastName": user.get("lastName", ""),
            "name": user.get("name", ""),
            "email": user.get("email", ""),
            "phone": user.get("phone", "—"),
            "balance": user.get("balance", 0),
            "status": user.get("status", "Active"),
            "accountType": user.get("accountType", "Standard"),
            "joinDate": user.get("joinDate", None),
            "password": user.get("password", ""),
            "pin": user.get("pin", "")
        }
        return jsonify(payload), 200
    except Exception:
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500


@admin_blueprint.route("/user/<accountNumber>", methods=["PATCH", "OPTIONS"])
def update_user(accountNumber):
    try:
        data = request.get_json()

        # Find the user
        user = db.users.find_one({"accountNumber": accountNumber})
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Only update fields provided in the payload (ignore nulls and _id)
        update_fields = {}
        for key, value in data.items():
            if key == "_id":  # 🚫 never allow updating _id
                continue
            if value is not None:  # ignore null values
                update_fields[key] = value

        if update_fields:
            db.users.update_one(
                {"accountNumber": accountNumber},
                {"$set": update_fields}
            )

        # 🔧 Return the updated user (exclude _id so frontend doesn’t send it back again)
        updated_user = db.users.find_one(
            {"accountNumber": accountNumber},
            {"_id": 0}  # exclude _id from response
        )
        return jsonify(updated_user), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500








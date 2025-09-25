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

def build_full_name(user):
    if not user:
        return "Unknown"
    parts = [
        user.get("firstName", "").strip(),
        user.get("middleName", "").strip(),
        user.get("lastName", "").strip(),
    ]
    return " ".join([p for p in parts if p]).strip() or "Unknown"

def format_timestamp(ts):
    """Convert MongoDB timestamp (datetime or string) to a readable format."""
    if not ts:
        return ""
    try:
        if isinstance(ts, datetime):
            return ts.strftime("%b %d, %Y %I:%M %p")
        # if stored as ISO string
        return datetime.fromisoformat(str(ts).replace("Z", "+00:00")).strftime("%b %d, %Y %I:%M %p")
    except Exception:
        return safe_str(ts)

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
                # get sender (initiator) info
                user_id = tx.get("user_id")
                user = None

                if user_id:
                    if isinstance(user_id, str):
                        if ObjectId.is_valid(user_id):
                            user = db.users.find_one({"_id": ObjectId(user_id)})
                        else:
                            user = db.users.find_one({"_id": user_id})
                    else:
                        user = db.users.find_one({"_id": user_id})

                formatted_transactions.append({
                    "_id": safe_str(tx.get("_id")),
                    "user_id": safe_str(user_id),
                    "initiator_name": build_full_name(user),
                    "initiator_account": user.get("accountNumber") if user else "Unknown",
                    "from_account": tx.get("from_account", ""),
                    "beneficiary_bank": tx.get("beneficiary_bank", ""),
                    "beneficiary_account": tx.get("beneficiary_account", ""),
                    "beneficiary_name": tx.get("beneficiary_name", ""),
                    "amount": tx.get("amount", 0),
                    "narration": tx.get("narration", ""),
                    "timestamp": format_timestamp(tx.get("timestamp")),  # ✅ formatted
                    "type": tx.get("type", ""),
                    "status": tx.get("status", "")
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

@admin_blueprint.route("/user/<accountNumber>", methods=["DELETE"])
def delete_user(accountNumber):
    try:
        user = db.users.find_one({"accountNumber": accountNumber})
        if not user:
            return jsonify({"error": "User not found"}), 404

        db.users.delete_one({"accountNumber": accountNumber})

        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500


from bson import ObjectId
from flask import request, jsonify

@admin_blueprint.route('/user/<user_id>/status', methods=['PATCH'])
def update_user_status(user_id):
    data = request.get_json()

    if "blocked" not in data:
        return jsonify({"error": "Missing 'blocked' field"}), 400

    blocked_status = bool(data["blocked"])

    try:
        # Convert string ID to ObjectId
        object_id = ObjectId(user_id)
    except Exception:
        return jsonify({"error": "Invalid user ID"}), 400

    result = db.users.update_one(
        {"_id": object_id},
        {"$set": {"blocked": blocked_status}}
    )

    if result.matched_count == 0:
        return jsonify({"error": "User not found"}), 404

    message = (
        "User account blocked successfully"
        if blocked_status
        else "User account unblocked successfully"
    )

    return jsonify({"message": message}), 200


@admin_blueprint.route("/transactions/<string:tx_id>", methods=["PATCH"])
def update_transaction(tx_id):
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # ensure valid ObjectId
        try:
            tx_obj_id = ObjectId(tx_id)
        except:
            return jsonify({"error": "Invalid transaction ID"}), 400

        transaction = db.transactions.find_one({"_id": tx_obj_id})
        if not transaction:
            return jsonify({"error": "Transaction not found"}), 404

        # ✅ Allowed fields to update (added timestamp)
        allowed_fields = [
            "amount",
            "type",
            "beneficiary_name",
            "beneficiary_account",
            "beneficiary_bank",
            "narration",
            "status",
            "timestamp",  # ✅ included here
        ]

        update_data = {}

        for field in allowed_fields:
            if field in data:
                value = data[field]

                # 🔧 Normalize timestamp to datetime
                if field == "timestamp" and value:
                    import datetime
                    if isinstance(value, datetime.datetime):
                        update_data["timestamp"] = value
                    elif isinstance(value, (int, float)):
                        # assume epoch milliseconds
                        update_data["timestamp"] = datetime.datetime.fromtimestamp(
                            value / 1000
                        )
                    elif isinstance(value, str):
                        try:
                            # try ISO format first
                            update_data["timestamp"] = datetime.datetime.fromisoformat(
                                value.replace("Z", "+00:00")
                            )
                        except ValueError:
                            try:
                                # try your UI’s format "Sep 22, 2025 06:16 AM"
                                update_data["timestamp"] = datetime.datetime.strptime(
                                    value, "%b %d, %Y %I:%M %p"
                                )
                            except Exception:
                                return jsonify({"error": f"Invalid timestamp format: {value}"}), 400
                else:
                    update_data[field] = value

        if update_data:
            db.transactions.update_one(
                {"_id": tx_obj_id},
                {"$set": update_data}
            )

        # ✅ Fetch updated transaction
        updated_tx = db.transactions.find_one({"_id": tx_obj_id})

        # format timestamp safely
        ts_value = None
        if "timestamp" in updated_tx and updated_tx["timestamp"]:
            try:
                ts_value = updated_tx["timestamp"].isoformat()
            except Exception:
                ts_value = str(updated_tx["timestamp"])

        response = {
            "message": "Transaction updated successfully",
            "transaction": {
                "id": str(updated_tx["_id"]),
                "user_id": str(updated_tx.get("user_id")),
                "from_account": updated_tx.get("from_account"),
                "beneficiaryBank": updated_tx.get("beneficiary_bank"),
                "beneficiaryAccount": updated_tx.get("beneficiary_account"),
                "beneficiaryName": updated_tx.get("beneficiary_name"),
                "amount": updated_tx.get("amount"),
                "narration": updated_tx.get("narration"),
                "type": updated_tx.get("type"),
                "status": updated_tx.get("status", "pending"),
                "timestamp": ts_value,
            },
        }

        return jsonify(response), 200

    except Exception as e:
        print("❌ Error updating transaction:", e)
        import traceback; traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500








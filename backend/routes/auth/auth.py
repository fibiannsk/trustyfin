from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from backend.extensions import db

auth_blueprint = Blueprint("auth", __name__)

# ---------------- User/Admin Login ----------------
@auth_blueprint.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # First, check the admins collection
    admin = db.admins.find_one({"email": email})
    if admin and admin["password"] == password:
        # ✅ Admins don’t use JWT
        access_token = create_access_token(identity=str(admin["_id"]))
        return jsonify({
            "id": str(admin["_id"]),
            "email": admin["email"],
            "role": admin.get("role", "superadmin"),
            "token": access_token
        })

    # Then, check the users collection
    user = db.users.find_one({"email": email})
    if user and user["password"] == password:
        # ✅ Users get JWT
        access_token = create_access_token(identity=str(user["_id"]))
        return jsonify({
            "id": str(user["_id"]),
            "email": user["email"],
            "role": user.get("role", "user"),  # fallback to "user"
            "token": access_token
        })

    # If no match
    return jsonify({"error": "Invalid email or password"}), 401
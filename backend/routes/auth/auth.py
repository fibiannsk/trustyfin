from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import timedelta

from backend.extensions import db

auth_blueprint = Blueprint("auth", __name__)

# ---------------- User Login ----------------
@auth_blueprint.route("/", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    user = db.users.find_one({"email": email})
    if not user or user.get("password") != password:
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(
        identity=str(user["_id"]),
        #expires_delta=timedelta(hours=1)  # token expiry
    )

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": {
            "id": str(user["_id"]),
            "email": user["email"],
            "firstName": user.get("firstName"),
            "lastName": user.get("lastName"),
        }
    }), 200



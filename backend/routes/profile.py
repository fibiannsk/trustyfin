from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from werkzeug.utils import secure_filename
import os
import uuid

from ..extensions import db

profile_blueprint = Blueprint("profile", __name__)


# ---------------- Helper functions ----------------
def save_image(file):
    filename = secure_filename(file.filename)
    file_extension = os.path.splitext(filename)[1].lower()
    allowed_extensions = [".jpg", ".jpeg", ".png", ".webp"]

    if file_extension not in allowed_extensions:
        return None, "Invalid file type"

    if file.content_length and file.content_length > 5 * 1024 * 1024:  # 5MB limit
        return None, "File size exceeds 5MB"

    new_filename = f"{uuid.uuid4()}{file_extension}"
    upload_folder = "static/uploads/"
    os.makedirs(upload_folder, exist_ok=True)

    file_path = os.path.join(upload_folder, new_filename)
    file.save(file_path)
    return file_path, None


def delete_file(file_path):
    try:
        os.remove(file_path)
    except FileNotFoundError:
        pass


# ---------------- Profile Endpoints ----------------
@profile_blueprint.route("/profile", methods=["GET", "OPTIONS"])
@jwt_required()
def get_user_profile():

    if request.method == "OPTIONS":
        return "", 204  # Handle CORS preflight

    user_id = get_jwt_identity()
    try:
        # Check if the ID belongs to a user
        user = db.users.find_one({"_id": ObjectId(user_id)})
        if user:
            transactions = list(db.transactions.find({"user_id": ObjectId(user_id)}))
            for tx in transactions:
                tx["_id"] = str(tx["_id"])
                tx["user_id"] = str(tx["user_id"])

            beneficiaries = list(db.beneficiaries.find({"user_id": ObjectId(user_id)}))
            for ben in beneficiaries:
                ben["_id"] = str(ben["_id"])
                ben["user_id"] = str(ben["user_id"])

            return jsonify({
                "id": str(user["_id"]),
                "role": "user",
                "name": f"{user.get('firstName', '')} {user.get('lastName', '')}".strip(),
                "email": user.get("email"),
                "balance": user.get("balance", 0),
                "pin": user.get("pin"),
                "account_number": user.get("account_number") or user.get("accountNumber"),
                "profile_picture": user.get("profile_picture"),
                "transactions": transactions,
                "beneficiaries": beneficiaries,
            }), 200

        return jsonify({"error": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@profile_blueprint.route("/upload-picture", methods=["POST"])
@jwt_required()
def upload_picture():
    user_id = ObjectId(get_jwt_identity())

    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    file_path, error = save_image(file)
    if error:
        return jsonify({"error": error}), 400

    user = db.users.find_one({"_id": user_id})
    if user and user.get("profile_picture"):
        delete_file(user["profile_picture"])

    db.users.update_one({"_id": user_id}, {"$set": {"profile_picture": file_path}})
    return jsonify({"message": "Profile picture updated successfully"}), 200


@profile_blueprint.route("/remove-picture", methods=["DELETE"])
@jwt_required()
def remove_picture():
    user_id = ObjectId(get_jwt_identity())
    user = db.users.find_one({"_id": user_id})

    if user and user.get("profile_picture"):
        delete_file(user["profile_picture"])
        db.users.update_one({"_id": user_id}, {"$unset": {"profile_picture": ""}})
        return jsonify({"message": "Profile picture removed successfully"}), 200

    return jsonify({"error": "No profile picture found"}), 404


@profile_blueprint.route("/change-password", methods=["POST"])
@jwt_required()
def change_password():
    user_id = ObjectId(get_jwt_identity())
    data = request.get_json()

    old_password = data.get("old_password")
    new_password = data.get("new_password")

    if not old_password or not new_password:
        return jsonify({"error": "Missing required fields"}), 400

    user = db.users.find_one({"_id": user_id})
    if not user or user.get("password") != old_password:
        return jsonify({"error": "Invalid old password"}), 401

    db.users.update_one({"_id": user_id}, {"$set": {"password": new_password}})
    return jsonify({"message": "Password changed successfully"}), 200

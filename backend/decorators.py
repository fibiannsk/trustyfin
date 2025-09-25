from functools import wraps
from flask import jsonify
from backend.extensions import db
from flask_jwt_extended import get_jwt_identity
from bson import ObjectId

def block_check_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = get_jwt_identity()

        # Fetch the user from DB
        user = db.users.find_one({'_id': ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        # If blocked, stop here
        if user.get('blocked', False):
            return jsonify({"error": "Account is blocked"}), 403
        
        return f(*args, **kwargs)
    return decorated_function

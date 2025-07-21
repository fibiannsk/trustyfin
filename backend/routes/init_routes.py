from flask import Blueprint, jsonify, current_app  # ✅ include current_app
import hashlib  # ✅ used for password hashing
from pymongo import MongoClient

init_bp = Blueprint('init_bp', __name__)

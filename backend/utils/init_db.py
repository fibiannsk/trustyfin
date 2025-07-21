# backend/utils/init_db.py

from datetime import datetime

def initialize_database(mongo):
    admin_collection = mongo.db.admins

    existing_admin = admin_collection.find_one({"username": "admin"})
    if not existing_admin:
        admin = {
            "username": "admin",
            "password": "admin123",  # hash this if bcrypt is enabled
            "email": "admin@bank.com",
            "role": "admin",
            "permissions": {
                "create_user": True,
                "delete_user": True,
                "edit_user": True,
                "block_user": True
            },
            "created_at": datetime.utcnow()
        }
        admin_collection.insert_one(admin)
        print("Admin user created.")
    else:
        print("Admin already exists.")

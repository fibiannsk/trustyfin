from .extensions import db
from datetime import datetime


def ensure_super_admin(db):
    superadmin = db.admins.find_one({"role": "superadmin"})
    if not superadmin:
        superadmin_data = {
            "username": "superadmin",
            "email": "superadmin@db.com",
            "password": "SuperSecurePassword123",  # hash it!
            "full_name": "Super Admin",
            "role": "superadmin",
            "permissions": {
                "create_user": True,
                "edit_user": True,
                "edit_balance": True,
                "delete_user": True,
                "block_user": True,
                "unblock_user": True
            },
            "created_at": datetime.utcnow(),
            "status": "active"
        }
        result = db.admins.insert_one(superadmin_data)
        print(f"Super admin created with id: {result.inserted_id}")

        sadmin = db.admins.find_one({"_id": result.inserted_id})
        print("Super Admin Info:", sadmin)
    else:
        print("Super admin already exists.")

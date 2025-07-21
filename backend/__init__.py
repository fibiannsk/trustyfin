from flask import Flask
from .routes.init_routes import init_bp
from .routes.init_routes import admin_blueprint
from dotenv import load_dotenv
import os
from .extensions import mongo_client, db
from pymongo import MongoClient
from .superadmin import ensure_super_admin
from .extensions import db
# from .target.dash import target
# from .login_manager_setup import login_manager

def create_app(config_name):
    # ..
    load_dotenv() 
    app = Flask(__name__)


# Configure app
    app.config['SECRET_KEY'] = 'secret'
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_TYPE"] = "filesystem"
    app.config['DEBUG'] = True


    global mongo_client, db
    
    mongo_uri = os.getenv("MONGO_URI")
    if not mongo_uri:
        raise RuntimeError("MONGO_URI not set in environment variables")
    
    mongo_client = MongoClient(mongo_uri)
    db = mongo_client.get_database("bnkin")  # uses default DB from URI or specify e.g. get_database("mydbname")

     # Register blueprints or routes
   # app.register_blueprint(user_routes.user_bp, url_prefix="/user")
   app.register_blueprint(admin_routes.admin_bp, url_prefix="/admin")
   app.register_blueprint(transfer_blueprint, url_prefix="/transfer")

    # login_manager.init_app(app)

    # app.register_blueprint(target)
    # .. 

    @app.route("/")
    def init_superadmin():
        ensure_super_admin(db)
        return {"message": "Super admin check complete."}
        
    return app

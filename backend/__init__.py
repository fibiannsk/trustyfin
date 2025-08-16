from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from .superadmin import ensure_super_admin
from .extensions import db

# Import blueprints
from .routes.profile import profile_blueprint
from .routes.admin.admin import admin_blueprint
from .routes.transfer import transfer_blueprint
from .routes.auth.auth import auth_blueprint

# from .routes.init_routes import init_bp
# from .target.dash import target
# from .login_manager_setup import login_manager

jwt = JWTManager()


def create_app(config_name="default"):
    # Load environment variables
    load_dotenv()

    app = Flask(__name__)

    # JWT Configuration
    app.config['JWT_SECRET_KEY'] = 'super-secret'  # TODO: load from env
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    app.config["JWT_HEADER_NAME"] = "Authorization"
    app.config["JWT_HEADER_TYPE"] = "Bearer"
    jwt.init_app(app)

    # App Config
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config['SECRET_KEY'] = 'secret'
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_TYPE"] = "filesystem"
    app.config['DEBUG'] = True

    # CORS setup
    CORS(
        app,
        supports_credentials=True,
        origins=["http://localhost:5173"]
    )

    # JWT Error Handlers
    @jwt.unauthorized_loader
    def custom_unauthorized(err_msg):
        print("🔥 jwt.unauthorized_loader – error:", err_msg)
        return jsonify({"error": "Missing or invalid JWT"}), 401

    @jwt.invalid_token_loader
    def custom_invalid_token(err_msg):
        print("🔥 jwt.invalid_token_loader – error:", err_msg)
        return jsonify({"error": "Invalid JWT"}), 422

    @jwt.expired_token_loader
    def custom_expired_token(jwt_header, jwt_payload):
        print("🔥 jwt.expired_token_loader – token has expired")
        return jsonify({"error": "Token expired"}), 401

    # Register blueprints
    app.register_blueprint(profile_blueprint, url_prefix="/profile")
    app.register_blueprint(admin_blueprint, url_prefix="/admin")
    app.register_blueprint(transfer_blueprint, url_prefix="/transfer")
    app.register_blueprint(auth_blueprint, url_prefix="/auth")

    # login_manager.init_app(app)
    # app.register_blueprint(target)

    @app.route("/")
    def init_superadmin():
        ensure_super_admin(db)
        return {"message": "Super admin check complete."}

    return app

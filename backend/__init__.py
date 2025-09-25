import os
from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from flask_cors import CORS   # ✅ import here too
from flask import Flask, render_template

from .superadmin import ensure_super_admin
from .extensions import db
from .extensions import mail
from .celery_app import make_celery

# Import blueprints
from .routes.profile import profile_blueprint
from .routes.admin.admin import admin_blueprint
from .routes.transfer import transfer_blueprint
from .routes.auth.auth import auth_blueprint

jwt = JWTManager()


def create_app(config_name="default"):
    # Load environment variables
    load_dotenv()

    app = Flask(
        __name__,
        template_folder="landing/templates",
        static_url_path="/static",
        static_folder=os.path.join(os.getcwd(), "static")
    )
    app.url_map.strict_slashes = False

    # JWT Configuration
    app.config['JWT_SECRET_KEY'] = 'super-secret'  # TODO: load from env
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    app.config["JWT_HEADER_NAME"] = "Authorization"
    app.config["JWT_HEADER_TYPE"] = "Bearer"
    jwt.init_app(app)

    # App Config
    app.config['SECRET_KEY'] = 'secret'
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_TYPE"] = "filesystem"
    app.config['DEBUG'] = True

    # ✅ Gmail SMTP configuration (loaded from env for safety)
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")     # your Gmail
    app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")     # your App Password
    app.config['MAIL_DEFAULT_SENDER'] = ("TrustyFin Bank", os.getenv("MAIL_USERNAME"))


    mail.init_app(app)
    celery = make_celery(app)  # bind celery to app  # 👈 create a Mail instance (will be initialized later)


    # ✅ CORS setup (official way)
    CORS(
        app,
        resources={r"/*": {"origins": ["http://127.0.0.1:5173", "http://localhost:5173"]}},
        supports_credentials=True,
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"]
    )

    # ❌ REMOVE this block (conflicts with flask_cors)
    # @app.after_request
    # def handle_cors(response):
    #     response.headers["Access-Control-Allow-Origin"] = "*"
    #     response.headers["Access-Control-Allow-Credentials"] = "true"
    #     response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    #     response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    #     return response

    # JWT Error Handlers
    @jwt.unauthorized_loader
    def custom_unauthorized(err_msg):
        return jsonify({"error": "Missing or invalid JWT"}), 401

    @jwt.invalid_token_loader
    def custom_invalid_token(err_msg):
        return jsonify({"error": "Invalid JWT"}), 422

    @jwt.expired_token_loader
    def custom_expired_token(jwt_header, jwt_payload):
        return jsonify({"error": "Token expired"}), 401

    # Register blueprints
    app.register_blueprint(profile_blueprint, url_prefix="/profile")
    app.register_blueprint(admin_blueprint, url_prefix="/admin")
    app.register_blueprint(transfer_blueprint, url_prefix="/transfer")
    app.register_blueprint(auth_blueprint, url_prefix="/auth")

   # 👇 homepage route
    @app.route("/")
    def home():
        ensure_super_admin(db)
        return render_template("landing_page.html")

    return app

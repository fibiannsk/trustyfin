from flask import Blueprint, render_template

landing_bp = Blueprint(
    "landing", __name__,
    template_folder="templates",
    static_folder="static"
)

@landing_bp.route("/")
def home():
    return render_template("pages/landing_page.html")

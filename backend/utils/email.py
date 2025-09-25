# utils/email.py
import os
import tempfile
import subprocess
from datetime import datetime
from jinja2 import Template
from flask_mail import Message
from flask import current_app

# import the 'mail' object you created in your package __init__.py
# e.g. from yourapp import mail
from backend import mail   # adjust import to match actual package name

def mjml_to_html(rendered_mjml: str) -> str:
    """
    Convert MJML string to HTML by calling the 'mjml' CLI.
    Requires 'mjml' (npm package) installed and available in PATH.
    """
    # Write MJML to a temporary file
    with tempfile.NamedTemporaryFile(suffix=".mjml", delete=False, mode="w", encoding="utf-8") as tmp:
        tmp.write(rendered_mjml)
        tmp_path = tmp.name

    try:
        # Call mjml CLI to output HTML to stdout
        # --stdout (or -s) writes result to stdout; we capture it.
        proc = subprocess.run(
            ["mjml", tmp_path, "--stdout"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=False
        )
        if proc.returncode != 0:
            # If conversion fails, log and raise or return None
            err = proc.stderr.decode(errors="ignore")
            current_app.logger.error(f"MJML conversion failed: {err}")
            raise RuntimeError(f"MJML conversion failed: {err}")
        html = proc.stdout.decode("utf-8")
        return html
    finally:
        try:
            os.remove(tmp_path)
        except Exception:
            pass

def send_transaction_email(
    recipient_email: str,
    customer_name: str,
    amount: str,
    transaction_type: str,
    balance: str,
    narration: str,
    mjml_template_str: str = None
):
    """
    Render MJML template with data, convert to HTML using mjml CLI, send with Flask-Mail.
    mjml_template_str: if None, load from a default file path in repo.
    """
    # If caller didn't provide inline template, load default file:
    if mjml_template_str is None:
        # adjust the path to where you put the template
        tpl_path = os.path.join(os.path.dirname(__file__), "..", "templates", "email", "transaction.mjml")
        with open(tpl_path, "r", encoding="utf-8") as f:
            mjml_template_str = f.read()

    # Render MJML with Jinja2
    template = Template(mjml_template_str)
    rendered_mjml = template.render(
        customer_name=customer_name,
        amount=amount,
        transaction_type=transaction_type,
        balance=balance,
        date=datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    )

    try:
        html = mjml_to_html(rendered_mjml)
    except Exception as e:
        # fallback: if conversion fails, send a plain-text email
        current_app.logger.exception("MJML conversion failed, sending plain-text fallback.")
        body = f"Hello {customer_name},\n\nA {transaction_type} of {amount} occurred. New balance: {balance}.\n\nDate: {datetime.utcnow().isoformat()} UTC"
        msg = Message(
            subject=f"Transaction Alert: {transaction_type} of {amount}",
            recipients=[recipient_email],
            body=body
        )
        mail.send(msg)
        return

    # Send HTML email
    msg = Message(
        subject=f"Transaction Alert: {transaction_type} of {amount}",
        recipients=[recipient_email],
        html=html
    )
    mail.send(msg)

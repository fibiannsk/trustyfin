# yourapp/tasks/email_tasks.py
import os
from datetime import datetime
from jinja2 import Template
from flask_mail import Message
from flask import current_app
from marshmallow import Schema, fields, ValidationError
import bleach
from backend.celery_app import make_celery
from flask import current_app
from backend.extensions import mail
from backend.utils.mjml_converter import mjml_to_html_via_cli, get_precompiled_html


celery = make_celery(current_app)
# Schema for validating incoming payloads
class TransactionSchema(Schema):
    email = fields.Email(required=True)
    customer_name = fields.Str(required=True)
    amount = fields.Str(required=True)  # formatted string "$500.00"
    transaction_type = fields.Str(required=True)  # CREDIT or DEBIT
    currency = fields.Str(required=True)  # e.g. "USD"
    maskedAccountNumber = fields.Str(required=True)
    narration = fields.Str(required=True)
    reference = fields.Str(required=True)
    dateTime = fields.Str(required=True)  # formatted "%d-%b-%Y %H:%M"
    availableBalance = fields.Str(required=True)  # formatted "500,000.00"
    clearedBalance = fields.Str(required=True)
    template = fields.Str(missing="transaction")  # default template
    accountNumber = fields.Str(required=True)
    status = fields.Str(required=True)

def sanitize(value: str) -> str:
    # allow simple text formatting; strip scripts etc
    return bleach.clean(value, strip=True)

@celery.task(bind=True, max_retries=5, autoretry_for=(Exception,), retry_backoff=True, retry_backoff_max=600)
def send_transaction_email_task(self, payload: dict):
    """
    Asynchronous task to render MJML -> HTML and send email.
    Retries automatically on exceptions (exponential backoff).
    """
    schema = TransactionSchema()
    try:
        data = schema.load(payload)
    except ValidationError as e:
        current_app.logger.error("Invalid payload for send_transaction_email_task: %s", e.messages)
        raise

    recipient = data["email"]
    # sanitize user-provided fields
    customer_name = sanitize(data["customer_name"])
    amount = sanitize(data["amount"])
    transaction_type = sanitize(data["transaction_type"])
    balance = sanitize(data["balance"])
    template_name = data.get("template", "transaction")

    # Try precompiled HTML first
    compiled_html = get_precompiled_html(template_name)
    if compiled_html:
        html = Template(compiled_html).render(
            customer_name=customer_name,
            amount=amount,
            transaction_type=transaction_type,
            balance=balance,
            date=datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
        )
    else:
        # load MJML template, render with Jinja, then convert
        tpl_path = os.path.join(
            current_app.root_path, "templates", "email", f"{template_name}.mjml"
        )
        if not os.path.exists(tpl_path):
            raise RuntimeError(f"Template not found: {tpl_path}")
        with open(tpl_path, "r", encoding="utf-8") as f:
            mjml_tpl = f.read()
        rendered_mjml = Template(mjml_tpl).render(
            customer_name=customer_name,
            amount=amount,
            transaction_type=transaction_type,
            balance=balance,
            date=datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
        )
        # Convert to HTML using mjml CLI
        html = mjml_to_html_via_cli(rendered_mjml)

    # Build and send email
    subject = f"Transaction Alert: {transaction_type} of {amount}"
    msg = Message(
        subject=subject,
        recipients=[recipient],
        html=html
    )

    try:
        mail.send(msg)
        current_app.logger.info("Sent transaction email to %s for %s", recipient, transaction_type)
    except Exception as exc:
        current_app.logger.exception("Failed to send email to %s: %s", recipient, exc)
        # Let celery retry it
        raise

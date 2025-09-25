# yourapp/utils/mjml_converter.py
import os
import tempfile
import subprocess
from flask import current_app

TEMPLATES_DIR = os.path.join(os.path.dirname(__file__), "..", "templates", "email")
PRECOMPILED_DIR = os.path.join(os.path.dirname(__file__), "..", "templates", "email", "compiled")

def mjml_to_html_via_cli(mjml_str: str) -> str:
    """
    Convert MJML string to HTML by calling mjml CLI. Raises RuntimeError on failure.
    """
    with tempfile.NamedTemporaryFile(suffix=".mjml", delete=False, mode="w", encoding="utf-8") as tmp:
        tmp.write(mjml_str)
        tmp_path = tmp.name

    try:
        proc = subprocess.run(
            ["mjml", tmp_path, "--stdout"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=False
        )
        if proc.returncode != 0:
            err = proc.stderr.decode(errors="ignore")
            current_app.logger.error("MJML CLI error: %s", err)
            raise RuntimeError(f"MJML conversion failed: {err}")
        return proc.stdout.decode("utf-8")
    finally:
        try:
            os.remove(tmp_path)
        except Exception:
            pass

def get_precompiled_html(template_name: str):
    """
    If we precompiled the template, return compiled HTML string.
    """
    path = os.path.join(PRECOMPILED_DIR, f"{template_name}.html")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    return None

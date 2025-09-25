# celery_app.py
import os
from celery import Celery
from dotenv import load_dotenv

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
CELERY_BROKER_URL = REDIS_URL
CELERY_RESULT_BACKEND = REDIS_URL

def make_celery(app=None):
    """
    Create and configure a Celery app tied to Flask app context.
    """
    celery = Celery(
        app.import_name if app else __name__,
        broker=CELERY_BROKER_URL,
        backend=CELERY_RESULT_BACKEND,
    )
    celery.conf.update(
        task_serializer="json",
        accept_content=["json"],
        result_serializer="json",
        timezone="UTC",
        enable_utc=True,
    )

    # Attach Flask app context to tasks
    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            if app:
                with app.app_context():
                    return self.run(*args, **kwargs)
            else:
                # lazily import and get app if not passed
                from backend import create_app  # adjust package name
                flask_app = create_app()
                with flask_app.app_context():
                    return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery

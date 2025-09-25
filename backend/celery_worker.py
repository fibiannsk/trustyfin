from backend import create_app
from backend.celery_app import make_celery

flask_app = create_app()
celery = make_celery(flask_app)

# Import tasks so Celery knows them
import backend.tasks.email_tasks

import os
from api import create_app, db
from api.models import Subject, Beat, Rating
from flask_migrate import Migrate

app = create_app(os.getenv("FLASK_CONFIG") or "default")
migrate = Migrate(app, db)

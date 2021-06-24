from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_admin import Admin
from flask_basicauth import BasicAuth

from config import config

db = SQLAlchemy()
ma = Marshmallow()
admin = Admin(name="admin", template_mode="bootstrap4")
auth = BasicAuth()

def create_app(config_name):
    app = Flask(__name__) 
    app.config.from_object(config[config_name]) 
    config[config_name].init_app(app)

    # Extensions
    db.init_app(app)
    ma.init_app(app)
    admin.init_app(app)
    auth.init_app(app)
    CORS(app)

    # Flask admin settings
    from api.models import Subject, Beat, Rating
    from api.admin_config import NewModelView

    admin.add_view(NewModelView(Subject, db.session))
    admin.add_view(NewModelView(Beat, db.session))
    admin.add_view(NewModelView(Rating, db.session))

    # Blueprints
    from api.blueprints.v1 import api_blueprint
    app.register_blueprint(api_blueprint, url_prefix="/api")

    # @app.route("/sounds/<path:path>", methods=["GET"])
    # def get_sound(path):
    #     return send_from_directory(app.config["SOUND_DIR"], path)
    
    return app

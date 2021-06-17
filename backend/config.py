import os

BASE_DIR = os.path.dirname(__file__)

class Config(object):
    BASE_DIR = BASE_DIR

    SECRET_KEY = os.environ.get('SECRET_KEY')
    BASIC_AUTH_USERNAME = os.environ.get('BASIC_AUTH_USERNAME')
    BASIC_AUTH_PASSWORD = os.environ.get('BASIC_AUTH_PASSWORD')

    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, "db.sqlite3")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SOUND_DIR = os.path.join(BASE_DIR, "../sounds")
    SOUND_URL = os.environ.get("SOUND_URL") or "/sounds/"

    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    pass

class ProductionConfig(Config):
    pass

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

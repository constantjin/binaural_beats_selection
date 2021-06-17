from flask import Blueprint
from api.resources.subject import SubjectAPI
from api.resources.beat import BeatAPI
from api.resources.sound import SoundAPI
from api.resources.rating import RatingAPI

api_blueprint = Blueprint("api", __name__)
subject_views = SubjectAPI.as_view("subject_api")
beat_views = BeatAPI.as_view("beat_api")
sound_views = SoundAPI.as_view("sound_api")
rating_views = RatingAPI.as_view("rating_api")

api_blueprint.add_url_rule("/subjects", view_func=subject_views, methods=["POST",])
api_blueprint.add_url_rule("/beats", view_func=beat_views, methods=["POST",])
api_blueprint.add_url_rule("/sounds", view_func=sound_views, methods=["GET",])
api_blueprint.add_url_rule("/ratings", view_func=rating_views, methods=["POST",])



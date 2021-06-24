from flask import request
from flask.views import MethodView

from api import db
from api.models import Beat, BeatSchema, Subject

beat_schema = BeatSchema()

class BeatAPI(MethodView):
    def post(self):
        json_post = request.get_json()

        # Validation
        errors = beat_schema.validate(json_post)
        if errors:
            return {"status": "error", "data": errors}, 400
        
        beat = Beat(**json_post)
        db.session.add(beat)
        db.session.commit()

        result = beat_schema.dump(beat)
        return {"status": "success", "data": result}, 201

        

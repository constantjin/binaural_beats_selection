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

        subject_present = Subject.query.filter_by(id=json_post["subject_id"]).first()
        if not subject_present:
            return {"status":"error", "data": {"subject_id": ["No such subject."]}}, 400

        same_beat_row = Beat.query.filter_by(subject_id=json_post["subject_id"], sound_name=json_post["sound_name"]).first()
        if same_beat_row:
            return {"status":"error", "data": {"subject_id": ["Duplicated subject id + sound name pair."]}}, 400
        
        beat = Beat(**json_post)
        db.session.add(beat)
        db.session.commit()

        result = beat_schema.dump(beat)
        return {"status": "success", "data": result}, 201

        

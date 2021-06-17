from flask import request
from flask.views import MethodView

from api import db
from api.models import Rating, RatingSchema, Subject

rating_schema = RatingSchema() 

class RatingAPI(MethodView):
    def post(self):
        json_post = request.get_json()

        # Validation
        errors = rating_schema.validate(json_post)
        if errors:
            return {"status": "error", "data": errors}, 400

        subject_present = Subject.query.filter_by(id=json_post["subject_id"]).first()
        if not subject_present:
            return {"status":"error", "data": {"subject_id": ["No such subject."]}}, 400
        
        same_rating_row = Rating.query.filter_by(id=json_post["subject_id"], sound_name=json_post["sound_name"], order=json_post["order"]).first()
        if same_rating_row:
            return {"status":"error", "data": {"subject_id": ["Duplicated subject id + sound name + order pair."]}}, 400
        
        rating = Rating(**json_post)
        db.session.add(rating)
        db.session.commit()

        result = rating_schema.dump(rating)
        return {"status": "success", "data": result}, 201

        
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
        
        rating = Rating(**json_post)
        db.session.add(rating)
        db.session.commit()

        result = rating_schema.dump(rating)
        return {"status": "success", "data": result}, 201

        
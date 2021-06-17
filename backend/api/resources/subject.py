from flask import request
from flask.views import MethodView

from api import db
from api.models import Subject, SubjectSchema

subject_schema = SubjectSchema() 

class SubjectAPI(MethodView):
    def post(self):
        json_post = request.get_json()

        # Validation
        errors = subject_schema.validate(json_post)
        if errors:
            return {"status": "error", "data": errors}, 400

        same_subject_number = Subject.query.filter_by(subject_number=json_post["subject_number"]).first()
        if same_subject_number:
            return {"status":"error", "data": {"subject_number": ["Duplicated subject number."]}}, 400
        
        subject = Subject(**json_post)
        db.session.add(subject)
        db.session.commit()

        result = subject_schema.dump(subject)
        return {"status": "success", "data": result}, 201

        

from marshmallow_sqlalchemy.schema import auto_field
from api import db, ma
from marshmallow import ValidationError

class Subject(db.Model):
    __tablename__ = "subjects"
    
    id = db.Column(db.Integer, primary_key=True)
    subject_number = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(20), nullable=False)
    volume = db.Column(db.Float, nullable=False)
    IADS_volume = db.Column(db.Float, nullable=True)
    beats = db.relationship("Beat", backref="subject", cascade="all, delete")
    ratings = db.relationship("Rating", backref="subject", cascade="all, delete")

    def __repr__(self):
        return f"BB{self.subject_number}/{self.name}/DB_id:{self.id}"

class Beat(db.Model):
    __tablename__ = "beats"
    
    id = db.Column(db.Integer, primary_key=True)
    subject_id = db.Column(db.Integer, db.ForeignKey("subjects.id"), nullable=False)
    sound_name = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(20))
    carrier_freq = db.Column(db.Integer, nullable=False)
    band_freq = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"BB{self.subject.subject_number}/{self.sound_name}/Carrier:{self.carrier_freq}Hz/Band:{self.band_freq}Hz"

class Rating(db.Model):
    __tablename__ = "ratings"

    id = db.Column(db.Integer, primary_key=True)
    subject_id = db.Column(db.Integer, db.ForeignKey("subjects.id"), nullable=False)
    sound_name = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(20))
    order = db.Column(db.String(10), nullable=False)
    arousal = db.Column(db.Integer, nullable=False)
    dominance = db.Column(db.Integer, nullable=False)
    valence = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"BB{self.subject.subject_number}/{self.sound_name}({self.order})/A:{self.arousal}/D:{self.dominance}/V:{self.valence}"

class SubjectSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Subject

class BeatSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Beat
        include_fk = True

# def either_pre_or_post(data):
#     if data not in ["pre", "post"]:
#         raise ValidationError("Should be either 'pre' or 'post'.")

# def rating_score_range(data):
#     if data < 0 or data > 9:
#         raise ValidationError("Rating score should be in a range [0, 9].")

class RatingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Rating
        include_fk = True
    
    # order = auto_field(validate=either_pre_or_post)
    # arousal = auto_field(validate=rating_score_range)
    # dominance = auto_field(validate=rating_score_range)
    # valence = auto_field(validate=rating_score_range)
    


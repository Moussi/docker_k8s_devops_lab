from app.main_app import db
import datetime
from marshmallow import fields, Schema


class RentalSchema(Schema):
  """
  Rental Schema
  """
  id = fields.Int(dump_only=True)
  title = fields.Str(required=True)
  city = fields.Str(required=True)
  street = fields.Str(required=True)
  category = fields.Str(required=True)
  image = fields.Str(required=True)
  bedrooms = fields.Int(required=True)
  shared = fields.Bool(required=True)
  daily_rate = fields.Int(required=True)
  description = fields.Str(required=True)
  created_at = fields.DateTime(dump_only=True)
  modified_at = fields.DateTime(dump_only=True)
  user_id = fields.Int(required=True)



class Rental(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(128), index=True, unique=True)
  city = db.Column(db.String(128), index=True, unique=True)
  street = db.Column(db.String(128), index=True, unique=True)
  category = db.Column(db.String(128), index=True, unique=True)
  image = db.Column(db.String(128), index=True, unique=True)
  bedrooms = db.Column(db.Integer)
  shared = db.Column(db.Boolean)
  daily_rate = db.Column(db.Integer)
  description = db.Column(db.String(256), index=True, unique=True)
  created_at = db.Column(db.DateTime, index=True, default=datetime.datetime.utcnow)
  modified_at = db.Column(db.DateTime, index=True, default=datetime.datetime.utcnow)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


  def __init__(self, data):
    self.user_id = data.get('user_id')
    self.title = data.get('title')
    self.city = data.get('city')
    self.street = data.get('street')
    self.category = data.get('category')
    self.image = data.get('image')
    self.bedrooms = data.get('bedrooms')
    self.shared = data.get('shared')
    self.daily_rate = data.get('daily_rate')
    self.description = data.get('description')
    self.created_at = datetime.datetime.utcnow()
    self.modified_at = datetime.datetime.utcnow()



  def save(self):
    db.session.add(self)
    db.session.commit()


  def update(self, data):
    for key, item in data.items():
      setattr(self, key, item)
    self.modified_at = datetime.datetime.utcnow()
    db.session.update(self)
    db.session.commit()


  def delete(self):
    db.session.delete(self)
    db.session.commit()


  @staticmethod
  def get_all_rentals():
    return Rental.query.all()


  @staticmethod
  def get_one_rental(id):
    return Rental.query.get(id)


  def __repr__(self):
    return '<Rental {}>'.format(self.title)

from app.main_app import db
from models import bcrypt
from models.rental import RentalSchema

import datetime
from marshmallow import fields, Schema


class UserSchema(Schema):
  """
  User Schema
  """
  id = fields.Int(dump_only=True)
  username = fields.Str(required=True)
  email = fields.Email(required=True)
  password = fields.Str(required=True)
  created_at = fields.DateTime(dump_only=True)
  modified_at = fields.DateTime(dump_only=True)
  rentals = fields.Nested(RentalSchema, many=True)


class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(64), index=True, unique=True)
  email = db.Column(db.String(120), index=True, unique=True)
  password = db.Column(db.String(128))
  created_at = db.Column(db.DateTime, index=True, default=datetime.datetime.utcnow)
  modified_at = db.Column(db.DateTime, index=True, default=datetime.datetime.utcnow)
  rentals = db.relationship("Rental", backref="owner", lazy='dynamic')


  def __init__(self, data):
    self.username = data.get('username')
    self.email = data.get('email')
    self.password = self.__generate_hash(data.get('password'))
    self.created_at = datetime.datetime.utcnow()
    self.modified_at = datetime.datetime.utcnow()


  @staticmethod
  def __generate_hash(password):
    return bcrypt.generate_password_hash(password, rounds=10).decode("utf-8")

  def check_hash(self, password):
    return bcrypt.check_password_hash(self.password, password)

  def save(self):
    db.session.add(self)
    db.session.commit()


  def update(self, data):
    for key, item in data.items():
      if key == 'password':
        self.password = self.__generate_hash(item)
      setattr(self, key, item)
    self.modified_at = datetime.datetime.utcnow()
    db.session.update(self)
    db.session.commit()


  def delete(self):
    db.session.delete(self)
    db.session.commit()


  @staticmethod
  def get_all_users():
    return User.query.all()


  @staticmethod
  def get_one_user(id):
    return User.query.get(id)


  def __repr__(self):
    return '<User {}>'.format(self.username)

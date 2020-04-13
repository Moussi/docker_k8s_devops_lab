from flask import Flask

from configuration.env import app_config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from configuration.db import DbConfig
from flask_restful import Api
from routes.user_controller import UserController
from models import bcrypt

app = Flask(__name__)
app.config.from_object(DbConfig)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
api = Api(app)


from models.user import User
from models.rental import Rental


@app.shell_context_processor
def make_shell_context():
  return {'db': db, 'User': User, 'Rental': Rental}


def create_app(env_name):
  # app initiliazation
  app.config.from_object(app_config[env_name])
  bcrypt.init_app(app)
  db.init_app(app)
  api.add_resource(UserController, '/api/v1/users', '/api/v1/users/')

  @app.route('/', methods=['GET'])
  def index():
    return {'message': 'welcome to karya'}

  return app

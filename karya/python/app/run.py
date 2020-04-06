import os

from app.main_app import create_app


def run():
  env_name = os.getenv('FLASK_ENV')
  app = create_app(env_name)
  # run app
  app.run()

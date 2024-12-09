import os

class Config:
    DATABASE = os.path.join('instance', 'apidocs.db')
    SECRET_KEY = 'dev'  # Change this in production!

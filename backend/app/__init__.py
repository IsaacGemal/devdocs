from flask import Flask
from app.database import init_db
from app.routes import api_docs, users, votes, comments

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object('app.config.Config')
    
    # Initialize database
    with app.app_context():
        init_db()
    
    # Register blueprints
    app.register_blueprint(api_docs.bp)
    app.register_blueprint(users.bp)
    app.register_blueprint(votes.bp)
    app.register_blueprint(comments.bp)
    
    return app

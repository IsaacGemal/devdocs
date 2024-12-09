from flask import Blueprint, request, jsonify
from app.database import db_connection
from app.models.validators import validate_email
import uuid
import sqlite3

bp = Blueprint('users', __name__, url_prefix='/users')

@bp.route('/', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if not all(key in data for key in ['username', 'email']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    is_valid, error = validate_email(data['email'])
    if not is_valid:
        return jsonify({'error': error}), 400

    with db_connection() as conn:
        cursor = conn.cursor()
        user_id = str(uuid.uuid4())
        
        try:
            cursor.execute("""
                INSERT INTO users (id, username, email)
                VALUES (?, ?, ?)
            """, (user_id, data['username'], data['email']))
            conn.commit()
        except sqlite3.IntegrityError:
            return jsonify({'error': 'Username or email already exists'}), 400
        
        cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        return jsonify(dict(cursor.fetchone())), 201

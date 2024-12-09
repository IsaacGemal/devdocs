from flask import Blueprint, request, jsonify
from app.database import db_connection
from app.models.validators import validate_comment

bp = Blueprint('comments', __name__, url_prefix='/comments')

@bp.route('/', methods=['POST'])
def create_comment():
    data = request.get_json()
    current_user_id = "user_id"  # Replace with actual auth
    
    is_valid, error = validate_comment(data)
    if not is_valid:
        return jsonify({'error': error}), 400

    with db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO api_comments (api_doc_id, user_id, content)
            VALUES (?, ?, ?)
        """, (data['api_doc_id'], current_user_id, data['content']))
        conn.commit()
        
        cursor.execute("SELECT * FROM api_comments WHERE id = last_insert_rowid()")
        return jsonify(dict(cursor.fetchone())), 201

@bp.route('/<int:api_doc_id>', methods=['GET'])
def get_comments(api_doc_id):
    with db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT * FROM api_comments
            WHERE api_doc_id = ?
            ORDER BY created_at DESC
        """, (api_doc_id,))
        
        return jsonify([dict(row) for row in cursor.fetchall()])

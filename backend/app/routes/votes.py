from flask import Blueprint, request, jsonify
from app.database import db_connection
from app.models.validators import validate_vote

bp = Blueprint('votes', __name__, url_prefix='/votes')

@bp.route('/', methods=['POST'])
def create_vote():
    data = request.get_json()
    current_user_id = "user_id"  # Replace with actual auth
    
    is_valid, error = validate_vote(data)
    if not is_valid:
        return jsonify({'error': error}), 400

    with db_connection() as conn:
        cursor = conn.cursor()
        
        # Check if API doc exists
        cursor.execute("SELECT * FROM api_docs WHERE id = ?", (data['api_doc_id'],))
        api_doc = cursor.fetchone()
        if api_doc is None:
            return jsonify({'error': 'API doc not found'}), 404
        
        # Create vote
        cursor.execute("""
            INSERT INTO votes (api_doc_id, user_id, is_upvote)
            VALUES (?, ?, ?)
        """, (data['api_doc_id'], current_user_id, data['is_upvote']))
        
        # Update API doc rating
        current_rating = api_doc['rating']
        current_votes = api_doc['votes']
        new_votes = current_votes + 1
        
        new_rating = (
            (current_rating * current_votes + 1) / new_votes
            if data['is_upvote']
            else (current_rating * current_votes) / new_votes
        )
        
        cursor.execute("""
            UPDATE api_docs
            SET rating = ?, votes = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        """, (new_rating, new_votes, data['api_doc_id']))
        
        conn.commit()
        
        cursor.execute("SELECT * FROM votes WHERE id = last_insert_rowid()")
        return jsonify(dict(cursor.fetchone())), 201

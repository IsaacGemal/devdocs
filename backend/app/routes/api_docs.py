from flask import Blueprint, request, jsonify
from app.database import db_connection
from app.models.validators import validate_api_doc
import json

bp = Blueprint('api_docs', __name__, url_prefix='/api-docs')

@bp.route('/', methods=['POST'])
def create_api_doc():
    data = request.get_json()
    
    # Validate input
    is_valid, error = validate_api_doc(data)
    if not is_valid:
        return jsonify({'error': error}), 400

    with db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO api_docs (name, url, issues, strengths)
            VALUES (?, ?, ?, ?)
        """, (
            data['name'],
            data['url'],
            json.dumps(data['issues']),
            json.dumps(data['strengths'])
        ))
        conn.commit()
        
        cursor.execute("""
            SELECT * FROM api_docs WHERE id = last_insert_rowid()
        """)
        result = dict(cursor.fetchone())
        result['issues'] = json.loads(result['issues'])
        result['strengths'] = json.loads(result['strengths'])
        
        return jsonify(result), 201

@bp.route('/', methods=['GET'])
def get_api_docs():
    skip = request.args.get('skip', default=0, type=int)
    limit = request.args.get('limit', default=100, type=int)
    
    with db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT * FROM api_docs
            LIMIT ? OFFSET ?
        """, (limit, skip))
        
        results = []
        for row in cursor.fetchall():
            result = dict(row)
            result['issues'] = json.loads(result['issues'])
            result['strengths'] = json.loads(result['strengths'])
            results.append(result)
            
        return jsonify(results)

@bp.route('/<int:api_doc_id>', methods=['GET'])
def get_api_doc(api_doc_id):
    with db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM api_docs WHERE id = ?", (api_doc_id,))
        result = cursor.fetchone()
        
        if result is None:
            return jsonify({'error': 'API doc not found'}), 404
            
        result = dict(result)
        result['issues'] = json.loads(result['issues'])
        result['strengths'] = json.loads(result['strengths'])
        return jsonify(result)

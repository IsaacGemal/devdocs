import email_validator

def validate_api_doc(data):
    required = ['name', 'url', 'issues', 'strengths']
    if not all(key in data for key in required):
        return False, "Missing required fields"
    
    if not isinstance(data['issues'], list) or not isinstance(data['strengths'], list):
        return False, "Issues and strengths must be lists"
    
    return True, None

def validate_email(email):
    try:
        email_validator.validate_email(email)
        return True, None
    except email_validator.EmailNotValidError as e:
        return False, str(e)

def validate_vote(data):
    required = ['api_doc_id', 'is_upvote']
    if not all(key in data for key in required):
        return False, "Missing required fields"
    
    if not isinstance(data['is_upvote'], bool):
        return False, "is_upvote must be a boolean"
    
    return True, None

def validate_comment(data):
    required = ['api_doc_id', 'content']
    if not all(key in data for key in required):
        return False, "Missing required fields"
    
    if not data['content'].strip():
        return False, "Content cannot be empty"
    
    return True, None

import sqlite3
from flask import current_app, g
from contextlib import contextmanager

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

@contextmanager
def db_connection():
    try:
        db = get_db()
        yield db
    finally:
        close_db()

def init_db():
    with db_connection() as conn:
        conn.executescript("""
            CREATE TABLE IF NOT EXISTS api_docs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                url TEXT NOT NULL,
                rating REAL DEFAULT 0,
                votes INTEGER DEFAULT 0,
                issues TEXT NOT NULL,
                strengths TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS votes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                api_doc_id INTEGER NOT NULL,
                user_id TEXT NOT NULL,
                is_upvote BOOLEAN NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (api_doc_id) REFERENCES api_docs (id),
                FOREIGN KEY (user_id) REFERENCES users (id)
            );

            CREATE TABLE IF NOT EXISTS api_comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                api_doc_id INTEGER NOT NULL,
                user_id TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (api_doc_id) REFERENCES api_docs (id),
                FOREIGN KEY (user_id) REFERENCES users (id)
            );
        """)

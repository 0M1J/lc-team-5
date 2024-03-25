from .base import Database

# Dependency to get database instance
def get_db():
    db = Database.get_instance()
    return db

_db = get_db()
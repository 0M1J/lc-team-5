import random
from db.session import get_db
from models.users import UserCreate, User

db = get_db()

class CRUDUser:
    @staticmethod
    def generate_random_id() -> str:
        return ''.join(random.choices('0123456789', k=10))

    @staticmethod
    def create_user(user: UserCreate) -> dict:
        user_id = CRUDUser.generate_random_id()
        user_data = user.dict()
        user_data['id'] = user_id
        new_user = db.users_collection.insert_one(user_data)
        created_user = db.users_collection.find_one({"_id": new_user.inserted_id})
        return created_user

    @staticmethod
    def find_user_by_email(email: str) -> dict:
        user = db.users_collection.find_one({"email": email})
        return user
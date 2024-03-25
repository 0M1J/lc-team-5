import random
from db.session import get_db
from models.users import UserCreate, User, Role, ResidentExtended, Employee
from core.security import get_password_hash
from pymongo.collection import ReturnDocument


db = get_db()

class CRUDUser:
    @staticmethod
    def generate_random_id() -> str:
        return ''.join(random.choices('0123456789', k=10))

    @staticmethod
    def create_user(user: UserCreate) -> dict:
        user_id = CRUDUser.generate_random_id()

        _user = user.dict()
        user_data = dict()
        user_data['id'] = user_id
        user_data['hashed_password'] = get_password_hash(_user.get('password'))
        user_data['email'] = _user.get('email')

        if _user.get('role') == Role.Worker:
            user_data['role'] = Role.Worker.value
            user_data = Employee.from_dict(user_data).dict()
            print(user_data)
        if _user.get('role') == Role.Resident:
            user_data['role'] = Role.Resident.value
            user_data = ResidentExtended.from_dict(user_data).dict()

        new_user = db.users_collection.insert_one(user_data)
        created_user = db.users_collection.find_one({"_id": new_user.inserted_id})
        return created_user
    
    @staticmethod
    def update_user(user_data: dict, user_info: ResidentExtended|Employee) -> dict:
        user_id = user_data.get('id')
        updated_data = user_info.dict(exclude_unset=True)  # Get the updated data from the provided user_info
        user_data.update(updated_data)
        if isinstance(user_data['role'], Role):
            user_data['role'] = user_data['role'].value

        # Update the user in the database
        db.users_collection.update_one({"id": user_id}, {"$set": user_data})

        # Return the updated user
        updated_user = db.users_collection.find_one({"id": user_id})
        return updated_user
        

    @staticmethod
    def find_user_by_email(email: str) -> dict:
        user = db.users_collection.find_one({"email": email})
        return user
    
    @staticmethod
    def find_user_by_id(id: str) -> dict:
        user = db.users_collection.find_one({"id": id})
        return user
    
    @staticmethod
    def get_user_profile(email: str) -> dict:
        user = db.users_collection.find_one({"email": email})
        return user
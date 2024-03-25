from models.users import User, UserLoginIn, UserCreate, Role, ResidentInformation, Employee
from crud.users import CRUDUser
from core.security import get_password_hash, verify_password
from fastapi import HTTPException

class UserService:
    @staticmethod
    def create_user(user: UserCreate) -> dict:
        existing_user = CRUDUser.find_user_by_email(user.email)
        if existing_user:
            raise HTTPException(status_code=409, detail=f"User with email '{user.email}' already exists.")
        else:
            created_user = CRUDUser.create_user(user)
            return created_user

    @staticmethod
    def find_user_by_email(email: str) -> dict:
        return CRUDUser.find_user_by_email(email)
    
    @staticmethod
    def get_user_profile(user: UserLoginIn) -> dict:
        existing_user = CRUDUser.find_user_by_email(user.email)
        print(existing_user)
        if existing_user:
            # verify password
            if not verify_password(plain_password=user.password, hashed_password=existing_user.get('hashed_password',"")):
                raise HTTPException(status_code=401, detail=f"Invalid password!")
            user_profile = CRUDUser.get_user_profile(existing_user.get('email'))
            return user_profile
        else:
            raise HTTPException(status_code=409, detail=f"User with email '{user.email}' doesn't exists.")
    
    @staticmethod
    def update_information(id: str, user_info: ResidentInformation|Employee) -> dict:
        existing_user = CRUDUser.find_user_by_id(id)
        print(existing_user)
        if existing_user:
            updated_user = CRUDUser.update_user(existing_user, user_info)
            return updated_user
        else:
            raise HTTPException(status_code=409, detail=f"User with email '{existing_user.email}' already exists.")

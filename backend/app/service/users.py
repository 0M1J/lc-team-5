from models.users import User, UserCreate
from crud.users import CRUDUser
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
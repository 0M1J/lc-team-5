from fastapi import APIRouter, HTTPException, Depends
from service.users import UserService
from models.users import UserIn, UserOut

user_router = APIRouter()


@user_router.post("/users/", response_model=UserOut)
def create_user(user: UserIn):
    created_user = UserService.create_user(user)
    return created_user

@user_router.get("/users/{email}/", response_model=UserOut)
def read_user(username: str):
    user = UserService.find_user_by_email(email)
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail="User not found")
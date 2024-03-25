from typing import Union
from fastapi import APIRouter, HTTPException, Depends, Body
from service.users import UserService
from models.users import UserIn, UserLoginIn, UserOut, ResidentInformation, EmployeeInformation

user_router = APIRouter()


@user_router.post("/users/", response_model=UserOut)
def create_user(user: UserIn):
    created_user = UserService.create_user(user)
    return created_user

@user_router.post("/users/login", response_model=UserOut)
def read_user(user: UserLoginIn):
    user = UserService.get_user_profile(user)
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail="User not found")

@user_router.put("/users/{id}/profile", response_model=UserOut)
def update_user(id :str, user_info: Union[ResidentInformation, EmployeeInformation] = Body(..., discriminator='model_type')):
    updated_user = UserService.update_information(id, user_info)
    return updated_user
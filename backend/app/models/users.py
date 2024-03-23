from datetime import datetime
from pydantic import BaseModel, EmailStr

def datetime_now_sec():
    return datetime.now().replace(microsecond=0)

class UserBase(BaseModel):
    full_name: str
    email: EmailStr
    hashed_password: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: str
    created: datetime = datetime_now_sec()
    is_superuser: bool = False

    class Config:
        from_attributes = True

class UserIn(BaseModel):
    full_name: str
    email: str
    password: str

class UserOut(BaseModel):
    id: str
    full_name: str
    email: str
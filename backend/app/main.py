from fastapi import FastAPI
from api.users import user_router

app = FastAPI()

app.include_router(user_router)
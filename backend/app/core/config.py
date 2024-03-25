from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    MONGO_DATABASE: str = "api"
    MONGO_DATABASE_URI: str = os.getenv("DB_URI", "mongodb://localhost:27017/api")


settings = Settings()
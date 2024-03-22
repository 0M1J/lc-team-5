from fastapi import FastAPI
from typing import Optional, List, Dict
from pydantic import BaseModel

app = FastAPI()

class Text(BaseModel):
    text: str


@app.get("/")
def home():
    return {"Backend API"}

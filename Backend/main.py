from typing import Union
from pymongo import MongoClient
from fastapi import FastAPI
import os
import dotenv
dotenv.load_dotenv()

app = FastAPI()
mongo = MongoClient(os.getenv("MONGODB"))

@app.get("/")
def read_root():
    return "Hello world!"


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
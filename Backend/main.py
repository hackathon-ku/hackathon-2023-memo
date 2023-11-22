from fastapi import FastAPI
from pydantic import BaseModel
from routers import message
import requests
import os
import dotenv
dotenv.load_dotenv()

class LoginSchema(BaseModel):
    username: str
    password: str

app = FastAPI()

@app.get("/")
def read_root():
    return "Hello world!!"

@app.post("/login")
def login(loginData: LoginSchema):
    # Fetch user from database
    # IF Password matches, return user data that contain all chatid and chatname ex. {"chat": [{"chatid": "chatname"}], "isauth": true}
    # ELSE return 400 error message
    return "Login"

@app.get("/chat/{chatId}")
def get_chat():
    # Fetch chat from database
    # IF chatId matches, return chat data that contain all messages ex.
    #   username: string
    #   content: string
    #   isNotGPT: boolean
    #   type?: 'text'
    #   uid?: string
    # ELSE return 400 error message
    return "Chat"
    
app.include_router(message.router, prefix="/message", tags=["message"])
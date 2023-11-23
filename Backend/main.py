from fastapi import FastAPI
from pydantic import BaseModel
from routers import message
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
import dotenv
dotenv.load_dotenv()

class LoginSchema(BaseModel):
    username: str
    password: str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

@app.get("/")
def read_root():
    return "Hello world!!"

@app.post("/login")
def login(loginData: LoginSchema):
    # Fetch user from database
    # IF Password matches, return user data that contain all chatid and chatname ex. {"chat": [{"chatid": "chatname"}], "isauth": true}
    # ELSE return DB error message
    try:
        response = requests.post(os.getenv("MONGODB") + "/user/get", json={"username": loginData.username, "password": loginData.password})
        if response.status_code == 200:
            content = response.json()
            content["is_auth"] = True 
            return JSONResponse(status_code=response.status_code, content=content)
        return JSONResponse(status_code=response.status_code, content={"isauth": False})
    except:
        return JSONResponse(status_code=500, content={"isauth": False})

@app.get("/chat/{chatId}")
def get_chat(chatId: str):
    # Fetch chat from database
    # IF chatId matches, return chat data that contain all messages ex.
    #   username: string
    #   content: string
    #   isNotGPT: boolean
    #   type?: 'text'
    #   uid?: string
    # ELSE return 400 error message
    try:
        response = requests.get(os.getenv("MONGODB") + "/chat/" + chatId)
        if response.status_code == 200:
            chatdata = response.json()
            return JSONResponse(status_code=response.status_code, content=chatdata)
        return JSONResponse(status_code=response.status_code, content=response.json())
    except:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error"})
    
app.include_router(message.router, prefix="/message", tags=["message"])
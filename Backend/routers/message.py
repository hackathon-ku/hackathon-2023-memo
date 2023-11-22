from fastapi import APIRouter
from fastapi.responses import JSONResponse
import requests
from pydantic import BaseModel
from myopenai import *

router = APIRouter()

class StartMessageSchema(BaseModel):
    username: str
    message: str

class MessageSchema(BaseModel):
    username: str
    message: str
    thread_id: str
    
@router.post("/start")
def start_message(message: StartMessageSchema):
    #create thread and send message to GPT-3.5 then run 
    #save chat data to database
    #return thread_id and reply message
    try:
        userInput = message.message
        topic = get_Topic(userInput)
        thread, run = create_thread_and_run(userInput)
        createChat = requests.post(os.getenv("MONGODB") + "/chat/create/" + topic, json={"username": message.username, "content": userInput, "isNotGPT": True, "type": "text", "chatid": thread.id})
        if createChat.status_code != 200:
            return JSONResponse(status_code=createChat.status_code, content="Created Chat Error")
        run = wait_on_run(run, thread)
        GPTresponse = get_GPT_response(thread)
        
        sendResponse = requests.post(os.getenv("MONGODB") + "/message/create/", json={"username": "KU-Assistant", "content": GPTresponse, "isNotGPT": False, "type": "text", "chatid": thread.id})
        if sendResponse.status_code != 200:
            # Should delete created chat above
            return JSONResponse(status_code=sendResponse.status_code, content="Send Response Error")
        return JSONResponse(status_code=200, content={"thread_id": thread.id, "message": GPTresponse})
    except:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error"})

@router.post("/message")
def send_message(message: MessageSchema):
    #send message to GPT-3.5 then run
    #save chat data to database
    #return reply message
    try:
        userInput = message.message
        thread = get_thread(message.thread_id)
        sendUserMessage = requests.post(os.getenv("MONGODB") + "/message/create/", json={"username": message.username, "content": userInput, "isNotGPT": True, "type": "text", "chatid": thread.id})
        if sendUserMessage.status_code != 200:
            return JSONResponse(status_code=sendUserMessage.status_code, content="Send User Message Error")
        run = submit_message(os.getenv("ASSISTANT_ID"), thread, userInput)
        run = wait_on_run(run, thread)
        GPTresponse = get_GPT_response(thread)
        sendResponse = requests.post(os.getenv("MONGODB") + "/message/create/", json={"username": "KU-Assistant", "content": GPTresponse, "isNotGPT": False, "type": "text", "chatid": thread.id})
        if sendResponse.status_code != 200:
            # Should delete created chat above
            return JSONResponse(status_code=sendResponse.status_code, content="Send Response Error")
        return JSONResponse(status_code=200, content={"message": GPTresponse})
    except:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error"})

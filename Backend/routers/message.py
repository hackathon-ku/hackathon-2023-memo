from fastapi import APIRouter
from pydantic import BaseModel

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
    return "Start"

@router.post("/message")
def send_message(message: MessageSchema):
    #send message to GPT-3.5 then run
    #save chat data to database
    #return reply message
    return "Message"
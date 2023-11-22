from fastapi import FastAPI
import requests
import os
import dotenv
dotenv.load_dotenv()

app = FastAPI()

@app.get("/")
def read_root():
    return "Hello world!"

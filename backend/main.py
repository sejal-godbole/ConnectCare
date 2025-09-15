from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Allow frontend to call the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(msg: Message):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": msg.message}],
            max_tokens=150,
            temperature=0.7,
        )
        reply = response.choices[0].message["content"].strip()
        return {"reply": reply}
    except Exception as e:
        return {"reply": f"Error: {str(e)}"}

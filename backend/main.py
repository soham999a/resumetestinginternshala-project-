from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EnhanceRequest(BaseModel):
    section: str
    content: str

class ResumeRequest(BaseModel):
    resume: dict

RESUME_PATH = "resume.json"

@app.get("/")
def root():
    return {"message": "Hello from FastAPI on Vercel!"}

@app.post("/ai-enhance")
def ai_enhance(req: EnhanceRequest):
    # Mock enhancement
    return {"enhanced_content": f"✨ Enhanced: {req.content} ✨"}

@app.post("/save-resume")
def save_resume(req: ResumeRequest):
    with open(RESUME_PATH, "w") as f:
        json.dump(req.resume, f)
    return {"status": "success"}

@app.get("/resume")
def get_resume():
    if os.path.exists(RESUME_PATH):
        with open(RESUME_PATH) as f:
            return json.load(f)
    return {"resume": {}} 
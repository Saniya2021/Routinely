from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()  # reads your .env file

app = FastAPI()

# Allow the frontend (running on a different port) to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Vite's default port
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to Supabase
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

# This describes the shape of data we expect when creating a standup
class StandupCreate(BaseModel):
    yesterday: str
    today: str
    blockers: str = ""  # default empty string if not provided


# GET /standups — returns all standup entries, newest first
@app.get("/standups")
async def get_standups():
    result = (
        supabase.table("standups")
        .select("*")
        .order("created_at", desc=True)
        .limit(20)
        .execute()
    )
    return result.data


# POST /standups — saves a new standup entry
@app.post("/standups")
async def create_standup(standup: StandupCreate):
    result = (
        supabase.table("standups")
        .insert({
            "yesterday": standup.yesterday,
            "today": standup.today,
            "blockers": standup.blockers,
        })
        .execute()
    )
    return result.data[0]


# GET /summary/weekly — returns last 5 entries grouped nicely
@app.get("/summary/weekly")
async def weekly_summary():
    result = (
        supabase.table("standups")
        .select("*")
        .order("created_at", desc=True)
        .limit(5)
        .execute()
    )
    return {"week": result.data, "count": len(result.data)}

# DELETE /standups/{id} — deletes a single entry
@app.delete("/standups/{id}")
async def delete_standup(id: str):
    result = (
        supabase.table("standups")
        .delete()
        .eq("id", id)
        .execute()
    )
    return {"deleted": id}
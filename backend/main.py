import os
import pathlib
import requests
import shutil

from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from langchain.chat_models import init_chat_model
from langchain_community.utilities import SQLDatabase
from langchain_community.agent_toolkits import SQLDatabaseToolkit
from langchain.agents import create_agent

from dotenv import load_dotenv

# -----------------------------
# Load environment variables
# -----------------------------
load_dotenv()

# -----------------------------
# FastAPI App
# -----------------------------
app = FastAPI()

# Enable CORS for Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Environment Variables
# -----------------------------
os.environ["LANGSMITH_TRACING"] = "true"
os.environ["LANGSMITH_API_KEY"] = os.getenv("LANGSMITH_API_KEY", "")
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY", "")

# -----------------------------
# Database folder
# -----------------------------
DB_FOLDER = "databases"
os.makedirs(DB_FOLDER, exist_ok=True)

# -----------------------------
# Download Chinook DB
# -----------------------------
url = "https://storage.googleapis.com/benchmarks-artifacts/chinook/Chinook.db"
local_path = pathlib.Path(f"{DB_FOLDER}/Chinook.db")

if not local_path.exists():
    response = requests.get(url)
    if response.status_code == 200:
        local_path.write_bytes(response.content)

# -----------------------------
# Initialize Model
# -----------------------------
model = init_chat_model("gpt-4o")

# -----------------------------
# System Prompt
# -----------------------------
system_prompt = """
You are an agent designed to interact with a SQL database.

Given an input question, create a syntactically correct SQL query,
run the query, and return the answer.

Always limit query results to at most 5 rows unless specified.
Never query all columns unnecessarily.
"""

# -----------------------------
# Create Agent for DB
# -----------------------------
def get_agent(db_name):

    db_path = f"sqlite:///{DB_FOLDER}/{db_name}"

    db = SQLDatabase.from_uri(db_path)

    toolkit = SQLDatabaseToolkit(db=db, llm=model)

    tools = toolkit.get_tools()

    agent = create_agent(
        model,
        tools,
        system_prompt=system_prompt,
    )

    return agent

# -----------------------------
# Request Schema
# -----------------------------
class QueryRequest(BaseModel):
    question: str
    db_name: str

# -----------------------------
# Routes
# -----------------------------
@app.get("/")
def home():
    return {"message": "SQL Agent API running"}

# -----------------------------
# Upload database from computer
# -----------------------------
@app.post("/upload-db")
async def upload_db(file: UploadFile = File(...)):

    file_path = os.path.join(DB_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"db_name": file.filename}

# -----------------------------
# List available databases
# -----------------------------
@app.get("/databases")
def list_databases():

    dbs = [f for f in os.listdir(DB_FOLDER) if f.endswith(".db")]

    return {"databases": dbs}

# -----------------------------
# Query database
# -----------------------------
@app.post("/query")
def ask_db(req: QueryRequest):

    agent = get_agent(req.db_name)

    response_text = ""

    for step in agent.stream(
        {"messages": [{"role": "user", "content": req.question}]},
        stream_mode="values",
    ):
        response_text = step["messages"][-1].content

    return {"answer": response_text}
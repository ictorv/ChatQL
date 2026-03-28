from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from connectors.sqlite_upload import router as sqlite_router
from connectors.csv_upload import router as csv_router
from connectors.postgres_connector import router as postgres_router
from connectors.mysql_connector import router as mysql_router
from connectors.gsheet_connector import router as gsheet_router
from connectors.github_connector import router as github_router

from agent import query_agent
from models import QueryRequest

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://chatql-beige.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sqlite_router)
app.include_router(csv_router)
app.include_router(postgres_router)
app.include_router(mysql_router)
app.include_router(gsheet_router)
app.include_router(github_router)


@app.post("/query")
def ask_db(req: QueryRequest):

    answer = query_agent(req.db_name, req.question)

    return {"answer": answer}
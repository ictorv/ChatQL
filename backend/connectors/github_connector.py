import pandas as pd
from sqlalchemy import create_engine
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class GithubCSV(BaseModel):
    url: str


@router.post("/connect-github")
def connect_github(data: GithubCSV):

    df = pd.read_csv(data.url)

    db_path = "databases/github.db"

    engine = create_engine(f"sqlite:///{db_path}")

    df.to_sql("data", engine, if_exists="replace")

    return {"db_name": f"sqlite:///{db_path}"}
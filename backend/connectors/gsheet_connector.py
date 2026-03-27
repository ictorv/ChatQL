import pandas as pd
from sqlalchemy import create_engine
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class SheetURL(BaseModel):
    url: str


@router.post("/connect-gsheet")
def connect_gsheet(data: SheetURL):

    csv_url = data.url.replace("/edit#gid=", "/export?format=csv&gid=")

    df = pd.read_csv(csv_url)

    db_path = "databases/gsheet.db"

    engine = create_engine(f"sqlite:///{db_path}")

    df.to_sql("data", engine, if_exists="replace")

    return {"db_name": f"sqlite:///{db_path}"}
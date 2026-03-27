import pandas as pd
from sqlalchemy import create_engine
from fastapi import APIRouter, UploadFile, File

router = APIRouter()

@router.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...)):

    df = pd.read_csv(file.file)

    db_path = "databases/csv.db"

    engine = create_engine(f"sqlite:///{db_path}")

    df.to_sql("data", engine, if_exists="replace")

    return {"db_name": f"sqlite:///{db_path}"}
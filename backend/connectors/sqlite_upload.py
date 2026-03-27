import os
import shutil

from fastapi import APIRouter, UploadFile, File

router = APIRouter()

DB_FOLDER = "databases"
os.makedirs(DB_FOLDER, exist_ok=True)


@router.post("/upload-sqlite")
async def upload_db(file: UploadFile = File(...)):

    path = os.path.join(DB_FOLDER, file.filename)

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"db_name": f"sqlite:///{path}"}
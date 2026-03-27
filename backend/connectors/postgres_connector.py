from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class PostgresConn(BaseModel):
    conn_str: str


@router.post("/connect-postgres")
def connect_postgres(data: PostgresConn):

    return {"db_name": data.conn_str}
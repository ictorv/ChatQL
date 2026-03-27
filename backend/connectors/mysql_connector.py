from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class MySQLConn(BaseModel):
    conn_str: str


@router.post("/connect-mysql")
def connect_mysql(data: MySQLConn):

    return {"db_name": data.conn_str}
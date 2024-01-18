from pydantic import BaseModel
from datetime import datetime

class AccidentBase(BaseModel):
    location: str
    video_path: str
    date: datetime
    province: str
    city: str
    district: str
    luka: int
    meninggal: int
    keterangan: str | None

    class Config:
        orm_mode = True

class AccidentUpdateBase(BaseModel):
    luka: int
    meninggal: int
    keterangan: str | None

    class Config:
        orm_mode = True
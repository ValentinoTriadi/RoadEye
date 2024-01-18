import os
from sqlalchemy.orm import Session
from ...models import models
from ...schemas import schemas

def updateAccidentRecord(db: Session, data: schemas.AccidentUpdateBase, video_path: str, luka:int|None = None, meninggal:int|None = None, keterangan:str|None = None):
    obj = db.query(models.Accident).filter(models.Accident.video_path == video_path)
    updated_obj = obj.first()

    data.luka = luka
    data.meninggal = meninggal
    data.keterangan = keterangan    
    obj.update(data.dict(), synchronize_session=False)
    db.commit()
    return updated_obj
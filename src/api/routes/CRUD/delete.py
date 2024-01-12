import os
from sqlalchemy.orm import Session
from ...models import models
from ...schemas import schemas

def deleteAccidentRecord(db: Session, video_path:str):
    obj = db.query(models.Accident).filter(models.Accident.video_path == video_path).first()
    db.delete(obj)
    db.commit()

    if (os.path.isfile(f"./api/static/video/{video_path}.mp4")):
        os.remove(f"./api/static/video/{video_path}.mp4")
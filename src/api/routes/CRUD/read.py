from sqlalchemy.orm import Session
from ...models import models
from ...schemas import schemas

def getAccidentRecord(db: Session, video_path: str):
    return db.query(models.Accident).filter(models.Accident.video_path == video_path).first()

def getAllAccidentRecord(db: Session, skip:int, limit:int, province:str|None, city:str|None, district:str|None):
    if (province and city and district):
        return db.query(models.Accident).filter(models.Accident.province == province, models.Accident.city == city, models.Accident.district == district).offset(skip).limit(limit).all()
    elif (province and city):
        return db.query(models.Accident).filter(models.Accident.province == province, models.Accident.city == city).offset(skip).limit(limit).all()
    elif (province):
        return db.query(models.Accident).filter(models.Accident.province == province).offset(skip).limit(limit).all()
    else:
        return db.query(models.Accident).offset(skip).limit(limit).all()

def getAccidentCount(db: Session, province:str|None, city:str|None, district:str|None):
    if (province and city and district):
        return db.query(models.Accident).filter(models.Accident.province == province, models.Accident.city == city, models.Accident.district == district).count()
    elif (province and city):
        return db.query(models.Accident).filter(models.Accident.province == province, models.Accident.city == city).count()
    elif (province):
        return db.query(models.Accident).filter(models.Accident.province == province).count()
    else:
        return db.query(models.Accident).count()
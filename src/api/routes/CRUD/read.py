from sqlalchemy.orm import Session
from ...models import models
from ...schemas import schemas

def getAccidentRecord(db: Session, id: int):
    return db.query(models.Accident).filter(models.Accident.id == id).first()

def getAllAccidentRecord(db: Session):
    return db.query(models.Accident).all()
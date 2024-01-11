from sqlalchemy.orm import Session
from ...models import models
from ...schemas import schemas

def deleteAccidentRecord(db: Session, id: int):
    obj = db.query(models.Accident).filter(models.Accident.id == id).first()
    db.delete(obj)
    db.commit()
from sqlalchemy.orm import Session
from ...models import models
from ...schemas import schemas
from fastapi.responses import JSONResponse

def createAccidentRecord(db: Session, Accident: schemas.AccidentBase):
    record = models.Accident(**Accident.dict())
    db.add(record)
    db.commit()
    db.refresh(record)
    
    # Return the created record
    return JSONResponse(content={"status": "Accident", "path":f"http://127.0.0.1:8000/static/video/{record.video_path}"}, status_code=200)

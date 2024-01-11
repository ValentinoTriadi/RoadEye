from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
from waitress import serve
from sqlalchemy.orm import Session
from typing import Annotated
from datetime import datetime, time

from .schemas import schemas 
from .models import models
from .routes.detect import startapplication
from .config.db import SessionLocal, engine
from .routes.CRUD.create import createAccidentRecord
from .routes.CRUD.delete import deleteAccidentRecord
from .routes.CRUD.read import getAccidentRecord, getAllAccidentRecord 


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.mount("/static", StaticFiles(directory="api/static"), name="static")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/detect")
def detect(location:str, video_path:str, record:schemas.AccidentBase, db: Session = Depends(get_db)):
    """
        Yuuuhuuuuuuuuuuuu
    """
    result = startapplication(location, video_path)
    if result:
        record.location = location
        record.video_path = video_path
        record.date = datetime.now()  
        # Return the created record
        return createAccidentRecord(db = db, Accident = record)
        
    else:
        return JSONResponse(content={"status": "No Accident"}, status_code=200)


@app.put("/delete-accident")
def deleteAccident(id:int, db: Session = Depends(get_db)):
    if (not getAccidentRecord(db, id)):
        raise HTTPException(status_code=400, detail="Accident ID not found!")
    deleteAccidentRecord(db, id)
    return {"status": "deleted"}

@app.get("/get-accident/{id}", response_model=schemas.AccidentBase)
def getAccidentById(id:int, db: Session = Depends(get_db)):
    record = getAccidentRecord(db, id)
    if (record):
        return record
    raise HTTPException(status_code=400, detail="Accident ID not found!")

@app.get("/get-accident/", response_model=list[schemas.AccidentBase])
def getAccident(db: Session = Depends(get_db)):
    record = getAllAccidentRecord(db)
    if (record):
        return record
    raise HTTPException(status_code=400, detail="Accident record doesn't exists!")
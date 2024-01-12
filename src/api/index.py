from fastapi import FastAPI, Request, Depends, HTTPException, UploadFile, File, Form
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

@app.post("/upload-video")
async def upload_video(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """
        Upload video to server
    """
    try:
        contents = await file.read()
        with open(f"./api/static/video.mp4", "wb") as f:
            f.write(contents)
        return JSONResponse(content={"message": "File uploaded"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"message": str(e)}, status_code=500)

@app.post("/detect")
async def detect(location:str, video_path:str, url:str, record:schemas.AccidentBase, db: Session = Depends(get_db)):
    """
        Yuuuhuuuuuuuuuuuu
    """
    result = await startapplication(location, video_path, url)
    if result:
        record.location = location
        record.video_path = result
        record.date = datetime.now()  
        # Return the created record
        return createAccidentRecord(db = db, Accident = record)
        
    else:
        return JSONResponse(content={"status": "No Accident"}, status_code=200)


@app.put("/delete-accident")
async def deleteAccident(id:int, db: Session = Depends(get_db)):
    if (not getAccidentRecord(db, id)):
        raise HTTPException(status_code=400, detail="Accident ID not found!")
    await deleteAccidentRecord(db, id)
    return {"status": "deleted"}

@app.get("/get-accident/{id}", response_model=schemas.AccidentBase)
async def getAccidentById(id:int, db: Session = Depends(get_db)):
    record = await getAccidentRecord(db, id)
    if (record):
        return record
    raise HTTPException(status_code=400, detail="Accident ID not found!")

@app.get("/get-accident/", response_model=list[schemas.AccidentBase])
async def getAccident(db: Session = Depends(get_db)):
    record = await getAllAccidentRecord(db)
    if (record):
        return record
    raise HTTPException(status_code=400, detail="Accident record doesn't exists!")
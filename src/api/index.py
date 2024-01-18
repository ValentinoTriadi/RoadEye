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
from .routes.CRUD.read import getAccidentRecord, getAllAccidentRecord, getAccidentCount, getUnconfirmedAccidentRecord
from .routes.CRUD.update import updateAccidentRecord


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
def detect(province:str, city:str, district:str, jalan:str, record:schemas.AccidentBase, db: Session = Depends(get_db)):
    """
        Yuuuhuuuuuuuuuuuu
    """
    # result = startapplication(location, video_path, url)
    location = province + "_" + city + "_" + district
    result = startapplication(location, db)
    if result:
        record.location = jalan
        record.video_path = result
        record.date = datetime.now()  
        record.province = province
        record.city = city
        record.district = district
        record.luka = -1
        record.meninggal = -1
        record.keterangan = ""
        # Return the created record
        return createAccidentRecord(db = db, Accident = record)
        
    else:
        return JSONResponse(content={"status": "No Accident"}, status_code=200)


@app.put("/delete-accident")
def deleteAccident(video_path:str, db: Session = Depends(get_db)):
    if (not getAccidentRecord(db, video_path)):
        raise HTTPException(status_code=400, detail="Accident Path not found!")
    deleteAccidentRecord(db, video_path)
    return {"status": "deleted"}

@app.get("/get-accidentbypath/", response_model=schemas.AccidentBase)
def getAccidentByVideoPath(video_path:str, db: Session = Depends(get_db)):
    print(video_path + "123")
    record = getAccidentRecord(db, video_path)
    if (record):
        return record
    raise HTTPException(status_code=400, detail="Accident ID not found!")

@app.get("/get-accident/", response_model=list[schemas.AccidentBase])
def getAccident(pages:int = 0, skip:int = 0, count:int = 3, province:str|None = None, city:str|None = None, district:str|None = None, db: Session = Depends(get_db)):
    """
        Get all accident record with filter
        skip = data ke-skip yang mau diambil
        pages = pages ke brp
        count = jumlah data yang mau diambil
    """
    record = getAllAccidentRecord(skip = pages*3, limit= count, db=db, province=province, city=city, district=district)
    if (record):
        return record
    raise HTTPException(status_code=400, detail="Accident record doesn't exists!")

@app.get("/count-accident/")
def getCountAccident(province:str|None = None, city:str|None = None, district:str|None = None, db: Session = Depends(get_db)):
    """
        Get count of accident record with filter
    """
    return getAccidentCount(db=db, province=province, city=city, district=district)

@app.put("/update-accident/", response_model=schemas.AccidentBase)
def updateAccident(video_path:str, data:schemas.AccidentUpdateBase, luka:int|None = None, meninggal:int|None = None, keterangan:str|None = None, db: Session = Depends(get_db)):
    """
        Update accident record
    """

    data_model = getAccidentRecord(db, video_path)
    if (not data_model):
        raise HTTPException(status_code=400, detail="Accident not found!")


    return updateAccidentRecord(db=db, data=data, video_path=video_path, luka=luka, meninggal=meninggal, keterangan=keterangan)

@app.get("/get-unconfirmed-accident/", response_model=list[schemas.AccidentBase])
def getUnconfirmedAccident(db: Session = Depends(get_db)):
    """
        Get all unconfirmed accident record
    """
    return getUnconfirmedAccidentRecord(db=db)
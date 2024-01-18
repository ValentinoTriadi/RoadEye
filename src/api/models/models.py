from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, Float, Time
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from ..config.db import Base
from datetime import datetime

class Accident(Base):
    __tablename__ = "Accident"

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String)
    video_path = Column(String)
    date = Column(String, default=datetime.now())
    province = Column(String)
    city = Column(String)
    district = Column(String)
    luka = Column(Integer, default=-1)
    meninggal = Column(Integer, default=-1)
    keterangan = Column(String)
    

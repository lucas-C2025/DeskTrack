# Device routes
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database.connection import SessionLocal
from backend.models.device import Device as DeviceModel
from backend.schemas.device import Device, DeviceCreate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/devices/", response_model=Device)
def create_device(device: DeviceCreate, db: Session = Depends(get_db)):
    db_device = DeviceModel(**device.dict())
    db.add(db_device)
    db.commit()
    db.refresh(db_device)
    return db_device

@router.get("/devices/", response_model=list[Device])
def list_devices(db: Session = Depends(get_db)):
    return db.query(DeviceModel).all()

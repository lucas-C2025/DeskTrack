# FastAPI main app
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from backend.routes import device, activity, technician

app = FastAPI()

app.include_router(device.router)
app.include_router(activity.router)
app.include_router(technician.router)

app.mount("/static", StaticFiles(directory="frontend/static"), name="static")
templates = Jinja2Templates(directory="frontend/templates")


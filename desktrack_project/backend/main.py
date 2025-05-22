# FastAPI main app
from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.requests import Request

app = FastAPI()

# Configurando Jinja2
templates = Jinja2Templates(directory="frontend/templates")

# Servindo arquivos estáticos
app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "message": "Hello, FastAPI + Jinja2!"})

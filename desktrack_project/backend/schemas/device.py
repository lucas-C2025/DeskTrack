# Device schema
from pydantic import BaseModel
from typing import Optional
from enum import Enum

class StatusEnum(str, Enum):
    ativo = 'ativo'
    manutencao = 'manutenção'
    desativado = 'desativado'

class DeviceBase(BaseModel):
    nome: str
    ip: str
    sistema_operacional: str
    usuario_responsavel: str
    localizacao: str
    status: StatusEnum

class DeviceCreate(DeviceBase):
    pass

class Device(DeviceBase):
    id: int
    class Config:
        orm_mode = True

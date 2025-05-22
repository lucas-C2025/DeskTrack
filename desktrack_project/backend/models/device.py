# Device model
from sqlalchemy import Column, Integer, String, Enum
from backend.database.connection import Base
import enum

class StatusEnum(str, enum.Enum):
    ativo = 'ativo'
    manutencao = 'manutenção'
    desativado = 'desativado'

class Device(Base):
    __tablename__ = 'devices'
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, unique=True, index=True)
    ip = Column(String)
    sistema_operacional = Column(String)
    usuario_responsavel = Column(String)
    localizacao = Column(String)
    status = Column(Enum(StatusEnum))

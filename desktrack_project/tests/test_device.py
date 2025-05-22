# Device tests
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_create_device():
    response = client.post("/devices/", json={
        "nome": "PC-LAB01",
        "ip": "192.168.10.14",
        "sistema_operacional": "Linux",
        "usuario_responsavel": "João",
        "localizacao": "Laboratório 3",
        "status": "ativo"
    })
    assert response.status_code == 200
    assert response.json()["nome"] == "PC-LAB01"

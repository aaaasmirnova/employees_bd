from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from models import FormData
from database import SessionLocal, engine, Base  # Если используете Base

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Для теста разрешаем все домены
    allow_methods=["*"],
    allow_headers=["*"],
)

# Модель для запроса
class FormDataRequest(BaseModel):
    name: str
    email: str
    message: str

# Создание таблиц
Base.metadata.create_all(bind=engine)

@app.post("/submit-form/")
def submit_form(data: FormDataRequest):
    db = SessionLocal()
    try:
        db_item = FormData(**data.dict())
        db.add(db_item)
        db.commit()
        return {"message": "Данные сохранены!"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

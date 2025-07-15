from fastapi import Query, FastAPI, HTTPException
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

# Эндпоинт для получения записей с пагинацией
@app.get("/get-records/")
async def get_records(page: int = Query(1, ge=1), per_page: int = Query(10, ge=1)):
    db = SessionLocal()
    try:
        # Вычисляем смещение для пагинации
        offset = (page - 1) * per_page
        records = db.query(FormData).offset(offset).limit(per_page).all()
        total = db.query(FormData).count()
        return {
            "records": records,
            "total": total,
            "page": page,
            "per_page": per_page
        }
    finally:
        db.close()

# Эндпоинт для удаления записи
@app.delete("/delete-record/{record_id}")
async def delete_record(record_id: int):
    db = SessionLocal()
    try:
        record = db.query(FormData).filter(FormData.id == record_id).first()
        if not record:
            raise HTTPException(status_code=404, detail="Record not found")
        db.delete(record)
        db.commit()
        return {"message": "Record deleted successfully"}
    finally:
        db.close()

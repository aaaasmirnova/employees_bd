#Форма для отправки данных с React + FastAPI + MySQL
Проект представляет собой веб-приложение с формой, где данные сохраняются в MySQL базе данных через REST API на FastAPI.

##Стек: 
Frontend: React, Axios
Backend: FastAPI (Python)
Database: MySQL
ORM: SQLAlchemy

##Предварительные требования
Перед запуском убедитесь, что у вас установлено:
Python 3.9+
Node.js 16+
MySQL Server
Git

##Клонируйте репозиторий
git clone https://github.com/aaaasmirnova/employees_bd.git

##Настройте бэкенд
Установите зависимости Python:
pip install -r requirements.txt

##Настройте базу данных:
Создайте базу данных в MySQL:
CREATE DATABASE form_data;

##Отредактируйте backend/database.py:
DATABASE_URL = "mysql+pymysql://ваш_пользователь:ваш_пароль@localhost/form_data"

##Настройте фронтенд
bash
cd ../frontend
npm install

##Запустите бэкенд (из папки backend):
python3 -m uvicorn main:app --reload
Бэкенд будет доступен на http://localhost:8000

##Запустите фронтенд (из папки frontend):
bash
npm start
Фронтенд откроется на http://localhost:3000

- `POST /submit-form/` - Отправка данных формы
- `GET /get-records/` - Получение записей с пагинацией (параметры: page, per_page)
- `DELETE /delete-record/{id}` - Удаление записи по ID

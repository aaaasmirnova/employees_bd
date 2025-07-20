# Форма для отправки данных с React + FastAPI + MySQL

Проект представляет собой веб-приложение с формой, где данные сохраняются в MySQL базе данных через REST API на FastAPI.

### Стек:

Frontend: React, Axios
Backend: FastAPI (Python)
Database: MySQL
ORM: SQLAlchemy

### Предварительные требования

Перед запуском убедитесь, что у вас установлено:
Python 3.9+
Node.js 16+
MySQL Server
Git

### Клонируйте репозиторий

```bash
  git clone https://github.com/aaaasmirnova/employees_bd.git
```

### Настройте бэкенд

Установите зависимости Python:

```bash
  pip install -r requirements.txt
```

### Настройте базу данных:

Создайте базу данных в MySQL:
CREATE DATABASE my_app;

### Отредактируйте backend/database.py:

DATABASE*URL = "mysql+pymysql://ваш*пользователь:ваш_пароль@localhost/my_app"

### Настройте фронтенд

```bash
cd ../frontend
npm install
```

### Запустите бэкенд (из папки backend):

```bash
cd ../backend
python3 -m uvicorn main:app --reload
```

Бэкенд будет доступен на http://localhost:8000

### Запустите фронтенд (из папки frontend):

```bash
cd ../frontend
npm start
```

Фронтенд откроется на http://localhost:3000

- `POST /submit-form/` - Отправка данных формы
- `GET /get-records/` - Получение записей с пагинацией (параметры: page, per_page)
- `DELETE /delete-record/{id}` - Удаление записи по ID

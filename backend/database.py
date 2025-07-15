from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Подключение к MySQL (замените данные на свои)
DATABASE_URL = "mysql+pymysql://user:password@localhost/my_app"

# Создаем движок SQLAlchemy
engine = create_engine(DATABASE_URL)

# Фабрика сессий
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Базовый класс для моделей
Base = declarative_base()

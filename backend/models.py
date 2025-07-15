from sqlalchemy import Column, Integer, String, Text
from database import Base

class FormData(Base):
    __tablename__ = "form_data"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    email = Column(String(100))
    message = Column(Text)

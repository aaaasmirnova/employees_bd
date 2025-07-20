from pydantic import BaseModel
from typing import Optional

class FormDataCreate(BaseModel):
    name: str
    email: str
    message: str

class FormDataRequest(BaseModel):
    name: str
    email: str
    message: str

class UserCreate(BaseModel):
    email: str
    password: str

class UserInDB(UserCreate):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
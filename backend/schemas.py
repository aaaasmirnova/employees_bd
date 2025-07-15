from pydantic import BaseModel

class FormDataCreate(BaseModel):
    name: str
    email: str
    message: str

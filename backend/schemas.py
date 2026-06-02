from pydantic import BaseModel, EmailStr, Field
from typing import Literal, Optional

class StudentBase(BaseModel):
    name: str = Field(..., min_length=1, description="Student's name cannot be empty")
    email: EmailStr = Field(..., description="A valid email address")
    course: str = Field(..., min_length=1, description="Course name cannot be empty")
    age: int = Field(..., ge=0, description="Age must be 0 or greater")
    status: Literal["Active", "Inactive"] = Field(default="Active", description="Status must be either 'Active' or 'Inactive'")

class StudentCreate(StudentBase):
    pass

class StudentUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1)
    email: Optional[EmailStr] = None
    course: Optional[str] = Field(None, min_length=1)
    age: Optional[int] = Field(None, ge=0)
    status: Optional[Literal["Active", "Inactive"]] = None

class StudentResponse(StudentBase):
    id: int

    class Config:
        from_attributes = True

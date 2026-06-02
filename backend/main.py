from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from database import engine, SessionLocal, Base
import crud, schemas, models

# Automatically create database tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Student Management System API",
    description="Clean, production-ready CRUD REST API using FastAPI and SQLite",
    version="1.0.0",
)

# Enable CORS Middleware to allow Next.js or any other frontend client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency to get db session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Prefix all student endpoints under /api/students
@app.get(
    "/api/students", response_model=List[schemas.StudentResponse], tags=["Students"]
)
def read_students(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Fetch all student records"""
    students = crud.get_students(db, skip=skip, limit=limit)
    return students


@app.post(
    "/api/students",
    response_model=schemas.StudentResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Students"],
)
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    """Create a new student record. Handles duplicate email check."""
    db_student = crud.get_student_by_email(db, email=student.email)
    if db_student:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A student with this email address already exists.",
        )
    return crud.create_student(db=db, student=student)


@app.put(
    "/api/students/{student_id}",
    response_model=schemas.StudentResponse,
    tags=["Students"],
)
def update_student(
    student_id: int,
    student_update: schemas.StudentUpdate,
    db: Session = Depends(get_db),
):
    """Update an existing student record by ID. Handles 404 error if not found."""
    # Check duplicate email if it is being updated
    if student_update.email is not None:
        db_student_by_email = crud.get_student_by_email(db, email=student_update.email)
        if db_student_by_email and db_student_by_email.id != student_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A student with this email address already exists.",
            )

    updated_student = crud.update_student(
        db=db, student_id=student_id, student_update=student_update
    )
    if updated_student is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student with ID {student_id} not found.",
        )
    return updated_student


@app.delete(
    "/api/students/{student_id}",
    response_model=schemas.StudentResponse,
    tags=["Students"],
)
def delete_student(student_id: int, db: Session = Depends(get_db)):
    """Delete a student record by ID. Handles 404 error if not found."""
    deleted_student = crud.delete_student(db=db, student_id=student_id)
    if deleted_student is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student with ID {student_id} not found.",
        )
    return deleted_student

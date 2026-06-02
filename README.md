# Full-Stack Student Management System

A lightweight, full-stack Student Management System built with Next.js (TypeScript) and FastAPI. This project was developed as a technical assessment to demonstrate rapid full-stack application development.

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js (React), TypeScript, Tailwind CSS, Lucide Icons |
| **Backend** | FastAPI (Python), SQLAlchemy, SQLite |
| **Database** | SQLite (self-contained, zero-configuration) |

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) v18+
- [Python](https://www.python.org/) 3.8+

## Quick Start

You will need **two terminal windows** open to run the client and server simultaneously.

### 1. Start the Backend (FastAPI)

Open your first terminal, navigate to the project directory, and start the Python server. SQLite will automatically generate the database file on first run.

```bash
# Install required Python dependencies
pip install fastapi uvicorn sqlalchemy pydantic

# Run the backend server
uvicorn main:app --reload
```

| | |
|---|---|
| **API base URL** | `http://localhost:8000` |
| **Swagger docs** | `http://localhost:8000/docs` |

### 2. Start the Frontend (Next.js)

Open your second terminal, navigate to the project directory, install Node packages, and start the dev server.

```bash
# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

| | |
|---|---|
| **App URL** | `http://localhost:3000` |

## Core Features

- **Dashboard Metrics** — overview of Total Students, Active Courses, and Top Performing Department
- **Student Data Table** — real-time list of students with ID, Name, Email, Course, and Status
- **Full CRUD Operations** — Create, Read, Update, and Delete student records directly from the UI
- **Filtering & Search** — search by name or email, and filter by specific course

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/students` | Retrieve all students |
| `GET` | `/api/students/{id}` | Retrieve a specific student |
| `POST` | `/api/students` | Create a new student record |
| `PUT` | `/api/students/{id}` | Update an existing student record |
| `DELETE` | `/api/students/{id}` | Delete a student record |

## Project Structure

```
student-management-system/
├── main.py                  # FastAPI app, routes, SQLAlchemy models
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Dashboard entry point
│   │   ├── not-found.tsx    # 404 page
│   │   └── globals.css      # Tailwind base styles
│   ├── components/
│   │   ├── DashboardClient.tsx
│   │   ├── Sidebar.tsx
│   │   ├── MetricCard.tsx
│   │   ├── StudentModal.tsx  # Add / Edit form with validation
│   │   └── DeleteModal.tsx
│   ├── services/
│   │   └── api.ts           # Typed API functions (axios)
│   ├── hooks/
│   │   └── useStudents.ts   # Data fetching hook with mock fallback
│   └── types/
│       └── student.ts       # Student interface & shared types
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Development Notes

- **CORS** — the FastAPI backend is configured to allow cross-origin requests from the Next.js dev server at `http://localhost:3000`.
- **Mock fallback** — if the backend is not running, the frontend falls back to local mock data automatically so the UI remains usable during frontend-only development.
- **State handling** — all API calls manage loading and error states for a smooth user experience.

import { Student, CreateStudentInput, UpdateStudentInput } from '@/src/types/student';

const BASE_URL = 'http://localhost:8000/api/students';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = '';
    try {
      const errorJson = await res.json();
      message = errorJson.detail || JSON.stringify(errorJson);
    } catch {
      message = await res.text().catch(() => res.statusText);
    }
    throw new Error(message || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getAllStudents(): Promise<Student[]> {
  const res = await fetch(BASE_URL, { cache: 'no-store' });
  return handleResponse<Student[]>(res);
}

export async function getStudentById(id: number): Promise<Student> {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: 'no-store' });
  return handleResponse<Student>(res);
}

export async function createStudent(data: CreateStudentInput): Promise<Student> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<Student>(res);
}

export async function updateStudent(id: number, data: UpdateStudentInput): Promise<Student> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<Student>(res);
}

export async function deleteStudent(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    let message = '';
    try {
      const errorJson = await res.json();
      message = errorJson.detail || JSON.stringify(errorJson);
    } catch {
      message = await res.text().catch(() => res.statusText);
    }
    throw new Error(message || `Delete failed with status ${res.status}`);
  }
}

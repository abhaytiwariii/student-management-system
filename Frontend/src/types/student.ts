export interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  age: number;
  status: 'Active' | 'Inactive';
}

export type CreateStudentInput = Omit<Student, 'id'>;
export type UpdateStudentInput = Partial<CreateStudentInput>;

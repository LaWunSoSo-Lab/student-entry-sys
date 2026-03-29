import { Student } from '../types/student';
import { BASE_URL } from '../constants/api';

export const addStudent = async (data: Student) => {
  console.log('Add Student Data :::: ', data);
  console.log('API :::: ', `${BASE_URL}/post_student`);

  const response = await fetch(`${BASE_URL}/post_student`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  console.log('rsp JSON :::: ', result);

  return result;
};

export const getStudents = async () => {
  const response = await fetch(`${BASE_URL}/get_students`);
  return response.json();
};

export const getAllStudents = async (
  page = 0,
  size = 10,
): Promise<{
  content: Student[];
  totalPages: number;
  totalElements: number;
}> => {
  console.log(
    'IN STudent API ::::::',
    `${BASE_URL}/all_students?page=${page}&size=${size}`,
  );
  const response = await fetch(
    `${BASE_URL}/all_students?page=${page}&size=${size}`,
  );
  return response.json();
};

export const fetchStudentDetail = async (id: number): Promise<Student> => {
  const url = `${BASE_URL}/get_student/${id}`;
  console.log('Fetch Student Detail API ::::', url);

  const response: Response = await fetch(url);

  if (!response.ok) {
    // Try to get backend error message
    let message = `Failed to fetch student with id ${id}`;

    try {
      const text = await response.text();
      if (text) message = text;
    } catch (_) {}

    throw new Error(message);
  }

  const result: Student = await response.json();

  console.log('Student Detail Response ::::', result);

  return result;
};

// DELETE STUDENT
export const deleteStudentById = async (id: number) => {
  const url = `${BASE_URL}/delete_student/${id}`;
  console.log('Delete Student API ::::', url);

  const response = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    let message = `Failed to delete student with id ${id}`;
    try {
      const text = await response.text();
      if (text) message = text;
    } catch (_) {}
    throw new Error(message);
  }

  let result;
  try {
    result = await response.json();
  } catch (_) {
    result = null;
  }

  console.log('Delete Student Response ::::', result);
  return result;
};

// UPDATE STUDENT
export const updateStudentById = async (id: number, data: Partial<Student>) => {
  const url = `${BASE_URL}/update_student/${id}`;
  console.log('Update Student API ::::', url);
  console.log('Update Data ::::', data);

  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let message = `Failed to update student with id ${id}`;
    try {
      const text = await response.text();
      if (text) message = text;
    } catch (_) {}
    throw new Error(message);
  }

  const result: Student = await response.json();
  console.log('Update Student Response ::::', result);

  return result;
};

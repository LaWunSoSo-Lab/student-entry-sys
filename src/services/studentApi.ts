import { Student } from '../types/student';
import { BASE_URL } from '../constants/api';

// Add New Student
export const addStudent = async (data: Student) => {
  const response = await fetch(`${BASE_URL}/post_student`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  return result;
};

// Get Students (Function not used anymore)
export const getStudents = async () => {
  const response = await fetch(`${BASE_URL}/get_students`);
  return response.json();
};

// Get Students with pagination
export const getAllStudents = async (
  page = 0,
  size = 10,
): Promise<{
  content: Student[];
  totalPages: number;
  totalElements: number;
}> => {
  const response = await fetch(
    `${BASE_URL}/all_students?page=${page}&size=${size}`,
  );
  return response.json();
};

// Fetch Detail by ID
export const fetchStudentDetail = async (id: number): Promise<Student> => {
  const url = `${BASE_URL}/get_student/${id}`;

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

  return result;
};

// Delete Student by ID
export const deleteStudentById = async (id: number) => {
  const url = `${BASE_URL}/delete_student/${id}`;

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
  return result;
};

// Update Student by ID
export const updateStudentById = async (id: number, data: Partial<Student>) => {
  const url = `${BASE_URL}/update_student/${id}`;

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

  return result;
};

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

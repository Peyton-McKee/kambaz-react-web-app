import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/enrollments`;

export const getEnrollmentForUserAndCourse = async (
  userId: string,
  courseId: string
) => {
  const response = await axios.get(`${COURSES_API}/${userId}/${courseId}`);
  return response.data;
};

export const unenrollUserFromCourse = async (
  userId: string,
  courseId: string
) => {
  const response = await axios.post(
    `${COURSES_API}/${userId}/${courseId}/unenroll`
  );
  return response.data;
};

export const enrollUserFromCourse = async (
  userId: string,
  courseId: string
) => {
  const response = await axios.post(
    `${COURSES_API}/${userId}/${courseId}/enroll`
  );
  return response.data;
};

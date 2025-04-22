/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZ_API = `${REMOTE_SERVER}/api/quizzes`;

export const deleteQuiz = async (quizId: string) => {
  const response = await axios.delete(`${QUIZ_API}/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axios.put(`${QUIZ_API}/${quiz._id}`, quiz);
  return data;
};


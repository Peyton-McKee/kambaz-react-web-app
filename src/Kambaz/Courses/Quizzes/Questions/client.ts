import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
const ANSWERS_API = `${REMOTE_SERVER}/api/answers`;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const deleteQuestion = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUESTIONS_API}/delete/${id}`
  );
  return data;
};

export const updateTrueFalseQuestion = async (question: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUESTIONS_API}/tf/${question._id}`,
    question
  );
  return data;
};

export const updateMultipleQuestion = async (question: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUESTIONS_API}/multiple/${question._id}`,
    question
  );
  return data;
};

export const updateFillQuestion = async (question: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUESTIONS_API}/fill/${question._id}`,
    question
  );
  return data;
};

export const getQuestion = async (questionId: any) => {
  const { data } = await axiosWithCredentials.get(
    `${QUESTIONS_API}/${questionId}`
  );
  return data;
};

export const createTrueFalseQuestion = async (question: any) => {
  const { data } = await axiosWithCredentials.post(
    `${QUESTIONS_API}/tf`,
    question
  );
  return data;
};

export const createMultipleQuestion = async (question: any) => {
  const { data } = await axiosWithCredentials.post(
    `${QUESTIONS_API}/multiple`,
    question
  );
  return data;
};

export const createFillQuestion = async (question: any) => {
  const { data } = await axiosWithCredentials.post(
    `${QUESTIONS_API}/fill`,
    question
  );
  return data;
};

export const createAnswer = async (question: string, answer: string) => {
  const { data } = await axiosWithCredentials.post(`${ANSWERS_API}/create`, {
    question,
    answer,
  });
  return data;
};

export const getAnswer = async (questionId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUESTIONS_API}/${questionId}/answers`
  );
  return data;
};

import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  courses: courses,
  course: {
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    imgSrc: "images/NEU.png",
    description: "New Description",
    department: "D123",
    credits: 4,
  },
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state) => {
      const newCourse = { ...state.course, _id: uuidv4() };
      state.courses = [...courses, newCourse];
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((course) => course._id !== courseId);
    },
    updateCourse: (state) => {
      state.courses = state.courses.map((c) => {
        if (c._id === state.course._id) {
          return state.course;
        } else {
          return c;
        }
      });
    },
    setCourse: (state, { payload: course }) => {
      state.course = course;
    },
  },
});

export const { addCourse, deleteCourse, updateCourse, setCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;

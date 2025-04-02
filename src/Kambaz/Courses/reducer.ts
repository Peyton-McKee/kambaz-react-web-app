/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import * as usersClient from "../Account/client";
import { useDispatch } from "react-redux";

const initialState = {
  courses: [] as any[],
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
    addCourse: (state, { payload }) => {
      state.courses = [...state.courses, payload];
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
    setCourses: (state, { payload }) => {
      state.courses = payload;
    },
  },
});

export const { addCourse, deleteCourse, updateCourse, setCourse, setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;

export const useRefreshCourses = (showEnrolled: boolean) => {
  const dispatch = useDispatch();
  return () => {
    usersClient.findMyCourses(showEnrolled).then((courses) => {
      dispatch(setCourses(courses));
    });
  };
};

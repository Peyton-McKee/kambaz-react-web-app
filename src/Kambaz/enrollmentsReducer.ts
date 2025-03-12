import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    removeEnrollment: (state, { payload: enrollmentId }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) => enrollment._id !== enrollmentId
      );
    },
    addEnrollment: (state, { payload: enrollment }) => {
      const newEnrollment = {
        _id: uuidv4(),
        user: enrollment.userId,
        course: enrollment.courseId,
      };
      state.enrollments = [...state.enrollments, newEnrollment];
    },
  },
});

export const { removeEnrollment, addEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;

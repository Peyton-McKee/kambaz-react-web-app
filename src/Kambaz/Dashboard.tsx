/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, FormControl, Row } from "react-bootstrap";
import CoursePreview from "./CoursePreview";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourse,
  deleteCourse,
  setCourse,
  updateCourse,
} from "./Courses/reducer";
import { useState } from "react";
import { findEnrollment, isUserEnrolledInCourse } from "./enrollments.utils";

export default function Dashboard() {
  const { courses, course } = useSelector((state: any) => state.courseReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [toggleEnrolled, setToggledEnrolled] = useState(true);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      {currentUser.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addCourse())}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse())}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) =>
              dispatch(setCourse({ ...course, name: e.target.value }))
            }
          />
          <FormControl
            value={course.description}
            onChange={(e) =>
              dispatch(setCourse({ ...course, description: e.target.value }))
            }
          />
        </>
      )}
      {currentUser.role === "STUDENT" && (
        <Button
          className="float-end mt-4"
          onClick={() => setToggledEnrolled(!toggleEnrolled)}
        >
          Enrollments
        </Button>
      )}
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            .filter((course: any) =>
              toggleEnrolled
                ? isUserEnrolledInCourse(
                    enrollments,
                    course._id,
                    currentUser._id
                  )
                : true
            )
            .map((course: any) => (
              <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <CoursePreview
                  title={course.name}
                  courseId={course._id}
                  imgSrc={course.imgSrc ?? "images/NEU.png"}
                  description={course.description}
                  deleteCourse={() => dispatch(deleteCourse(course._id))}
                  setCourse={() => dispatch(setCourse(course))}
                  enrollmentId={
                    findEnrollment(enrollments, course._id, currentUser._id)
                      ?._id
                  }
                />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

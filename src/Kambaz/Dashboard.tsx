/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, FormControl, Row } from "react-bootstrap";
import CoursePreview from "./CoursePreview";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourse,
  deleteCourse,
  setCourse,
  setCourses,
  updateCourse,
} from "./Courses/reducer";
import { useEffect, useState } from "react";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import { setEnrollments } from "./enrollmentsReducer";

export default function Dashboard() {
  const { courses, course } = useSelector((state: any) => state.courseReducer);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [toggleEnrolled, setToggledEnrolled] = useState(true);

  useEffect(() => {
    const findCoursesForUser = async () => {
      try {
        const courses = await userClient.findCoursesForUser(currentUser._id);
        dispatch(setCourses(courses));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCourses = async () => {
      try {
        const allCourses = await courseClient.fetchAllCourses();
        const enrolledCourses = await userClient.findCoursesForUser(
          currentUser._id
        );
        const courses = allCourses.map((course: any) => {
          if (enrolledCourses.find((c: any) => c._id === course._id)) {
            return { ...course, enrolled: true };
          } else {
            return course;
          }
        });
        dispatch(setCourses(courses));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchEnrollments = async () => {
      const enrollments = await userClient.getEnrollments();
      dispatch(setEnrollments(enrollments));
    };

    if (toggleEnrolled) {
      findCoursesForUser();
    } else {
      fetchCourses();
    }
    fetchEnrollments();
  }, [toggleEnrolled, dispatch, currentUser._id]);

  const updateCourseRemote = async () => {
    await courseClient.updateCourse(course);
    dispatch(updateCourse());
  };

  const addCourseRemote = async () => {
    const newCourse = await courseClient.createCourse(course);
    dispatch(addCourse(newCourse));
  };

  const deleteCourseRemote = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    dispatch(deleteCourse(courseId));
  };

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
              onClick={() => addCourseRemote()}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => updateCourseRemote()}
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
          {courses.map((course: any) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <CoursePreview
                title={course.name}
                courseId={course._id}
                imgSrc={course.imgSrc ?? "images/NEU.png"}
                description={course.description}
                deleteCourse={() => deleteCourseRemote(course._id)}
                setCourse={() => dispatch(setCourse(course))}
                showEnrolled={toggleEnrolled}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

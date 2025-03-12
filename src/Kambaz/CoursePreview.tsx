/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addEnrollment, removeEnrollment } from "./enrollmentsReducer";

export interface CoursePreviewProps {
  courseId: string;
  imgSrc: string;
  title: string;
  description: string;
  deleteCourse: () => void;
  setCourse: () => void;
  enrollmentId?: string;
}

export default function CoursePreview({
  courseId,
  imgSrc,
  title,
  description,
  deleteCourse,
  setCourse,
  enrollmentId,
}: CoursePreviewProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Card>
      <Card.Img variant="top" src={imgSrc} width="100%" height={160} />
      <Card.Body>
        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
          {title}
        </Card.Title>
        <Card.Text
          className="wd-dashboard-course-description overflow-hidden"
          style={{ height: "100px" }}
        >
          {description}
        </Card.Text>
        <Button
          disabled={!enrollmentId}
          variant="primary"
          onClick={() => navigate(`/Kambaz/Courses/${courseId}/Home`)}
        >
          Go
        </Button>
        {currentUser.role === "FACULTY" && (
          <>
            <Button
              onClick={(event) => {
                event.preventDefault();
                deleteCourse();
              }}
              className="btn btn-danger float-end"
              id="wd-delete-course-click"
            >
              Delete
            </Button>
            <Button
              id="wd-edit-course-click"
              onClick={(event) => {
                event.preventDefault();
                setCourse();
              }}
              className="btn btn-warning me-2 float-end"
            >
              Edit
            </Button>
          </>
        )}
        {currentUser.role === "STUDENT" && (
          <Button
            onClick={() => {
              if (enrollmentId) {
                dispatch(removeEnrollment(enrollmentId));
              } else {
                dispatch(addEnrollment({ userId: currentUser._id, courseId }));
              }
            }}
            className={`bg-${enrollmentId ? "danger" : "success"} float-end`}
          >
            {enrollmentId ? "Unenroll" : "Enroll"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

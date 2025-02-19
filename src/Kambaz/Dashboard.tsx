import { Col, Row } from "react-bootstrap";
import CoursePreview from "./CoursePreview";
import { courses } from "./Database";

export default function Dashboard() {
  const coursePreviews = courses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({coursePreviews.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {coursePreviews.map((course) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <CoursePreview
                title={course.name}
                courseId={course._id}
                imgSrc={course.imgSrc ?? ""}
                description={course.description}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

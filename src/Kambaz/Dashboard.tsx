import { Col, Row } from "react-bootstrap";
import CoursePreview, { CoursePreviewProps } from "./CoursePreview";

export default function Dashboard() {
  const coursePreviews: CoursePreviewProps[] = [
    {
      courseId: "1",
      title: "CS1234 React JS",
      description: "Full Stack software developer",
      imgSrc: "/images/teslabot.png",
    },
    {
      courseId: "2",
      title: "CS1235 React TS",
      description: "Frontend software developer",
      imgSrc: "/images/snoop.jpg",
    },
    {
      courseId: "3",
      title: "CS1236 Some Other Course",
      description: "Another Course Description",
      imgSrc: "/images/smily.webp",
    },
    {
      courseId: "4",
      title: "CS1237 Yet Another Course",
      description: "Yet Another Course Description",
      imgSrc: "/images/patrick.jpg",
    },
    {
      courseId: "5",
      title: "CS1238 Yet Another Course Again",
      description: "Yet Another Course Description Again",
      imgSrc: "/images/supersmily.jpg",
    },
    {
      courseId: "6",
      title: "CS1238 Yet Another Course Again Once More",
      description: "Yet Another Course Description Again Once More",
      imgSrc: "/images/toiletcat.jpg",
    },
    {
      courseId: "7",
      title: "CS1238 Last Course",
      description: "Last Course Description",
      imgSrc: "/images/seafood.webp",
    },
  ];

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({coursePreviews.length})
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {coursePreviews.map((course) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <CoursePreview {...course} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

import { Button, Card } from "react-bootstrap";
import { Link } from "react-router";

export interface CoursePreviewProps {
  courseId: string;
  imgSrc: string;
  title: string;
  description: string;
}

export default function CoursePreview({
  courseId,
  imgSrc,
  title,
  description,
}: CoursePreviewProps) {
  return (
    <Card>
      <Link
        to={`/Kambaz/Courses/${courseId}/Home`}
        className="wd-dashboard-course-link text-decoration-none text-dark"
      >
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
          <Button variant="primary">Go</Button>
        </Card.Body>
      </Link>
    </Card>
  );
}

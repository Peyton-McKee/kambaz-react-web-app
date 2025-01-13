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
    <div className="wd-dashboard-course">
      <Link
        to={`/Kambaz/Courses/${courseId}/Home`}
        className="wd-dashboard-course-link"
      >
        <img src={imgSrc} width={200} />
        <div>
          <h5>{title}</h5>
          <p className="wd-dashboard-course-title">{description}</p>
          <button>Go</button>
        </div>
      </Link>
    </div>
  );
}

import { BsGripVertical } from "react-icons/bs";
import { Link } from "react-router";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaFileSignature } from "react-icons/fa";

export interface AssignmentPreviewProps {
  courseId: string;
  assignmentId: string;
  title: string;
  dateAvailable: Date;
  dueDate: Date;
  numPoints: number;
}

export default function AssignmentPreview({
  courseId,
  assignmentId,
  title,
  dateAvailable,
  dueDate,
  numPoints,
}: AssignmentPreviewProps) {
  return (
    <Link
      className="text-decoration-none text-black d-flex align-items-center"
      to={`/Kambaz/Courses/${courseId}/assignments/${assignmentId}`}
    >
      <BsGripVertical className="me-2 fs-3" />
      <FaFileSignature className="text-success me-2 fs-3" />

      <div className="mx-2">
        <h4 className="d-block fw-bold">{title}</h4>
        <span className="text-secondary">
          <span className="text-danger me-1">Multiple Modules</span>|
          <span className="fw-bold mx-1">
            Not available until
            <span className="fw-normal"> {dateAvailable.toDateString()}</span>
          </span>
          |
          <span className="fw-bold mx-1">
            Due <span className="fw-normal">{dueDate.toDateString()}</span>
          </span>
          | {numPoints} pts
        </span>
      </div>
      <div className="float-end d-flex flex-fill justify-content-end">
        <GreenCheckmark />
        <IoEllipsisVertical className="fs-3" />
      </div>
    </Link>
  );
}

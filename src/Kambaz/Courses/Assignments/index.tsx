/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, ListGroup } from "react-bootstrap";
import AssignmentsControls from "./AssignmentControls";
import AssignmentPreview, { AssignmentPreviewProps } from "./AssignmentPreview";
import { BsChevronDown, BsGripVertical } from "react-icons/bs";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { useParams } from "react-router";
import { assignments } from "../../Database";
import { useSelector } from "react-redux";

const assignmentTransformer = (
  assignment: (typeof assignments)[0]
): AssignmentPreviewProps => ({
  title: assignment.title,
  courseId: assignment.course,
  assignmentId: assignment._id,
  dueDate: new Date(assignment.dueDate),
  dateAvailable: new Date(assignment.dateAvailable),
  numPoints: assignment.numPoints,
});

export default function Assignments() {
  const { cid } = useParams();

  const { assignments } = useSelector((state: any) => state.assignmentReducer);

  const assignmentsProps: AssignmentPreviewProps[] = assignments
    .filter((assignment: any) => assignment.course === cid)
    .map(assignmentTransformer);

  return (
    <Container id="wd-assignments">
      <AssignmentsControls />
      <br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <div className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="me-2 fs-3" />
          <BsChevronDown className="me-2" />
          ASSIGNMENTS
          <AssignmentsControlButtons />
        </div>
        {assignmentsProps.map((assignment) => (
          <ListGroup.Item className="wd-lesson p-3 ps-1">
            <AssignmentPreview {...assignment} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

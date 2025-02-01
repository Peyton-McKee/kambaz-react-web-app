import { Container, ListGroup } from "react-bootstrap";
import AssignmentsControls from "./AssignmentControls";
import AssignmentPreview, { AssignmentPreviewProps } from "./AssignmentPreview";
import { BsChevronDown, BsGripVertical } from "react-icons/bs";
import AssignmentsControlButtons from "./AssignmentsControlButtons";

export default function Assignments() {
  const courseId = "1234";
  const assignments: AssignmentPreviewProps[] = [
    {
      courseId,
      assignmentId: "1234",
      title: "A1 - ENV + HTML",
      dueDate: new Date("05/13/2025"),
      dateAvailable: new Date("05/06/2025"),
      numPoints: 100,
    },
    {
      courseId,
      assignmentId: "12345",
      title: "A2 - CSS + BOOTSTRAP",
      dueDate: new Date("05/20/2025"),
      dateAvailable: new Date("05/13/2025"),
      numPoints: 100,
    },
    {
      courseId,
      assignmentId: "123456",
      title: "A3 - JAVASCRIPT + REACT",
      dueDate: new Date("05/27/2025"),
      dateAvailable: new Date("05/20/2025"),
      numPoints: 100,
    },
  ];

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
        {assignments.map((assignment) => (
          <ListGroup.Item className="wd-lesson p-3 ps-1">
            <AssignmentPreview {...assignment} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

import AssignmentPreview, { AssignmentPreviewProps } from "./AssignmentPreview";

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
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          {assignments.map((assignment) => (
            <AssignmentPreview {...assignment} />
          ))}
        </li>
      </ul>
    </div>
  );
}

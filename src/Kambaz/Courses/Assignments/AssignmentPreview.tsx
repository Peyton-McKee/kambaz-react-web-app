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
    <li className="wd-assignment-list-item">
      <a
        href={`#/Kambaz/Courses/${courseId}/Assignments/${assignmentId}`}
        className="wd-assignment-link"
      >
        {title}
      </a>
      <div>
        <table>
          <tr>
            <td>Multiple Modules</td>
            <td>|</td>
            <td>
              <b>Not available until </b>
              {dateAvailable.toLocaleDateString()}
            </td>
            <td>|</td>
            <td>
              <b>Due </b>
              {dueDate.toLocaleDateString()}
            </td>
            <td>|</td>
            <td>{numPoints} pts</td>
          </tr>
        </table>
      </div>
    </li>
  );
}

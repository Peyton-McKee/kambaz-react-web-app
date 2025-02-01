import { FaUserCircle } from "react-icons/fa";

export interface PeopleTableCellProps {
  firstName: string;
  lastName: string;
  nuid: string;
  section: string;
  role: string;
  lastActivity: Date;
  totalActivity: string;
}

export default function PeopleTableCell({
  firstName,
  lastActivity,
  lastName,
  nuid,
  section,
  role,
  totalActivity,
}: PeopleTableCellProps) {
  return (
    <tr>
      <td className="wd-full-name text-nowrap">
        <FaUserCircle className="me-2 fs-1 text-secondary" />
        <span className="wd-first-name">{firstName}</span>
        <span className="wd-last-name">{lastName}</span>
      </td>
      <td className="wd-login-id">{nuid}</td>
      <td className="wd-section">{section}</td>
      <td className="wd-role">{role}</td>
      <td className="wd-last-activity">{lastActivity.toDateString()}</td>
      <td className="wd-total-activity">{totalActivity}</td>
    </tr>
  );
}

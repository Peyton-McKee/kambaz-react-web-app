import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router";

export interface PeopleTableCellProps {
  id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: Date;
  totalActivity: string;
}

export default function PeopleTableCell({
  id,
  firstName,
  lastActivity,
  lastName,
  loginId,
  section,
  role,
  totalActivity,
}: PeopleTableCellProps) {
  return (
    <tr key={loginId}>
      <td className="wd-full-name text-nowrap">
        <Link
          to={`/Kambaz/Account/Users/${id}`}
          className="text-decoration-none"
        >
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">{firstName}</span>
          <span className="wd-last-name">{lastName}</span>
        </Link>
      </td>
      <td className="wd-login-id">{loginId}</td>
      <td className="wd-section">{section}</td>
      <td className="wd-role">{role}</td>
      <td className="wd-last-activity">{lastActivity.toDateString()}</td>
      <td className="wd-total-activity">{totalActivity}</td>
    </tr>
  );
}

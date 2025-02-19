import { Table } from "react-bootstrap";
import PeopleTableCell, { PeopleTableCellProps } from "./TableCell";
import { useParams } from "react-router";
import { users, enrollments } from "../../Database";

const userTransformer = (user: (typeof users)[0]): PeopleTableCellProps => ({
  firstName: user.firstName,
  lastName: user.lastName,
  loginId: user.loginId,
  section: user.section,
  role: user.role,
  lastActivity: new Date(user.lastActivity),
  totalActivity: user.totalActivity,
});

export default function PeopleTable() {
  const { cid } = useParams();

  const userProps: PeopleTableCellProps[] = users
    .filter((user) =>
      enrollments.some(
        (enrollment) =>
          enrollment.user === user._id && enrollment.course === cid
      )
    )
    .map(userTransformer);

  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>{userProps.map(PeopleTableCell)}</tbody>
      </Table>
    </div>
  );
}

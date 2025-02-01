import { Table } from "react-bootstrap";
import PeopleTableCell, { PeopleTableCellProps } from "./TableCell";
export default function PeopleTable() {
  const users: PeopleTableCellProps[] = [
    {
      firstName: "Tony",
      lastName: "Stark",
      nuid: "001234561S",
      section: "S101",
      role: "STUDENT",
      lastActivity: new Date(),
      totalActivity: "10:21:32",
    },
    {
      firstName: "Steve",
      lastName: "Rogers",
      nuid: "001234561L",
      section: "S101",
      role: "STUDENT",
      lastActivity: new Date(),
      totalActivity: "4:32:12",
    },
    {
      firstName: "Bruce",
      lastName: "Wayne",
      nuid: "001234561B",
      section: "S101",
      role: "STUDENT",
      lastActivity: new Date(),
      totalActivity: "9:10:12",
    },
    {
      firstName: "Natasha",
      lastName: "Romanoff",
      nuid: "001234561S",
      section: "S101",
      role: "TA",
      lastActivity: new Date(),
      totalActivity: "8:20:30",
    },
  ];
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
        <tbody>{users.map(PeopleTableCell)}</tbody>
      </Table>
    </div>
  );
}

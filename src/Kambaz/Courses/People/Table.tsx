/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "react-bootstrap";
import PeopleTableCell, { PeopleTableCellProps } from "./TableCell";
import { useParams } from "react-router";
import * as coursesClient from "../client";
import { useEffect, useState } from "react";

const userTransformer = (user: any): PeopleTableCellProps => ({
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

  const [userProps, setUserProps] = useState<PeopleTableCellProps[]>([]);

  useEffect(() => {
    const getPeople = async () => {
      if (cid) {
        const users = await coursesClient.getPeopleForCourse(cid);
        setUserProps(users.map(userTransformer));
      }
    };
    getPeople();
  });

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

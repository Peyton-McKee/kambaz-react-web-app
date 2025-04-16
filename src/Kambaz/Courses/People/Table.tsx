/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "react-bootstrap";
import PeopleTableCell, { PeopleTableCellProps } from "./TableCell";
import PeopleDetails from "./Details";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import * as coursesClient from "../client";

const userTransformer = (user: any): PeopleTableCellProps => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  loginId: user.loginId,
  section: user.section,
  role: user.role,
  lastActivity: new Date(user.lastActivity),
  totalActivity: user.totalActivity,
});

export default function PeopleTable({ users }: { users?: any[] }) {
  const { cid } = useParams();
  const [retrievedUsers, setRetrievedUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      if (cid && !users) {
        const users = await coursesClient.getPeopleForCourse(cid);
        setRetrievedUsers(users);
      }
    };

    getUsers();
  }, [cid, users]);

  return (
    <div id="wd-people-table">
      <PeopleDetails />
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
        <tbody>
          {(users ?? retrievedUsers).map(userTransformer).map(PeopleTableCell)}
        </tbody>
      </Table>
    </div>
  );
}

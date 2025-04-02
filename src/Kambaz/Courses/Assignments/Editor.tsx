/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
} from "react-bootstrap";
import LabeledFormInput, { LabeledFormInputProps } from "./LabeledFormInput";
import SelectManyFormInput from "./SelectManyFormInput";
import { Link, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addAssignment, updateAssignment } from "./reducer";
import * as assignmentClient from "./client";
import * as courseClient from "../client";

const convertToDateString = (date: string) => {
  return new Date(date).toISOString().split("T")[0];
};

export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [assignment, setAssignment] = useState(
    aid === "-1"
      ? {
          title: "",
          course: cid,
          dueDate: new Date().toString(),
          dateAvailable: new Date().toString(),
          availableUntil: new Date().toString(),
          numPoints: 0,
          description: "",
        }
      : assignments.find((assignment: any) => assignment._id === aid)
  );

  if (!assignment) {
    return <h4 className="text-danger">No Assignment found</h4>;
  }

  const onSave = async () => {
    if (cid) {
      if (aid === "-1") {
        const newAssignment = await courseClient.createAssignmnetForCourse(
          cid,
          assignment
        );
        dispatch(addAssignment(newAssignment));
      } else {
        const updatedAssignment = await assignmentClient.updateAssignment(
          assignment
        );
        dispatch(updateAssignment(updatedAssignment));
      }
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    }
  };

  const formInputContent: LabeledFormInputProps[] = [
    {
      label: "Points",
      id: "wd-points",
      inputComponent: (
        <FormControl
          type="number"
          value={assignment.numPoints}
          onChange={(e) =>
            setAssignment({
              ...assignment,
              numPoints: parseFloat(e.target.value),
            })
          }
        />
      ),
    },
    {
      label: "Assignment Group",
      id: "wd-group",
      inputComponent: (
        <FormSelect id="wd-group" value="ASSIGNMENTS">
          <option value={"ASSIGNMENTS"}>Assignments</option>
        </FormSelect>
      ),
    },
    {
      label: "Display Grade as",
      id: "wd-grade-display",
      inputComponent: (
        <FormSelect id="wd-grade-display" value="Percentage">
          <option value={"Percentage"}>Percentage</option>
        </FormSelect>
      ),
    },
    {
      label: "Submission Type",
      id: "wd-submission-type",
      inputComponent: (
        <div className="p-3 border rounded">
          <FormSelect className="mb-3" id="wd-submission-type" value="Online">
            <option value={"Online"}>Online</option>
          </FormSelect>
          <SelectManyFormInput
            title="Online Entry Options"
            id="wd-online-entry"
            options={[
              "TEXT_ENTRY",
              "WEBSITE_URL",
              "MEDIA_RECORDINGS",
              "STUDENT_ANNOTATION",
              "FILE_UPLOADS",
            ]}
          />
        </div>
      ),
    },
    {
      label: "Assign",
      id: "wd-assign",
      inputComponent: (
        <div className="border rounded p-3">
          <FormLabel className="fw-bold" htmlFor="wd-assign-to">
            Assign to
          </FormLabel>
          <br />
          <FormControl id="wd-assign-to" value={"Everyone"} />
          <br />
          <FormLabel className="fw-bold" htmlFor="wd-assign-due">
            Due
          </FormLabel>
          <br />
          <FormControl
            type="date"
            value={convertToDateString(assignment.dueDate)}
            onChange={(e) =>
              setAssignment({ ...assignment, dueDate: e.target.value })
            }
          />
          <br />

          <div className="d-flex align-items-center">
            <div>
              <FormLabel className="fw-bold" htmlFor="wd-assign-from">
                Available from
              </FormLabel>
              <br />
              <FormControl
                type="date"
                value={convertToDateString(assignment.dateAvailable)}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    dateAvailable: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <FormLabel className="fw-bold" htmlFor="wd-assign-to">
                Until
              </FormLabel>
              <br />
              <FormControl
                type="date"
                value={convertToDateString(assignment.availableUntil)}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    availableUntil: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Form id="wd-assignments-editor">
      <FormGroup>
        <FormLabel>Assignment Name</FormLabel>
        <FormControl
          id="wd-name"
          value={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
      </FormGroup>
      <br />
      <FormControl
        as="textarea"
        value={assignment.description}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />
      <br />
      <table className="w-100">
        <tbody>
          {formInputContent.map((props) => (
            <>
              <LabeledFormInput {...props} />
              <br />
            </>
          ))}
        </tbody>
      </table>
      <br />
      <hr className="border" />
      <div className="float-end">
        <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
          <Button className="bg-secondary me-2 border-secondary text-black">
            Cancel
          </Button>
        </Link>

        <Button className="bg-success border-secondary" onClick={onSave}>
          Save
        </Button>
      </div>
    </Form>
  );
}

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
import { Link, useParams } from "react-router";
import { assignments } from "../../Database";

const convertToDateString = (date: string) => {
  return new Date(date).toISOString().split("T")[0];
};

export default function AssignmentEditor() {
  const { aid, cid } = useParams();

  const assignment = assignments.find((assignment) => assignment._id === aid);

  if (!assignment) {
    return <h4 className="text-danger">No Assignment found</h4>;
  }

  const formInputContent: LabeledFormInputProps[] = [
    {
      label: "Points",
      id: "wd-points",
      inputComponent: (
        <FormControl type="number" value={assignment.numPoints} />
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
              />
            </div>
            <div>
              <FormLabel className="fw-bold" htmlFor="wd-assign-to">
                Until
              </FormLabel>
              <br />
              <FormControl
                type="date"
                value={convertToDateString(assignment.dueDate)}
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
        <FormControl id="wd-name" value={assignment.title}></FormControl>
      </FormGroup>
      <br />
      <FormControl as="textarea">{assignment.description}</FormControl>
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
        <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
          <Button className="bg-success border-secondary">Save</Button>
        </Link>
      </div>
    </Form>
  );
}

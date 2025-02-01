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

export default function AssignmentEditor() {
  const formInputContent: LabeledFormInputProps[] = [
    {
      label: "Points",
      id: "wd-points",
      inputComponent: <FormControl type="number" value={100} />,
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
          <FormControl type="date" value={"05/13/2024"} />
          <br />

          <div className="d-flex align-items-center">
            <div>
              <FormLabel className="fw-bold" htmlFor="wd-assign-from">
                Available from
              </FormLabel>
              <br />
              <FormControl type="date" value={"05/13/2024"} />
            </div>
            <div>
              <FormLabel className="fw-bold" htmlFor="wd-assign-to">
                Until
              </FormLabel>
              <br />
              <FormControl type="date" value={"05/20/2024"} />
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
        <FormControl id="wd-name" value={"A1 - ENV + HTML"}></FormControl>
      </FormGroup>
      <br />
      <FormControl as="textarea">
        The assignment is available online Submit a link to the landing page of
      </FormControl>
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
        <Button className="bg-secondary me-2 border-secondary text-black">
          Cancel
        </Button>
        <Button className="bg-success border-secondary">Save</Button>
      </div>
    </Form>
  );
}

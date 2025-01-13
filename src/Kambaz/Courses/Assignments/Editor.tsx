import LabeledFormInput, { LabeledFormInputProps } from "./LabeledFormInput";
import SelectManyFormInput from "./SelectManyFormInput";

export default function AssignmentEditor() {
  const formInputContent: LabeledFormInputProps[] = [
    {
      label: "Points",
      id: "wd-points",
      inputComponent: <input type="number" value={100} />,
    },
    {
      label: "Assignment Group",
      id: "wd-group",
      inputComponent: <input id="wd-group" type="select" value="ASSIGNMENTS" />,
    },
    {
      label: "Display Grade as",
      id: "wd-grade-display",
      inputComponent: (
        <input id="wd-grade-display" type="select" value="Percentage" />
      ),
    },
    {
      label: "Submission Type",
      id: "wd-submission-type",
      inputComponent: (
        <div>
          <input id="wd-submission-type" type="select" value="Online" />
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
        <div>
          <label htmlFor="wd-assign-to">Assign to</label>
          <br />
          <input id="wd-assign-to" value={"Everyone"} />
          <br />
          <br />
          <label htmlFor="wd-assign-due">Due</label>
          <br />
          <input type="date" value={"05/13/2024"} />
          <br />
          <br />
          <table>
            <tr>
              <td>
                <label htmlFor="wd-assign-from">Available from</label>
                <br />
                <input type="date" value={"05/13/2024"} />
              </td>
              <td>
                <label htmlFor="wd-assign-to">Until</label>
                <br />
                <input type="date" value={"05/20/2024"} />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];
  return (
    <div id="wd-assignments-editor">
      <b>Assignment Name</b>
      <br></br>
      <br></br>
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        {formInputContent.map((props) => (
          <>
            <LabeledFormInput {...props} />
            <br />
          </>
        ))}
      </table>
    </div>
  );
}

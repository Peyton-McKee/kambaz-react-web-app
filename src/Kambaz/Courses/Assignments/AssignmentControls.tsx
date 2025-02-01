import { Button, FormControl, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

export default function AssignmentsControls() {
  return (
    <div id="wd-assignments-controls" className="d-flex align-items-center">
      <div className="me-1 float-end">
        <InputGroup id="wd-search-assignment-inp">
          <InputGroup.Text>
            <BsSearch />
          </InputGroup.Text>
          <FormControl type="text" placeholder="Search for Assignments" />
        </InputGroup>
      </div>
      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-add-assignment-btn"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button>
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-add-assignment-btn"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Button>
    </div>
  );
}

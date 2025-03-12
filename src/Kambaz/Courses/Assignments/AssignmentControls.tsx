import { Button, FormControl, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

export default function AssignmentsControls() {
  const { cid } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const navigate = useNavigate();
  const onAddAssignmentClicked = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments/-1`);
  };
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
      {currentUser.role === "FACULTY" && (
        <Button
          variant="danger"
          size="lg"
          className="me-1 float-end"
          id="wd-add-assignment-btn"
          onClick={onAddAssignmentClicked}
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Assignment
        </Button>
      )}
    </div>
  );
}

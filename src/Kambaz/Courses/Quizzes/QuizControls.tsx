import { Button, FormControl, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as courseClient from "../client";
import { addQuiz } from "./reducer";

export default function QuizzesControls() {
  const { cid } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onAddQuizClicked = async () => {
    if (cid) {
      const quiz = await courseClient.createQuizForCourse(cid, {
        title: "New Quiz",
        dueDate: new Date(),
        dateAvailable: new Date(),
        availableUntil: new Date(),
      });
      dispatch(addQuiz(quiz));
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`);
    }
  };

  return (
    <div id="wd-quizzes-controls" className="d-flex align-items-center">
      <div className="me-1 float-end">
        <InputGroup id="wd-search-quiz-inp">
          <InputGroup.Text>
            <BsSearch />
          </InputGroup.Text>
          <FormControl type="text" placeholder="Search for Quizzes" />
        </InputGroup>
      </div>
      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-add-quiz-btn"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button>
      {currentUser.role === "FACULTY" && (
        <Button
          variant="danger"
          size="lg"
          className="me-1 float-end"
          id="wd-add-Quiz-btn"
          onClick={onAddQuizClicked}
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Quiz
        </Button>
      )}
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
} from "react-bootstrap";
import LabeledFormInput, {
  LabeledFormInputProps,
} from "../Assignments/LabeledFormInput";
import { Link, useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addQuiz, updateQuiz } from "./reducer";
import * as QuizClient from "./client";
import * as courseClient from "../client";
import QuestionEditor from "./Questions/QuestionEditor";
import DefaultEditor from "react-simple-wysiwyg";

const convertToDateString = (date: string) => {
  return new Date(date).toISOString().split("T")[0];
};

export default function QuizEditor({
  quiz,
  setQuiz,
}: {
  quiz: any;
  setQuiz: (quiz: any) => void;
}) {
  const { qid, cid } = useParams();
  const [showQuestions, setShowQuestions] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSave = async () => {
    if (cid) {
      if (qid === "-1") {
        const newQuiz = await courseClient.createQuizForCourse(cid, quiz);
        dispatch(addQuiz(newQuiz));
      } else {
        const updatedQuiz = await QuizClient.updateQuiz(quiz);
        dispatch(updateQuiz(updatedQuiz));
      }
      navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    }
  };

  const AttemptsInput = () => {
    const [multipleAttempts, setMultipleAttempts] = useState(
      quiz.numAttempts > 1
    );

    return (
      <>
        <LabeledFormInput
          label="Multiple Attempts"
          id="wd-multiple-attempts"
          inputComponent={
            <FormSelect
              id="wd-multiple-attempts"
              value={quiz.numAttempts > 1 ? "YES" : "NO"}
              onChange={(e) => {
                setQuiz({ ...quiz, numAttempts: 1 });
                setMultipleAttempts(e.target.value === "YES");
              }}
            >
              <option value={"YES"}>Yes</option>
              <option value={"NO"}>No</option>
            </FormSelect>
          }
        />
        {multipleAttempts && (
          <LabeledFormInput
            id="wd-num-attempts"
            label="Number of Attempts"
            inputComponent={
              <FormControl
                id="wd-num-attempts"
                type="number"
                value={quiz.numAttempts ?? 1}
                onChange={(e) =>
                  setQuiz({ ...quiz, numAttempts: e.target.value })
                }
              />
            }
          />
        )}
      </>
    );
  };

  const formInputContent: LabeledFormInputProps[] = [
    {
      label: "Quiz Type",
      id: "wd-type",
      inputComponent: (
        <FormSelect
          id="wd-type"
          value={quiz.quizType ?? "GRADED_QUIZ"}
          onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
        >
          <option value={"GRADED_QUIZ"}>Graded Quiz</option>
          <option value={"PRACTICE_QUIZ"}>Practice Quiz</option>
          <option value={"GRADED_SURVEY"}>Graded Survey</option>
          <option value={"UNGRADED_SURVEY"}>Ungraded</option>
        </FormSelect>
      ),
    },
    {
      label: "Assignment Group",
      id: "wd-group",
      inputComponent: (
        <FormSelect
          id="wd-group"
          value={quiz.assignmentGroup ?? "QUIZZES"}
          onChange={(e) =>
            setQuiz({ ...quiz, assignmentGroup: e.target.value })
          }
        >
          <option value={"QUIZZES"}>Quizzes</option>
          <option value={"ASSIGNMENTS"}>Assignments</option>
          <option value={"EXAMS"}>Exams</option>
          <option value={"Project"}>Project</option>
        </FormSelect>
      ),
    },
    {
      label: "Shuffle Answers",
      id: "wd-shuffle",
      inputComponent: (
        <FormSelect
          id="wd-shuffle"
          value={
            quiz.shuffleAnswers === undefined
              ? "YES"
              : quiz.shuffleAnswers
              ? "YES"
              : "NO"
          }
          onChange={(e) =>
            setQuiz({ ...quiz, shuffleAnswers: e.target.value === "YES" })
          }
        >
          <option value={"YES"}>Yes</option>
          <option value={"NO"}>No</option>
        </FormSelect>
      ),
    },
    {
      label: "Attempts",
      id: "wd-attempts",
      inputComponent: <AttemptsInput />,
    },
    {
      label: "Show Correct Answers",
      id: "wd-correct-answers",
      inputComponent: (
        <FormSelect
          id="wd-correct-answers"
          value={quiz.showCorrectAnswers ? "YES" : "NO"}
          onChange={(e) =>
            setQuiz({ ...quiz, showCorrectAnswers: e.target.value === "YES" })
          }
        >
          <option value={"YES"}>Yes</option>
          <option value={"NO"}>No</option>
        </FormSelect>
      ),
    },
    {
      label: "One Question at a time",
      id: "wd-one-question",
      inputComponent: (
        <FormSelect
          id="wd-one-question"
          value={
            quiz.oneQuestionAtATime === undefined
              ? "YES"
              : quiz.oneQuestionAtATime
              ? "YES"
              : "NO"
          }
          onChange={(e) =>
            setQuiz({ ...quiz, oneQuestionAtATime: e.target.value === "YES" })
          }
        >
          <option value={"YES"}>Yes</option>
          <option value={"NO"}>No</option>
        </FormSelect>
      ),
    },
    {
      label: "Webcam Required",
      id: "wd-webcam",
      inputComponent: (
        <FormSelect
          id="wd-webcam"
          value={quiz.webCamRequired ? "YES" : "NO"}
          onChange={(e) =>
            setQuiz({ ...quiz, webCamRequired: e.target.value === "YES" })
          }
        >
          <option value={"YES"}>Yes</option>
          <option value={"NO"}>No</option>
        </FormSelect>
      ),
    },
    {
      label: "Lock Questions After Answering",
      id: "wd-lock",
      inputComponent: (
        <FormSelect
          id="wd-lock"
          value={quiz.lockQuestionsAfterAnswering ? "YES" : "NO"}
          onChange={(e) =>
            setQuiz({
              ...quiz,
              lockQuestionsAfterAnswering: e.target.value === "YES",
            })
          }
        >
          <option value={"YES"}>Yes</option>
          <option value={"NO"}>No</option>
        </FormSelect>
      ),
    },
    {
      label: "Time Limit",
      id: "wd-time",
      inputComponent: (
        <FormControl
          id="wd-time"
          value={quiz.timeLimit}
          type="number"
          onChange={(e) => {
            setQuiz({ ...quiz, timeLimit: e.target.value });
          }}
        />
      ),
    },
    {
      label: "Access Code",
      id: "wd-access",
      inputComponent: (
        <FormControl
          id="wd-access"
          value={quiz.accessCode}
          onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
        />
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
            value={convertToDateString(quiz.dueDate)}
            onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
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
                value={convertToDateString(quiz.dateAvailable)}
                onChange={(e) =>
                  setQuiz({
                    ...quiz,
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
                value={convertToDateString(quiz.availableUntil)}
                onChange={(e) =>
                  setQuiz({
                    ...quiz,
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
    <Container>
      <div style={{ display: "flex", gap: 20, float: "right" }}>
        <p>Points: {quiz.points ?? 0}</p>
        <div>{quiz.published ? "Published" : "Not Published"}</div>
      </div>
      <br />
      <hr></hr>
      <div style={{ display: "flex", gap: 20 }}>
        <p
          className="text-danger"
          style={{
            textDecoration: showQuestions ? "none" : "underline",
            cursor: "pointer",
          }}
          onClick={() => setShowQuestions(false)}
        >
          Quiz
        </p>
        <p
          className="text-danger"
          style={{
            textDecoration: showQuestions ? "underline" : "none",
            cursor: "pointer",
          }}
          onClick={() => setShowQuestions(true)}
        >
          Questions
        </p>
      </div>
      {showQuestions ? (
        <QuestionEditor quiz={quiz} />
      ) : (
        <Form id="wd-Quizzes-editor">
          <FormGroup>
            <FormControl
              id="wd-name"
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
          </FormGroup>
          <br />
          <FormLabel>Quiz Instructions</FormLabel>
          <DefaultEditor
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
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
            <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
              <Button className="bg-secondary me-2 border-secondary text-black">
                Cancel
              </Button>
            </Link>

            <Button className="bg-success border-secondary" onClick={onSave}>
              Save
            </Button>
          </div>
        </Form>
      )}
    </Container>
  );
}

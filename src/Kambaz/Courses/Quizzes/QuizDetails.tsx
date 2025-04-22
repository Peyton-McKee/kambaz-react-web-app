/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import QuizEditor from "./Editor";
import { Button, Container } from "react-bootstrap";
import QuizPreview from "./QuizPreview";

export default function QuizDetails() {
  const { qid, cid } = useParams();
  const [edit, setEdit] = useState(false);
  const [preview, setPreview] = useState(false);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const { quizzes } = useSelector((state: any) => state.quizReducer);

  const [quiz, setQuiz] = useState(
    qid === "-1"
      ? {
          title: "",
          course: cid,
          dueDate: new Date().toString(),
          dateAvailable: new Date().toString(),
          availableUntil: new Date().toString(),
          numPoints: 0,
          description: "",
        }
      : quizzes.find((quiz: any) => quiz._id === qid)
  );


  if (!quiz) {
    return <h4 className="text-danger">No Quiz found</h4>;
  }

  const DetailComponent = ({ value, label }: { value: any; label: string }) => {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <h5 style={{ fontWeight: "bold" }}>{label}:</h5>
        <h5>{value}</h5>
      </div>
    );
  };

  return edit ? (
    <QuizEditor quiz={quiz} setQuiz={setQuiz} />
  ) : preview ? (
    <QuizPreview quiz={quiz} />
  ) : (
    <Container>
      {currentUser.role === "FACULTY" && (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Button onClick={() => setPreview(true)}>Preview</Button>
          <Button onClick={() => setEdit(true)}>Edit</Button>
        </div>
      )}
      <h2>{quiz.title}</h2>
      <div>
        <DetailComponent
          value={quiz.quizType ?? "Graded Quiz"}
          label={"Quiz Type"}
        />
        <DetailComponent value={quiz.points} label="Points" />
        <DetailComponent
          value={quiz.assignmentGroup ?? "Quizzes"}
          label="Assignment Group"
        />
        <DetailComponent
          value={quiz.shuffleAnswers ?? "Yes"}
          label="Shuffle Answers"
        />
        <DetailComponent
          value={`${quiz.timeLimit ?? 20} Minutes`}
          label="Time Limit"
        />
        <DetailComponent
          value={quiz.numAttempts > 1 ? "Yes" : "No"}
          label="Multiple Attempts"
        />
        {quiz.numAttempts > 1 && (
          <DetailComponent
            value={quiz.numAttempts}
            label={"Number of Attempts"}
          />
        )}
        <DetailComponent
          value={quiz.showCorrectAnswers ? "Immediately" : "No"}
          label="Show Correct Answers"
        />
        <DetailComponent
          value={quiz.accessCode ?? "None"}
          label="Access Code"
        />
        <DetailComponent
          value={quiz.oneQuestionAtATime === true || undefined ? "Yes" : "No"}
          label="One Question At a Time"
        />
        <DetailComponent
          value={quiz.webCamRequired ? "Yes" : "No"}
          label="Webcam Required"
        />
        <DetailComponent
          value={new Date(quiz.dueDate).toLocaleDateString()}
          label="Due"
        />
        <DetailComponent
          value={new Date(quiz.dateAvailable).toLocaleDateString()}
          label="Date Available"
        />
        <DetailComponent
          value={new Date(quiz.availableUntil).toLocaleDateString()}
          label="Available Until"
        />
      </div>
      {currentUser.role === "STUDENT" && (
        <Button onClick={() => setPreview(true)}>Take Quiz</Button>
      )}
    </Container>
  );
}

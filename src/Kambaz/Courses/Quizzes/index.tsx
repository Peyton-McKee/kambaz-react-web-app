/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, ListGroup } from "react-bootstrap";
import QuizzesControls from "./QuizControls.tsx";
import QuizPreview, { QuizListPreviewProps } from "./QuizListPreview.tsx";
import { BsChevronDown, BsGripVertical } from "react-icons/bs";
import QuizzesControlButtons from "./QuizzesControlButtons.tsx";
import { useParams } from "react-router";
import * as coursesClient from "../client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setQuizzes } from "./reducer.ts";

const quizTransformer = (quiz: any): QuizListPreviewProps => ({
  title: quiz.title,
  courseId: quiz.course,
  quizId: quiz._id,
  dueDate: new Date(quiz.dueDate),
  dateAvailable: new Date(quiz.dateAvailable),
  availableUntil: new Date(quiz.availableUntil),
  numPoints: quiz.points,
  score: quiz.score,
  numQuestions: quiz.questions?.length,
  quiz,
});

export default function Quizzes() {
  const { cid } = useParams();

  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const quizzesProps: QuizListPreviewProps[] = quizzes.map(quizTransformer);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (cid) {
        let quizzes = await coursesClient.getQuizzesForCourse(cid);
        if (currentUser.role === "STUDENT")
          quizzes = quizzes.filter((quiz: any) => quiz.published);
        dispatch(setQuizzes(quizzes));
      }
    };

    fetchQuizzes();
  }, [cid, dispatch, currentUser.role]);

  return (
    <Container id="wd-Quizzes">
      <QuizzesControls />
      <br />
      <ListGroup className="rounded-0" id="wd-Quizzes">
        <div className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="me-2 fs-3" />
          <BsChevronDown className="me-2" />
          Quizzes
          <QuizzesControlButtons />
        </div>
        {quizzesProps.map((quiz) => (
          <ListGroup.Item className="wd-lesson p-3 ps-1">
            <QuizPreview {...quiz} />
          </ListGroup.Item>
        ))}
      </ListGroup>
      {quizzesProps.length === 0 && <p>Press + Quiz to add a quiz</p>}
    </Container>
  );
}

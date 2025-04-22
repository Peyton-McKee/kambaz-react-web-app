/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteQuiz, updateQuiz } from "./reducer";
import * as quizClient from "./client";
import { BiRocket } from "react-icons/bi";
import { FcCancel } from "react-icons/fc";

export interface QuizListPreviewProps {
  courseId: string;
  quizId: string;
  title: string;
  dateAvailable: Date;
  availableUntil: Date;
  dueDate: Date;
  numPoints: number;
  numQuestions: number;
  score?: number;
  quiz: any;
}

export default function QuizListPreview({
  courseId,
  quizId,
  title,
  dateAvailable,
  availableUntil,
  dueDate,
  numPoints,
  numQuestions,
  score,
  quiz,
}: QuizListPreviewProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onConfirmDelete = async () => {
    await quizClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const onPublishClicked = async () => {
    const newQuiz = { ...quiz, published: !quiz.published };
    await quizClient.updateQuiz(newQuiz);
    dispatch(updateQuiz(newQuiz));
  };

  const onEditClicked = async () => {
    navigate(`/Kambaz/Courses/${courseId}/Quizzes/${quiz._id}`);
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <Link
        className="text-decoration-none text-black d-flex align-items-center"
        to={
          currentUser.role === "FACULTY"
            ? `/Kambaz/Courses/${courseId}/Quizzes/${quizId}`
            : `/Kambaz/Courses/${courseId}/Quizzes`
        }
      >
        <BiRocket className="text-success" />

        <div className="mx-2">
          <h4 className="d-block fw-bold">{title}</h4>
          <span className="text-secondary">
            <span className="fw-bold mx-1">
              {Date.now() < dateAvailable.getTime()
                ? `Not available until ${dateAvailable.toLocaleDateString()}`
                : Date.now() < availableUntil.getTime()
                ? "Available"
                : "Closed"}
            </span>
            |
            <span className="fw-bold mx-1">
              Due <span className="fw-normal">{dueDate.toDateString()}</span>
            </span>
            | {numPoints} pts | {numQuestions} Questions |{" "}
            {score !== undefined ? `${score} Scored` : "Not Taken"}
          </span>
        </div>
        <div className="float-end d-flex flex-fill justify-content-end align-items-center">
          {quiz.published ? <GreenCheckmark /> : <FcCancel />}
          <div style={{ position: "relative", display: "inline-block" }}>
            <IoEllipsisVertical
              className="fs-3"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(!open);
              }}
            />

            {open && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  borderRadius: "4px",
                  zIndex: 1000,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <div
                  style={{ padding: "8px 16px", cursor: "pointer" }}
                  onClick={onEditClicked}
                >
                  Edit
                </div>
                <div
                  style={{ padding: "8px 16px", cursor: "pointer" }}
                  onClick={onPublishClicked}
                >
                  {quiz.published ? "Unpublish" : "Publish"}
                </div>
                <div
                  style={{ padding: "8px 16px", cursor: "pointer" }}
                  onClick={onConfirmDelete}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </>
  );
}

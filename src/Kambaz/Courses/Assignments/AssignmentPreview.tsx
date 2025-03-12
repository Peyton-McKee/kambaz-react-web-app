/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsGripVertical } from "react-icons/bs";
import { Link } from "react-router";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaFileSignature, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteAssignment } from "./reducer";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export interface AssignmentPreviewProps {
  courseId: string;
  assignmentId: string;
  title: string;
  dateAvailable: Date;
  dueDate: Date;
  numPoints: number;
}

export default function AssignmentPreview({
  courseId,
  assignmentId,
  title,
  dateAvailable,
  dueDate,
  numPoints,
}: AssignmentPreviewProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const onConfirmDelete = () => {
    dispatch(deleteAssignment(assignmentId));
  };

  return (
    <>
      <Link
        className="text-decoration-none text-black d-flex align-items-center"
        to={
          currentUser.role === "FACULTY"
            ? `/Kambaz/Courses/${courseId}/Assignments/${assignmentId}`
            : `/Kambaz/Courses.${courseId}/Assignments`
        }
      >
        <BsGripVertical className="me-2 fs-3" />
        <FaFileSignature className="text-success me-2 fs-3" />

        <div className="mx-2">
          <h4 className="d-block fw-bold">{title}</h4>
          <span className="text-secondary">
            <span className="text-danger me-1">Multiple Modules</span>|
            <span className="fw-bold mx-1">
              Not available until
              <span className="fw-normal"> {dateAvailable.toDateString()}</span>
            </span>
            |
            <span className="fw-bold mx-1">
              Due <span className="fw-normal">{dueDate.toDateString()}</span>
            </span>
            | {numPoints} pts
          </span>
        </div>
        <div className="float-end d-flex flex-fill justify-content-end align-items-center">
          {currentUser.role === "FACULTY" && (
            <FaTrash
              className="text-danger me-2 mb-1"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowModal(true);
              }}
            />
          )}
          <GreenCheckmark />
          <IoEllipsisVertical className="fs-3" />
        </div>
      </Link>
      <ConfirmDeleteModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        dialogTitle="Are you sure you want to delete this assignment"
        onConfirm={onConfirmDelete}
      />
    </>
  );
}

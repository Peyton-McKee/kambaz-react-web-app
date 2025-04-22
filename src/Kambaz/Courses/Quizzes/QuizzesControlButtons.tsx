import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";

export default function QuizzesControlButtons() {
  const { cid } = useParams();
  const navigate = useNavigate();
  return (
    <div className="float-end">
      <BsPlus onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/-1`)} />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

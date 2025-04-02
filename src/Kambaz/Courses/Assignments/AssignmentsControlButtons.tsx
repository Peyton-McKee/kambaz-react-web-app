import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";

export default function AssignmentsControlButtons() {
  const { cid } = useParams();
  const navigate = useNavigate();
  return (
    <div className="float-end">
      <div className="border rounded-5 p-2 d-inline">40% of Total</div>
      <BsPlus
        onClick={() => navigate(`/Kambaz/Courses/${cid}/assignments/-1`)}
      />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

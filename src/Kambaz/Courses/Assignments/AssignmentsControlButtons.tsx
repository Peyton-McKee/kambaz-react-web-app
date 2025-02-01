import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";

export default function AssignmentsControlButtons() {
  return (
    <div className="float-end">
      <div className="border rounded-5 p-2 d-inline">40% of Total</div>
      <BsPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

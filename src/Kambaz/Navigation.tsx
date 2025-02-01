import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import NavLink from "./NavLink";

export default function KambazNavigation() {
  return (
    <div
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="list-group rounded-0 position-fixed
       bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <a
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
        target="_blank"
        className="list-group-item bg-black border-0 text-center"
      >
        <img src="/images/NEU.webp" width="75px" />
      </a>
      <NavLink
        title="Account"
        icon={<FaRegCircleUser className="fs-1 text text-secondary" />}
        path="/Kambaz/Account"
        textColor="text-white"
      />
      <NavLink
        title="Dashboard"
        icon={<AiOutlineDashboard className="fs-1 text-danger" />}
        path="/Kambaz/Dashboard"
      />
      <NavLink
        title="Courses"
        icon={<LiaBookSolid className="fs-1 text-danger" />}
        path="/Kambaz/Courses"
      />
      <NavLink
        title="Calendar"
        icon={<IoCalendarOutline className="fs-1 text-danger" />}
        path="/Kambaz/Calendar"
      />
      <NavLink
        title="Inbox"
        icon={<FaInbox className="fs-1 text-danger" />}
        path="/Kambaz/Inbox"
      />
      <NavLink
        title="Labs"
        icon={<LiaCogSolid className="fs-1 text-danger" />}
        path="/Labs"
      />
    </div>
  );
}

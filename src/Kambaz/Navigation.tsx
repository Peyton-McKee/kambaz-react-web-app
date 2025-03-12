import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import NavLink from "./NavLink";
import { ListGroup } from "react-bootstrap";

export default function KambazNavigation() {
  const links = [
    {
      label: "Dashboard",
      path: "/Kambaz/Dashboard",
      icon: AiOutlineDashboard,
    },
    { label: "Courses", path: "/Kambaz/Courses", icon: LiaBookSolid },
    { label: "Calendar", path: "/Kambaz/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Kambaz/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
  ];

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroup.Item
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        action
        className="bg-black border-0 text-center"
      >
        <img src="/images/NEU.webp" width="75px" />
      </ListGroup.Item>
      <NavLink
        title="Account"
        icon={<FaRegCircleUser className="fs-1 text text-secondary" />}
        path="/Kambaz/Account"
        textColor="text-white"
      />
      {links.map((link) => (
        <NavLink
          title={link.label}
          icon={link.icon({ className: "fs-1 text-danger" })}
          path={link.path}
        />
      ))}
    </ListGroup>
  );
}

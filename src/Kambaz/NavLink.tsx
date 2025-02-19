import { ReactNode } from "react";
import { Link, useLocation } from "react-router";

export interface NavLinkProps {
  icon: ReactNode;
  title: string;
  path: string;
  textColor?: string;
}
export default function NavLink({
  icon,
  title,
  path,
  textColor = "text-danger",
}: NavLinkProps) {
  const { pathname } = useLocation();

  return (
    <Link
      to={path}
      className={
        "list-group-item text-center border-0 " +
        (pathname.includes(path)
          ? " bg-white text-danger"
          : textColor + " bg-black")
      }
    >
      {icon}
      <br />
      {title}
    </Link>
  );
}

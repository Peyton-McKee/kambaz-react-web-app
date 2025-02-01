import { Link, useLocation } from "react-router";

export interface NavLinkProps {
  title: string;
  path: string;
}

export default function NavLink({ title, path }: NavLinkProps) {
  const { pathname } = useLocation();
  const isActive = pathname.includes(path);
 
  return (
    <div className="d-flex align-items-center" style={{ height: "40px" }}>
      {isActive && (
        <div
          style={{
            borderLeft: "2px solid #000",
            height: "100%",
            width: "1px",
          }}
        ></div>
      )}
      <Link
        className={`ms-3 ${isActive ? "text-black" : "text-danger"}`}
        to={path}
      >
        {title}
      </Link>
    </div>
  );
}

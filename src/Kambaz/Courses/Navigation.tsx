import { useParams } from "react-router-dom";
import NavLink from "../Account/NavLink";

export default function CourseNavigation() {
  const { cid } = useParams();
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation" className="me-2">
      {links.map((link) => (
        <NavLink path={`/Kambaz/Courses/${cid}/${link}`} title={link} />
      ))}
    </div>
  );
}

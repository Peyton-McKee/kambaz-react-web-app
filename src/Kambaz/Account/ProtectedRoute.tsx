/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { isUserEnrolledInCourse } from "../enrollments.utils";

export default function ProtectedRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const { cid } = useParams();

  if (
    !currentUser ||
    (pathname.includes("Courses") &&
      cid &&
      !isUserEnrolledInCourse(enrollments, cid, currentUser._id))
  ) {
    return <Navigate to="/Kambaz/Account/Signin" />;
  } else {
    return children;
  }
}

import { useSelector } from "react-redux";
import NavLink, { NavLinkProps } from "./NavLink";

export default function AccountNavigation() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const navLinks: NavLinkProps[] = [
    {
      title: "Sign In",
      path: "/Kambaz/Account/Signin",
    },
    {
      title: "Sign Up",
      path: "/Kambaz/Account/Signup",
    },
  ];

  if (currentUser) {
    navLinks.push({
      title: "Profile",
      path: "/Kambaz/Account/Profile",
    });
    if (currentUser.role === "ADMIN") {
      navLinks.push({
        title: "Users",
        path: "/Kambaz/Account/Users",
      });
    }
  }

  return <div id="wd-account-navigation">{navLinks.map(NavLink)}</div>;
}

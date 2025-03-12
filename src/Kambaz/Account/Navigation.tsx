import { useSelector } from "react-redux";
import NavLink, { NavLinkProps } from "./NavLink";

export default function AccountNavigation() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const navLinks: NavLinkProps[] = currentUser
    ? [
        {
          title: "Profile",
          path: "/Kambaz/Account/Profile",
        },
      ]
    : [
        {
          title: "Sign In",
          path: "/Kambaz/Account/Signin",
        },
        {
          title: "Sign Up",
          path: "/Kambaz/Account/Signup",
        },
      ];

  return <div id="wd-account-navigation">{navLinks.map(NavLink)}</div>;
}

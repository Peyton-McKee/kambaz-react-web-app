import NavLink, { NavLinkProps } from "./NavLink";

export default function AccountNavigation() {
  const navLinks: NavLinkProps[] = [
    {
      title: "Sign In",
      path: "/Kambaz/Account/Signin",
    },
    {
      title: "Sign Up",
      path: "/Kambaz/Account/Signup",
    },
    {
      title: "Profile",
      path: "/Kambaz/Account/Profile",
    },
  ];
  return <div id="wd-account-navigation">{navLinks.map(NavLink)}</div>;
}

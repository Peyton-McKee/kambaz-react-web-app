import { Navigate, Route, Routes } from "react-router";
import Profile from "./Profile.tsx";
import Signup from "./Signup.tsx";
import Signin from "./Signin.tsx";
import AccountNavigation from "./Navigation.tsx";

export default function Account() {
  return (
    <div id="wd-account-screen" className="d-flex">
      <AccountNavigation />
      <div className="ms-5">
        <Routes>
          <Route path="/" element={<Navigate to="/Kambaz/Account/Signin" />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

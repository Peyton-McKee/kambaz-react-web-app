import { Navigate, Route, Routes } from "react-router";
import Profile from "./Profile.tsx";
import Signup from "./Signup.tsx";
import Signin from "./Signin.tsx";
import AccountNavigation from "./Navigation.tsx";
import { useSelector } from "react-redux";
import Users from "./Users.tsx";

export default function Account() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-account-screen" className="d-flex">
      <AccountNavigation />
      <div className="ms-5">
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={
                  currentUser
                    ? "/Kambaz/Account/Profile"
                    : "/Kambaz/Account/Signin"
                }
              />
            }
          />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Users/:uid" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}

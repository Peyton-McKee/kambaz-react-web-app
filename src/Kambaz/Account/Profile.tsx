/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Button, FormControl } from "react-bootstrap";
import * as client from "./client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    console.log(updatedProfile);
    dispatch(setCurrentUser(updatedProfile));
  };

  useEffect(() => {
    const fetchProfile = () => {
      if (!currentUser) return navigate("/Kambaz/Account/Signin");
      setProfile(currentUser);
    };

    fetchProfile();
  }, [currentUser, navigate, setProfile]);

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl
            defaultValue={profile.username}
            id="wd-username"
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <FormControl
            defaultValue={profile.password}
            id="wd-password"
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <FormControl
            defaultValue={profile.firstName}
            id="wd-firstname"
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <FormControl
            defaultValue={profile.lastName}
            id="wd-lastname"
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <FormControl
            defaultValue={profile.dob}
            id="wd-dob"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            type="date"
          />
          <FormControl
            defaultValue={profile.email}
            id="wd-email"
            className="mb-2"
            onChange={(e) =>
              setProfile((prevProfile: any) => ({
                ...prevProfile,
                email: e.target.value,
              }))
            }
          />
          <select
            onChange={(e) => {
              setProfile((prevProfile: any) => ({
                ...prevProfile,
                role: e.target.value,
              }));
            }}
            value={profile.role}
            className="form-control mb-2"
            id="wd-role"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <div>
            <button
              onClick={updateProfile}
              className="btn btn-primary w-100 mb-2"
            >
              Update
            </button>
            <Button
              onClick={signout}
              className="w-100 mb-2"
              id="wd-signout-btn"
            >
              Sign out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

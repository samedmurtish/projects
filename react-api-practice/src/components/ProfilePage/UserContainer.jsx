import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Outlet } from "react-router-dom";
import defaultImage from "../../images/default-pic.png";

import "../../styles/profile.css";
import EditProfile from "./options/EditProfile";

export function UserContainer() {
  const { name, username, email } = useContext(UserContext);

  const [isOnEditProfile, setIsOnEditProfile] = useState(false);

  return (
    <>
      <div className="bg-slate-100 rounded-md profile">
        <div className="profile-left-side">
          <div className="border-slate-300 profile-picture-container">
            <img className="profile-picture shadow" src={defaultImage} />
            <p className="text-slate-500">{name}</p>
            <p className="text-slate-400">{email && email.toLowerCase()}</p>
          </div>
          <div className="w-full bg-slate-200 h-1"></div>
          <div className="profile-options">
            <div className="px-2 flex flex-col justify-between h-full">
              <div>
                <button className="my-1 w-full hover:bg-slate-300 text-gray-800 font-semibold py-2 px-4 text-slate-500 bg-slate-200 rounded shadow">
                  General
                </button>
                <button className="my-1 w-full hover:bg-slate-300 text-gray-800 font-semibold py-2 px-4 text-slate-500 bg-slate-200 rounded shadow">
                  Security
                </button>
                <button className="my-1 w-full hover:bg-slate-300 text-gray-800 font-semibold py-2 px-4 text-slate-500 bg-slate-200 rounded shadow">
                  Privacy
                </button>
              </div>
              <div>
                <button
                  className="my-2 w-full hover:bg-slate-300 text-gray-800 font-semibold py-2 px-4 text-slate-500 bg-slate-200 rounded shadow "
                  onClick={() => setIsOnEditProfile(!isOnEditProfile)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-slate-200 w-1 seperator"></div>
        <div className="profile-right-side">
          {isOnEditProfile && <EditProfile />}
        </div>
      </div>
      <Outlet />
    </>
  );
}

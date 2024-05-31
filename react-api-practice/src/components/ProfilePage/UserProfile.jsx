import { useContext, useEffect, useInsertionEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { UserContainer } from "./UserContainer";
import GetUserData from "../../scripts/GetUserData";
import { Outlet, Link } from "react-router-dom";
import { Loading } from "../../loader/Loading";

export default function UserProfile() {
  const { user, error, loading } = GetUserData(5);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!loading && !error && user) return setUserData(user);
  }, [loading, error, user]);

  return (
    <>
      <UserContext.Provider value={{ ...userData, setUserData }}>
        <div className="items-center justify-center align-center flex h-screen">
          {loading ? <Loading /> : <UserContainer />}
        </div>
      </UserContext.Provider>
      <Outlet />
    </>
  );
}

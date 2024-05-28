import { useContext, useEffect, useInsertionEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { UserContainer } from "./components/UserContainer";
import GetUserData from "./scripts/GetUserData";

function App() {
  const { user, error, loading } = GetUserData(2);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!loading && !error && user) return setUserData(user);
  }, [loading, error, user]);

  return (
    <UserContext.Provider value={{ ...userData, setUserData }}>
      {loading ? <span>Loading...</span> : <UserContainer />}
    </UserContext.Provider>
  );
}

export default App;

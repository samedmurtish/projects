import { useEffect, useState } from "react";
import { UserProfile } from "./components/UserProfile";
export default function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "samed",
      email: "samed@smdev.net",
    },
    {
      id: 2,
      name: "demas",
      email: "demas@smdev.net",
    },
    {
      id: 3,
      name: "mades",
      email: "mades@smdev.net",
    },
  ]);
  useEffect(() => {
    console.log(users);
  }, [users]);
  return (
    <>
      {users.map((user) => (
        <div key={user.id}>
          <UserProfile user={user} setUser={setUsers} />
        </div>
      ))}
    </>
  );
}

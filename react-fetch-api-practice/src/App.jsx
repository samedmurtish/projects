import RenderUsers from "./RenderUsers";
import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);

  const [getUsers, setGetUsers] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        const json = await response.json();
        setUsers(json);
      } catch (error) {
        console.log(error);
      }
    }
    if (getUsers) fetchUsers();
    setGetUsers(false);
  });

  return (
    <div className="dark">
      <div className="dark:text-white flex flex-col justify-center items-center h-screen">
        <button
          onClick={() => setGetUsers(!getUsers)}
          className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded-full h-10 hover:shadow-2xl transition-all duration-150"
        >
          Get User Data
        </button>
        <div className="text-center flex flex-row flex-wrap w-screen justify-center">
          {users.map((user) => (
            <div key={user.id}>
              <RenderUsers user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

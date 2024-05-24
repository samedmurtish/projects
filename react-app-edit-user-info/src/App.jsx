import { useEffect, useState } from "react";
import { UserProfile } from "./components/UserProfile";
export default function App() {
  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [idCounter, setIdCounter] = useState(0);

  useEffect(() => {
    console.log(users);
  }, [users]);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <span>Username: </span>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <span>Email: </span>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            setIdCounter((counter) => counter + 1);
            setUsers((currentUserState) => [
              ...currentUserState,
              { id: idCounter, name: username, email: email },
            ]);
          }}
        >
          Add User
        </button>
        <br />
        <br />
      </form>

      {users.map((user) => (
        <div key={user.id}>
          <UserProfile user={user} setUser={setUsers} />
        </div>
      ))}
    </>
  );
}

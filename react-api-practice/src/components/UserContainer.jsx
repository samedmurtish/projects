import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function UserContainer() {
  const { name, username, email, id } = useContext(UserContext);

  return (
    <>
      <span>
        {name}
        <br />
        {username}
        <br />
        {email}
        <br />
        {id}
      </span>
    </>
  );
}

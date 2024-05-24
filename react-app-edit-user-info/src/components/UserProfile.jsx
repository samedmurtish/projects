import { useState } from "react";
import PropTypes from "prop-types";

export function UserProfile({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);

  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  return (
    <>
      <div>
        <span>Id: {user.id}</span>
      </div>
      <div>
        <span>Username: {username}</span>
        <br />
        {isEditing && (
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
      </div>
      <div>
        <span>Email: {email}</span>
        <br />
        {isEditing && (
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
      </div>
      {isEditing && (
        <button
          onClick={() => {
            setIsEditing(false);
            setUser((currentUser) => {
              return currentUser.map((currentUser) => {
                if (currentUser.id == user.id) {
                  return { ...currentUser, name: username, email: email };
                } else return currentUser;
              });
            });
          }}
        >
          Apply
        </button>
      )}
      {!isEditing && (
        <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
      )}

      <button>Delete</button>
      <br />
      <br />
    </>
  );
}
UserProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
};

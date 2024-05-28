import { createContext, useContext } from "react";

export const UserContext = createContext({
    id: 0,
    name: "",
    username: "",
    email: "",
    setUserData: () => {},
});
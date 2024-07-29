import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "../Database/connection.js";
export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {!sessionStorage.getItem("token") ? (
        <>
          <Link
            to={"/sign-in"}
            className="p-3 px-4 rounded-lg hover:bg-green-500 transition bg-green-400 text-white font-semibold"
          >
            Login
          </Link>
          <Link
            to={"/sign-up"}
            className="p-3 px-4 rounded-lg hover:bg-blue-500 transition bg-blue-400 text-white font-semibold"
          >
            Sign up
          </Link>
        </>
      ) : (
        <>
          <button
            className="p-3 px-4 rounded-lg hover:bg-rose-500 transition bg-rose-400 text-white font-semibold"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
          {
            JSON.parse(sessionStorage.getItem("token")).user.user_metadata
              .username
          }
        </>
      )}
    </div>
  );
}

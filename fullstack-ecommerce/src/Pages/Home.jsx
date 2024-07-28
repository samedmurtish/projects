import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
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
    </div>
  );
}

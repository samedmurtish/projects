"use client";

import React, { useEffect, useState } from "react";
import SignInCover from "../login.jpeg";

import { auth } from "../../../database/firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  async function signIn(email, password) {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);

      if (data) setUser(auth.currentUser);
    } catch (error) {
      setErrorText(error.message);
      console.log(error.message);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-zinc-100 text-slate-500">
      <div className="rounded-lg bg-white shadow-2xl min-w-full md:min-w-[400px] max-w-[600px] md:h-max h-full">
        <form
          onSubmit={(e) => {
            signIn(email, password);
            e.preventDefault();
          }}
        >
          <div className="h-[200px] overflow-hidden rounded-t-lg relative">
            <img
              src={SignInCover}
              className="absolute w-full overflow-hidden"
            />
          </div>
          <div className="p-10 px-16 flex flex-col gap-10">
            <div className="text-3xl font-light flex w-full justify-center items-center">
              Sign In
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 px-3 rounded-lg border-[1px]"
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 px-3 rounded-lg border-[1px]"
                required
              />
              <button className="bg-emerald-400 hover:bg-emerald-500 transition w-full h-14 mt-3 text-white rounded-lg text-md">
                Sign In
              </button>
            </div>
          </div>
          <span className="w-full text-center flex justify-center items-center text-rose-400 pb-5">
            {errorText}
          </span>
        </form>
      </div>
    </div>
  );
}
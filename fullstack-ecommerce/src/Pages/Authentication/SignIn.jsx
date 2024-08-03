import React, { useEffect, useState } from "react";
import SignUpCover from "../../Images/signincover.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../Database/connection.js";

export default function SignIn() {
  const [errorText, setErrorText] = useState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, []);

  async function signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorText(error.message);
        return;
      }
      localStorage.setItem("token", JSON.stringify(data));

      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-zinc-100">
      <form
        className="min-w-[500px] max-w-[600px] h-max rounded-lg bg-white shadow-2xl pb-10"
        onSubmit={(e) => {
          signIn(email, password);
          e.preventDefault();
        }}
      >
        <div className="h-[200px] overflow-hidden rounded-t-lg relative">
          <img src={SignUpCover} className="absolute w-full overflow-hidden" />
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
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 px-3 rounded-lg border-[1px]"
            />
            <button className="bg-emerald-400 hover:bg-emerald-500 transition w-full h-14 mt-3 text-white rounded-lg text-md">
              Sign In
            </button>
            <p className="flex justify-center items-center pt-5">
              Not a member?
              <Link
                to={"/sign-up"}
                className="text-emerald-400 font-semibold pl-1 cursor-pointer"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        <span className="w-full text-center flex justify-center items-center text-rose-400">
          {errorText}
        </span>
      </form>
    </div>
  );
}

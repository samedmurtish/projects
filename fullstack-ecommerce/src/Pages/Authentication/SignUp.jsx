import React, { useEffect, useState } from "react";
import SignUpCover from "../../Images/cover.jpg";
import { Link } from "react-router-dom";
export default function SignUp() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPasswordsMatching, setIsPasswordsMatching] = useState(
    password == confirmPassword ? true : false
  );

  useEffect(() => {
    setIsPasswordsMatching(password == confirmPassword ? true : false);
  }, [password, confirmPassword]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-zinc-100">
      <div className="min-w-[500px] max-w-[600px] h-max rounded-lg bg-white shadow-2xl pb-10">
        <div className="h-[200px] overflow-hidden rounded-t-lg relative">
          <img src={SignUpCover} className="absolute w-full overflow-hidden" />
        </div>
        <div className="p-10 px-16 flex flex-col gap-10">
          <div className="text-3xl font-light flex w-full justify-center items-center">
            Sign Up
          </div>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Username"
              className="p-2 px-3 rounded-lg border-[1px]"
            />
            <input
              type="text"
              placeholder="Email"
              className="p-2 px-3 rounded-lg border-[1px]"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 px-3 rounded-lg border-[1px]"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 px-3 rounded-lg border-[1px]"
            />
            <button className="bg-emerald-400 hover:bg-emerald-500 transition w-full h-14 mt-3 text-white rounded-lg text-md">
              Sign Up
            </button>
            <p className="flex justify-center items-center pt-5">
              Already have an account?
              <Link
                to={"/sign-in"}
                className="text-emerald-400 font-semibold pl-1 cursor-pointer"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

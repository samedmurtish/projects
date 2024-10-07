"use client";
import React, { useEffect, useState } from "react";
import SignUpCover from "../../../Images/register.jpg";
import Link from "next/link";
import { redirect } from "next/navigation";
import { supabase } from "@/app/(pages)/lib/supabase";

export default function SignUp() {
  const [errorText, setErrorText] = useState("");
  const [warnText, setWarnText] = useState("");

  const [disabled, setDisabled] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPasswordsMatching, setIsPasswordsMatching] = useState(
    password == confirmPassword ? true : false
  );

  async function signUp(email: string, password: string, username: string) {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });
      if (!error && !isPasswordsMatching) {
        setErrorText("Passwords do not match.");
        return;
      }
      if (error) {
        setErrorText(error.message);
        return;
      }
      setWarnText("Check your email for verification link");
      setDisabled(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) redirect("/");
  }, []);

  useEffect(() => {
    setIsPasswordsMatching(password == confirmPassword ? true : false);
  }, [password, confirmPassword]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="h-[200px] overflow-hidden rounded-t-lg relative">
        <img
          src={SignUpCover.src}
          className="absolute w-full overflow-hidden"
        />
      </div>
      <div className="p-10 px-16 flex flex-col gap-10">
        <div className="text-3xl font-light flex w-full justify-center items-center">
          Sign Up
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorText("");
            }}
            className="p-2 px-3 rounded-lg border-[1px]"
            required
          />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorText("");
            }}
            className="p-2 px-3 rounded-lg border-[1px]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorText("");
            }}
            className="p-2 px-3 rounded-lg border-[1px]"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrorText("");
            }}
            className="p-2 px-3 rounded-lg border-[1px]"
            required
          />
          <button
            className="bg-emerald-400 hover:bg-emerald-500 transition w-full h-14 mt-3 text-white rounded-lg text-md"
            onClick={() => {
              if (!disabled) signUp(email, password, username);
            }}
            style={{ backgroundColor: disabled ? "rgb(16, 185, 129)" : "" }}
          >
            Sign Up
          </button>
          <div className="flex flex-col md:flex-row justify-center items-center pt-5">
            <p>Already have an account?</p>
            <div>
              <Link
                href={"/sign-in"}
                className="text-emerald-400 font-semibold pl-1 cursor-pointer"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
      <span className="w-full text-center flex justify-center items-center text-rose-400 pb-5">
        {errorText}
      </span>
      <span className="w-full text-center flex justify-center items-center text-emerald-400 pb-5">
        {warnText}
      </span>
    </form>
  );
}

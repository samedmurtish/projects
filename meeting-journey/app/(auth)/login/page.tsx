"use client";

import React, { useEffect, useState } from "react";
import SignUpCover from "../../../backgroundImages/login.svg";
import loginUpsideDown from "../../../backgroundImages/loginUpsideDown.svg";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [errorText, setErrorText] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) router.push("/");
  }, []);

  async function signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorText(error.message);
        return;
      }
      router.push("/");
      localStorage.setItem("token", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        signIn(email, password);
        e.preventDefault();
      }}
    >
      <div className="relative h-[200px] overflow-hidden rounded-t-lg">
        <img
          src={loginUpsideDown.src}
          className="absolute w-full rotate-180 overflow-hidden"
        />
      </div>
      <div className="flex flex-col gap-10 p-10 px-16 pt-0">
        <div className="flex w-full items-center justify-center text-3xl font-light text-slate-400">
          Sign In
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border-[1px] p-2 px-3"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border-[1px] p-2 px-3"
          />
          <button className="text-md mt-3 h-14 w-full rounded-lg bg-emerald-400 text-white transition hover:bg-emerald-500">
            Sign In
          </button>
        </div>
      </div>
      <span className="flex w-full items-center justify-center text-center text-rose-400">
        {errorText}
      </span>
    </form>
  );
}

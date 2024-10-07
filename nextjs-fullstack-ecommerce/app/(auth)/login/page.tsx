"use client";

import React, { useEffect, useState } from "react";
import SignUpCover from "../../../images/login.jpeg";
import { redirect } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/(pages)/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [errorText, setErrorText] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) redirect("/");
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
      let { data: user } = await supabase
        .from("user_data")
        .select("*")
        .eq("id", data.user.id);

      if (user)
        user[0] = { ...user[0], image: user[0].image ? user[0].image : null };

      localStorage.setItem("user", JSON.stringify(user));

      console.log(user);
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
      <div className="h-[200px] overflow-hidden rounded-t-lg relative">
        <img
          src={SignUpCover.src}
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
          <p className="flex justify-center items-center pt-5">
            Not a member?
            <Link
              href={"/sign-up"}
              className="text-emerald-400 font-semibold pl-1 cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <span className="w-full text-center flex justify-center items-center text-rose-400 pb-5">
        {errorText}
      </span>
    </form>
  );
}

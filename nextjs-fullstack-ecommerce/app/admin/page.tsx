import React from "react";
import { supabase } from "../lib/supabase";

export default async function page() {
  const handleUser = () => {
    console.log(JSON.stringify(user, null, 2));
    return <pre>{JSON.stringify(user, null, 2)}</pre>;
  };

  const token = localStorage.getItem("token")!;

  const { data: user, error } = await supabase
    .from("user")
    .select("*")
    .eq("id", JSON.parse(token).user.id)
    .single();
  console.log(user);
  if (error) console.log(error);
  return <div>{handleUser()}</div>;
}

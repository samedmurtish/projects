import { createClient } from "@supabase/supabase-js";
import { SlArrowUp } from "react-icons/sl";

const supabase = createClient(
  "https://ewxcnlriwybmiexhpmzb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3eGNubHJpd3libWlleGhwbXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIxODMxMjYsImV4cCI6MjAzNzc1OTEyNn0.u5idIvsmbfHiF9y1zGZmC2gUdNHMIWZ-7wVgYS8u2bw"
);

export async function addItem(name, price) {
  await supabase.from("items").insert({ name, price });
  getItems();
}
export async function editItem(id, name, price) {
  await supabase.from("items").update({ name, price }).eq("id", id);
  getItems();
}

export async function deleteItem(id) {
  await supabase.from("items").delete().eq("id", id);
  getItems();
}

export async function getItems() {
  const { data } = await supabase.from("items").select().order("id");

  return data;
}

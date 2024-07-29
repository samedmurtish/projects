import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ewxcnlriwybmiexhpmzb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3eGNubHJpd3libWlleGhwbXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIxODMxMjYsImV4cCI6MjAzNzc1OTEyNn0.u5idIvsmbfHiF9y1zGZmC2gUdNHMIWZ-7wVgYS8u2bw"
);

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out user:", error);
    return null;
  }
  sessionStorage.removeItem("token");
  location.reload();
}

export async function signUp(email, password, username) {
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
    if (error) {
      alert(error);
      return;
    }
    alert("Check your email for verification link");
  } catch (error) {
    console.log(error);
  }
}

export async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error);
      return;
    }
    sessionStorage.setItem("token", JSON.stringify(data));

    window.location = "/";
  } catch (error) {
    console.log(error);
  }
}

export async function addProduct(name, price) {
  await supabase.from("items").insert({ name, price });
  getProducts();
}
export async function editProduct(id, name, price) {
  await supabase.from("items").update({ name, price }).eq("id", id);
  getProducts();
}
export async function deleteProduct(id) {
  await supabase.from("items").delete().eq("id", id);
  getProducts();
}
export async function getProducts() {
  const { data } = await supabase.from("items").select().order("id");

  return data;
}

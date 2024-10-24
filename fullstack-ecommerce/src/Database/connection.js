import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://ewxcnlriwybmiexhpmzb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3eGNubHJpd3libWlleGhwbXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIxODMxMjYsImV4cCI6MjAzNzc1OTEyNn0.u5idIvsmbfHiF9y1zGZmC2gUdNHMIWZ-7wVgYS8u2bw"
);

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Error signing out user:", error);
        return null;
    }
    localStorage.removeItem("token");
    location.reload();
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
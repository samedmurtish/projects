import { supabase } from "./supabase";

export function logout() {
  supabase.auth.signOut();
  localStorage.clear();
  window.location.href = "/";
}

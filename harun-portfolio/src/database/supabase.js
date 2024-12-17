import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xjqscviwjivzzithxfel.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcXNjdml3aml2enppdGh4ZmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NDMxODksImV4cCI6MjA1MDAxOTE4OX0.rSmhZO03zHF0WBvNuCM3j6r3r7_Mb8apW0ulzxLdU2g"
);

export default supabase;

import HomePage from "./components/General/Home/HomePage";
import NavigationBar from "./components/General/Navigation/NavigationBar";
import { supabase } from "./lib/supabase";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <NavigationBar />
    </div>
  );
}

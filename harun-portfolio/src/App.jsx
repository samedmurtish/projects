import { useEffect } from "react";
import About from "./components/AboutPage/About";
import { auth } from "./database/firebase";

function App() {
  document.title = "Harun Spaho`s Portfolio";

  useEffect(() => {
    console.log(auth?.currentUser);
  }, []);

  return (
    <div className="h-screen flex justify-start flex-col w- screen select-none">
      <About />
    </div>
  );
}

export default App;

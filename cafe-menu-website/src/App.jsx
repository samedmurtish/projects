import React from "react";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import NavigationBarMobile from "./Components/NavigationBar/NavigationBarMobile";
import HomePage from "./Components/HomePage/HomePage";

export default function App() {
  return (
    <div className="h-screen w-screen">
      <div className="md:inline hidden">
        <NavigationBar />
      </div>
      <div className="md:hidden inline">
        <NavigationBarMobile />
      </div>

      <HomePage />
    </div>
  );
}

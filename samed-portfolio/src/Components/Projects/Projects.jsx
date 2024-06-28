import React from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";

export default function Projects() {
  return (
    <div className="h-screen">
      <div className="md:inline hidden">
        <NavigationBar />
      </div>
      <div className="md:hidden inline">
        <NavigationBarMobile />
      </div>
    </div>
  );
}

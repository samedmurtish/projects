import React from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";

export default function CV() {
  return (
    <div>
      <div className="hidden sm:block ">
        <NavigationBar />
      </div>
      <div className="block sm:hidden">
        <NavigationBarMobile />
      </div>
    </div>
  );
}

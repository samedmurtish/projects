import React from "react";
import Copyright from "./Copyright";
import Navigations from "./Navigations";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col">
        <Navigations />

        <Copyright />
      </div>
    </>
  );
}

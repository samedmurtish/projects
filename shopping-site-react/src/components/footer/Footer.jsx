import React from "react";
import Copyright from "./Copyright";
import Navigations from "./Navigations";
import UserInfo from "./UserInfo";
import AboutUs from "./AboutUs";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col">
        <UserInfo />
        <Navigations />
        <AboutUs />
        <Copyright />
      </div>
    </>
  );
}

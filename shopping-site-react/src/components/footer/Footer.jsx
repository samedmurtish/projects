import React from "react";
import Copyright from "./Copyright";
import Navigations from "./Navigations";
import UserInfo from "./UserInfo";
import AboutUs from "./AboutUs";
import AboutSite from "./AboutSite";
export default function Footer() {
  return (
    <>
      <div className="flex flex-col">
        <AboutSite />
        <AboutUs />
        <UserInfo />
        <Navigations />
        <Copyright />
      </div>
    </>
  );
}

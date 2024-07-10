import React from "react";
import { Link, useLocation } from "react-router-dom";
import { navigations } from "./Navigations";

export default function NavigationBar() {
  const link = useLocation();
  const renderNavigations = () => {
    return navigations.map((value, valueIndex) => (
      <Link
        key={valueIndex}
        to={`/${value.route}`}
        className="border-b-[#05A981] border-b-2 pb-2 pt-2 px-5 h-max hover:border-b-[#04c292] transition rounded-t-md hover:bg-[rgba(255,255,255,0.05)]"
        style={{ display: value.name === "Home" && "none" }}
        id={value.route == "contact" ? "contact" : ""}
      >
        {value.name}
      </Link>
    ));
  };

  return (
    <div className="fixed w-full z-[9999999] overflow-y-hidden bg-[rgba(0,0,0,0.85)] flex items-center py-5 pb-0">
      <div className="text-white w-5/6 h-full flex justify-between items-center mx-auto my-0 font-extralight pb-0">
        <Link to={"/"} className="flex flex-row h-full text-3xl font-extrabold">
          HOLIDAY
        </Link>
        <div className="md:flex flex-row h-full gap-10 items-center hidden">
          <a
            href="#location"
            className="border-b-[#05A981] border-b-2 pb-2 pt-2 px-5 h-max hover:border-b-[#04c292] transition rounded-t-md hover:bg-[rgba(255,255,255,0.05)]"
            style={{ visibility: link.pathname == "/" ? "" : "hidden" }}
          >
            Location
          </a>

          {renderNavigations()}
        </div>
      </div>
    </div>
  );
}

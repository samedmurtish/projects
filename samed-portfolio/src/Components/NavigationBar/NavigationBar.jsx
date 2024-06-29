import React from "react";
import { Link } from "react-router-dom";
import { navigations } from "./Navigations";

export default function NavigationBar() {
  const renderNavigations = () => {
    return navigations.map((value, valueIndex) => (
      <Link
        key={valueIndex}
        to={`/${value.route}`}
        className="border-b-sky-600 border-b-2 pb-2 pt-2 px-5 h-max hover:border-b-sky-500 transition rounded-t-md hover:bg-[rgba(255,255,255,0.05)]"
      >
        {value.name}
      </Link>
    ));
  };

  return (
    <div className="absolute w-full z-[9999999] overflow-y-hidden">
      <div className="text-white w-5/6 h-full flex justify-between items-center mx-auto my-0 py-7 border-b-2 border-b-[#1D2537] font-extralight pb-0">
        <Link to={"/"} className="flex flex-row h-full text-3xl font-extrabold">
          smd.
        </Link>
        <div className="md:flex flex-row h-full gap-10 items-center hidden">
          {renderNavigations()}
        </div>
      </div>
    </div>
  );
}

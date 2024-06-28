import React from "react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <div className="text-white w-5/6 h-full flex justify-between items-center mx-auto my-0 py-7 border-b-2 border-b-[#1D2537] font-extralight pb-0">
      <Link to={"/"} className="flex flex-row h-full text-3xl">
        smd.
      </Link>
      <div className="md:flex flex-row h-full gap-10 items-center hidden">
        <Link
          to={"/projects"}
          className="border-b-[rgba(255,255,255,0.4)] border-b-2 pb-2 pt-2 px-5 h-max hover:border-b-white transition rounded-t-md hover:bg-[rgba(255,255,255,0.05)]"
        >
          Projects
        </Link>
        <Link
          to={"/about"}
          className="border-b-[rgba(255,255,255,0.4)] border-b-2 pb-2 pt-2 px-5 h-max hover:border-b-white transition rounded-t-md hover:bg-[rgba(255,255,255,0.05)]"
        >
          About
        </Link>
        <Link
          to={"/contact"}
          className="border-b-[rgba(255,255,255,0.4)] border-b-2 pb-2 pt-2 px-5 h-max hover:border-b-white transition rounded-t-md hover:bg-[rgba(255,255,255,0.05)]"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}

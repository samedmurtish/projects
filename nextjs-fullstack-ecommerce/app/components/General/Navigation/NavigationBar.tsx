import React from "react";
import { BsList } from "react-icons/bs";

export default function NavigationBar() {
  return (
    <div className="w-full bg-white h-20 select-none">
      <div className="text-black flex justify-center items-center gap-32 h-full">
        <button className="cursor-pointer">
          <div className="flex gap-2 justify-center items-center ">
            <span className="text-xl">
              <BsList />
            </span>
            Categories
          </div>
        </button>
        <button className="text-4xl font-extrabold">TrendM</button>
        <div className="flex gap-5">
          <button>About Us</button>
          <button>Contact Us</button>
        </div>
      </div>
    </div>
  );
}

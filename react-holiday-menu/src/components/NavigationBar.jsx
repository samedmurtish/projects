import React from "react";

export default function NavigationBar() {
  return (
    <div className="p-10 flex flex-row justify-center items-end text-2xl text-gray-300 w-full">
      <div className="hover:text-white hover:border-b-neutral-500 border-b-transparent font-semibold border-b-[3px] h-10 transition cursor-pointer flex items-center justify-center w-max">
        CONTACT US
      </div>
      <div className="flex flex-col justify-center items-center px-16 text-white transition cursor-default border-x-2 mx-20 border-x-neutral-700">
        <p className="text-6xl font-semibold transition">HOLIDAY</p>
        <p className="text-3xl font-thin text-gray-200">BEACH BAR</p>
      </div>
      <div className="hover:text-white hover:border-b-neutral-500 border-b-transparent font-semibold border-b-[3px] h-10 transition cursor-pointer flex items-center justify-center w-max">
        ABOUT US
      </div>
    </div>
  );
}

import React from "react";
import cafe from "../../assets/images/cafe.jpg";
import logo from "../../assets/images/logo.png";

export default function HomePage() {
  return (
    <>
      <div className="text-black font-extrabold h-screen w-screen flex pt-32">
        <div>
          <div className="absolute overflow-hidden">
            <img src={cafe} className="h-max" />
            <span className="bg-[rgba(0,0,0,0.5)] h-full w-full absolute top-0"></span>
            <span className="absolute left-0 right-0 top-0 bottom-0 ml-auto mr-auto h-full w-full text-white flex justify-center items-center">
              <img src={logo} className="h-3/4" />
            </span>
          </div>
        </div>
        <div className="h-max w-max text-[#EFAB3A]">Gallery</div>
      </div>
    </>
  );
}

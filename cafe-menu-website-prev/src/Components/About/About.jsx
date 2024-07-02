import React from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";
import cafe from "../../assets/images/gallery-1.jpg";
import logo from "../../assets/images/logo.png";

export default function About() {
  return (
    <div>
      <div className="lg:inline hidden">
        <NavigationBar />
      </div>
      <div className="lg:hidden inline">
        <NavigationBarMobile />
      </div>

      <div className="md:pt-16">
        <div className="relative overflow-hidden w-full h-[500px] flex justify-center items-center lg:pb-40">
          <img
            src={cafe}
            className="relative h-max lg:w-full overflow-hidden"
          />

          <span className="bg-[rgba(0,0,0,0.5)] h-full w-full absolute top-0"></span>
          <span
            className="absolute left-0 right-0 top-0 bottom-0 ml-auto mr-auto h-full w-full text-white flex justify-center items-center flex-col text-4xl"
            id="font"
          >
            About
            <img
              src={logo}
              className="w-5/12 sm:w-3/12 md:4/12 lg:w-2/12 relative"
            />
          </span>
        </div>

        <div className="text-white w-3/4 mx-auto my-0 flex justify-center items-center text-justify">
          HOLIDAY is an established Cocktail Bar that aims to build community by
          providing drinks that bring people together and an atmosphere that is
          a hub for local entertainment. Our approach to delivering only the
          finest service to our customers starts and ends with our constant
          desire to exceed expectations. Come join us to see what we're all
          about.
        </div>
      </div>
    </div>
  );
}

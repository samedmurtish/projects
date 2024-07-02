import React from "react";
import cafe from "../../assets/images/cafe.jpg";
import logo from "../../assets/images/logo.png";

import { homeGallery } from "./homeData";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";
import NavigationBar from "../NavigationBar/NavigationBar";
import { Link } from "react-router-dom";

export default function HomePage() {
  const renderGallery = () => {
    return homeGallery.map((value, valueIndex) => (
      <>
        <img
          key={valueIndex}
          src={value}
          className="w-[200px] lg:w-[350px] h-full"
        />
      </>
    ));
  };
  return (
    <>
      <div className="lg:inline hidden">
        <NavigationBar />
      </div>
      <div className="lg:hidden inline">
        <NavigationBarMobile />
      </div>
      <div className="relative text-black font-extrabold h-full flex pt-16 lg:pt-0 flex-col">
        <div className="relative overflow-hidden w-full h-max flex justify-center items-center ">
          <img src={cafe} className="relative h-[180%] lg:w-full lg:h-screen" />
          <span className="bg-[rgba(0,0,0,0.5)] h-full w-full absolute top-0"></span>
          <span className="absolute left-0 right-0 top-0 md:top-5 bottom-0 ml-auto mr-auto h-full w-full text-white flex justify-center items-center">
            <img src={logo} className="h-3/4 relative" />
          </span>
        </div>
        <div className="mt-10 w-3/4 mx-auto my-0">
          <Link
            to={"/gallery"}
            className="h-max w-max text-[#EFAB3A] z-[9999] block text-3xl py-5"
            id="font"
          >
            Gallery
          </Link>
          <div className="flex justify-center items-center h-full ">
            <div className="flex w-full h-[200px] lg:h-[350px] overflow-x-auto rounded-3xl overflow-hidden justify-start items-center gap-5">
              {renderGallery()}
            </div>
          </div>
          <div className="text-white text-center text-xs py-10 font-thin">
            HOLIDAY is a warm and casual Cocktail Bar located in the center of
            Struga. Since 1995 our goal has been to deliver drinks through a
            painstaking, time-consuming process, using only the finest
            ingredients to yield the most delicious and unique flavor profiles
            available.
            <br /> <br />
            After you've perused our ever-changing spirit lists and allowed
            yourself to unwind a bit, feel free to make a friend or two. After
            all, we're more than just drinks, we're a community. So what are you
            waiting for? Drop by!
          </div>
        </div>
      </div>
    </>
  );
}

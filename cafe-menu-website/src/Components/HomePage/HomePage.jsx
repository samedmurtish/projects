import React, { useEffect, useState } from "react";
import cafe from "../../assets/images/cafe.jpg";
import logo from "../../assets/images/logo.png";

import { homeGallery } from "./homeData";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";
import NavigationBar from "../NavigationBar/NavigationBar";
import { Link } from "react-router-dom";
import MoveToTop from "../MoveToTop/MoveToTop";

export default function HomePage() {
  const renderGallery = () => {
    return homeGallery.map((value, valueIndex) => (
      <img
        key={valueIndex}
        src={value}
        className="w-[200px] lg:w-[350px] h-full"
      />
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
      <MoveToTop />
      <div
        className="relative text-black font-extrabold h-full flex pt-20 lg:pt-0 flex-col"
        id="start"
      >
        <div className="relative overflow-hidden w-full h-max flex justify-center items-center ">
          <img
            src={cafe}
            className="relative h-[180%] lg:w-full lg:h-screen "
          />
          <span className="bg-[rgba(0,0,0,0.5)] h-full w-full absolute top-0"></span>
          <span className="absolute left-0 right-0 top-0 md:top-5 bottom-0 ml-auto mr-auto h-full w-full text-white flex justify-center items-center">
            <img src={logo} className="h-3/4 md:h-1/2 relative" />
          </span>
        </div>

        <div className="mt-10 w-3/4 mx-auto mb-5" id="location">
          {" "}
        </div>
        <div className="mt-10 w-3/4 mx-auto my-0">
          <span
            className="h-max w-max text-[#EFAB3A] z-[9999] block text-3xl py-5"
            id="font"
          >
            Location
          </span>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d631.34222101801!2d20.67626987263184!3d41.174096102818176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350e760b62112f3%3A0xa4f3925466acbccf!2sBeach%20Bar%20Holiday!5e0!3m2!1sen!2smk!4v1720527056828!5m2!1sen!2smk"
            style={{ filter: "invert(90%) hue-rotate(180deg)" }}
            className="w-full h-[350px] md:h-[450px] rounded-3xl"
            loading="lazy"
          ></iframe>
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
          <div
            className="text-white text-center text-xs py-10 font-thin"
            id="textFont"
          >
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

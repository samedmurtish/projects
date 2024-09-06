"use client";
import image1 from "../images/(1).jpg";
import image2 from "../images/(2).jpg";
import image3 from "../images/(3).jpg";
import image4 from "../images/(4).jpg";
import image5 from "../images/(5).jpg";
import image6 from "../images/(6).jpg";
import image7 from "../images/(7).jpg";

import arrow from "../icons/arrow.png";
import arrowColored from "../icons/arrowcolored.png";

import bottomBG from "../backgroundImages/bottom.svg";
import topBG from "../backgroundImages/top.svg";

import { useState } from "react";

export default function Home() {
  const [clicked, setClicked] = useState(false);

  const [journeys, setJourneys] = useState([
    {
      date: {
        day: "Thursday",
        month: "September",
        year: 2024,
      },
      images: [
        image1.src,
        image2.src,
        image3.src,
        image4.src,
        image5.src,
        image6.src,
        image7.src,
      ],
    },
    {
      date: {
        day: "Wednesday",
        month: "September",
        year: 2024,
      },
      images: [image1.src, image2.src, image3.src, image4.src],
    },
  ]);

  const renderImages = () => {
    return journeys.map((journey: any, index: number) => (
      <div
        className={`flex flex-col w-full h-full z-50 justify-center items-center ${
          index == 0 ? "mt-[90rem] md:mt-[70rem] xl:mt-[60rem]" : "mt-0"
        }`}
        key={index}
      >
        <div className="text-7xl font-extrabold text-white p-3 flex flex-col justify-center items-center mb-5">
          <h2>{journey.date.year}</h2>
          <h2 className="text-4xl text-slate-400">{journey.date.month}</h2>
          <h2 className="text-3xl text-slate-500">{journey.date.day}</h2>
          <p className="text-slate-500 font-semibold text-xl text-center">
            {journey.description}
          </p>
        </div>
        <div className="bg-slate-100 w-screen md:w-1/2 h-full text-white p-5 md:min-w-[450px] rounded-3xl">
          <div className="relative flex flex-col">
            <div className="flex gap-2 justify-center flex-wrap ">
              {journey.images.map((image: any, index: number) => (
                <img
                  className="w-32 h-32 bg-white rounded-3xl transition-all ease-in-out duration-300 object-cover hover:flex-grow-[1]"
                  src={image}
                  key={index}
                ></img>
              ))}
            </div>
            <img
              className="w-32 h-32 rounded-full self-center absolute bottom-[-5rem] bg-black border-2 hover:w-44 hover:h-44 hover:bottom-[-6rem] transition-all object-cover"
              src={image1.src}
            ></img>
          </div>
        </div>
        {index != journeys.length - 1 ? (
          <img
            src={arrowColored.src}
            className="w-48 h-48 mt-24 mb-32 md:mb-12"
          />
        ) : null}
      </div>
    ));
  };
  /**/
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="h-[100vh] w-screen">
        <div
          className={`text-white absolute top-[10%] md:top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 ${
            clicked ? "left-[30%]" : "left-1/2"
          } transition-all duration-300 ease-in-out z-[200]`}
          onClick={() => setClicked(!clicked)}
        >
          <button className="bg-green-400 hover:bg-green-500 active:bg-green-600 font-semibold text-white text-xl p-3 px-5 rounded-lg">
            Add Memory
          </button>
        </div>
        <span className="absolute top-[18%] md:top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] text-white">
          OR
        </span>
        <img
          src={bottomBG.src}
          className="relative w-full h-full object-cover"
        />
        <div className="text-slate-500 font-semibold z-[100] text-5xl absolute top-[43%] md:top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full flex justify-center items-center flex-col">
          <p className="px-5">
            Scroll down to begin the journey of our memories!
          </p>
          <img src={arrowColored.src} className="w-48 h-48 mt-5 md:mt-12" />
        </div>
      </div>
      <div className="w-screen h-[100vh] flex justify-center items-center flex-col relative ">
        <img src={topBG.src} className="absolute w-full h-full object-cover" />
        {renderImages()}
      </div>
    </main>
  );
}

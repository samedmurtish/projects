"use client";
import image1 from "../images/(1).jpg";
import image2 from "../images/(2).jpg";
import image3 from "../images/(3).jpg";
import image4 from "../images/(4).jpg";
import image5 from "../images/(5).jpg";
import image6 from "../images/(6).jpg";
import image7 from "../images/(7).jpg";

import arrowColored from "../icons/arrowcolored.png";

import bottomBG from "../backgroundImages/bottom.svg";
import topBG from "../backgroundImages/top.svg";

import { useState } from "react";

export default function Home() {
  const [clicked, setClicked] = useState(false);

  const [isAdmin, setIsAdmin] = useState(true);

  const [newJourney, setNewJourney] = useState({
    date: {
      day: "",
      month: "",
      year: 0,
    },
    images: [],
  });

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
          index == 0
            ? "mt-[90rem] md:mt-[80rem] xl:mt-[60rem] xs:mt-[150rem]"
            : "mt-0"
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
            />
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
  /*             <div className="">
            <div
              className={`text-white absolute top-[10%] md:top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                clicked ? "opacity-0 left-[-100%]" : "opacity-100 left-1/2"
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
          </div>     */

  const handleAddButton = (e: any) => {
    setClicked(!clicked);
    setTimeout(() => {
      e.target.remove();
    }, 150);
  };

  const addImage = (e: any) => {
    setNewJourney((prev: any) => ({ ...prev, images: [...prev.images, e] }));
  };

  return (
    <main className="flex h-full flex-col items-center justify-center select-none">
      <div className="h-[100vh] w-screen">
        <img
          src={bottomBG.src}
          className="relative w-full h-full object-cover pointer-events-none"
        />
        <div className="text-slate-500 font-semibold z-[100] text-5xl absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full flex justify-center items-center flex-col gap-5 lg:gap-10 lg:flex-row">
          {isAdmin && (
            <>
              <div
                className={`text-white  ${
                  clicked ? "opacity-0" : "opacity-100 left-1/2"
                } transition-all duration-150 ease-in-out z-[200] flex`}
                onClick={(e) => handleAddButton(e)}
              >
                <button className="bg-green-400 hover:bg-green-500 active:bg-green-600 font-semibold text-white text-xl p-3 px-5 rounded-lg">
                  Add Memory
                </button>
              </div>

              <div
                className={`relative ${
                  clicked
                    ? "min-w-[36rem] max-w-[45rem] h-[25rem] bg-[rgba(255,255,255,0.3)]"
                    : "w-0 h-0 bg-[rgba(255,255,255,0.0)]"
                } transition-all duration-700 rounded-xl flex flex-wrap p-3`}
              >
                <div className="w-max flex flex-wrap overflow-y-auto h-full items-start justify-start gap-2">
                  <label
                    className={`${
                      clicked ? "w-32 h-32" : "w-0 h-0"
                    } flex justify-center items-center bg-blue-500 transition-all text-white rounded-lg cursor-pointer border-2 border-transparent hover:border-white hover:border-opacity-40 duration-1000 hover:duration-300`}
                  >
                    +
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e: any) =>
                        addImage(URL.createObjectURL(e.target.files[0]))
                      }
                    />
                  </label>
                  {newJourney.images.map((image: any, index: any) => (
                    <img
                      className={`${
                        clicked ? "w-32 h-32" : "w-0 h-0"
                      } flex justify-center items-center bg-blue-500 transition-all text-white rounded-lg cursor-pointer border-2 border-transparent hover:border-white hover:border-opacity-40 duration-300 hover:duration-300 bg-transparent hover:bg-[rgba(255,255,255,0.2)] object-cover`}
                      src={image}
                      key={index}
                    ></img>
                  ))}
                </div>
                <div className="flex absolute bottom-[-5rem] -translate-x-1/2 -translate-y-1/4 left-1/2 gap-5 justify-center items-center">
                  <div className="w-full">2024</div>
                  <div
                    className={`w-full ${
                      clicked
                        ? "w-32 h-32 border-2 opacity-100"
                        : "w-0 h-0 border-0 opacity-0"
                    } rounded-full hover:w-44 hover:h-44 transition-all hover:duration-300  duration-1000 object-cover self-center justify-self-center flex justify-center items-center bg-yellow-400 cursor-pointer text-white border-white`}
                  >
                    +
                  </div>
                  <div className="w-full">september</div>
                </div>
              </div>
              <span className="text-white text-base">OR</span>
            </>
          )}

          <div
            className={`flex flex-col items-center justify-center w-full ${
              isAdmin ? "md:w-[40rem]" : "w-full"
            }`}
          >
            <p className="px-5 w-full">
              Scroll down to begin the journey of our memories!
            </p>
            <img
              src={arrowColored.src}
              className="w-48 h-48 mt-5 md:mt-12 self-center justify-self-center"
            />
          </div>
        </div>
      </div>
      <div className="w-screen h-[100vh] flex justify-center items-center flex-col relative ">
        <img
          src={topBG.src}
          className="absolute w-full h-full object-cover pointer-events-none "
        />
        {renderImages()}
      </div>
    </main>
  );
}

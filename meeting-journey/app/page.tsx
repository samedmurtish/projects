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

import { useEffect, useState } from "react";

export default function Home() {
  const [clicked, setClicked] = useState(false);

  const [isAdmin, setIsAdmin] = useState(true);

  const [newJourney, setNewJourney] = useState({
    thumbnail: "",
    date: {
      day: "",
      month: "",
      year: 0,
    },
    dateNumber: {
      day: 0,
      month: 0,
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
          index == 0 ? "mt-[20rem]" : "mt-0"
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
        <div className="bg-slate-100 w-screen md:w-1/2 md:h-full h-max text-white p-5 md:min-w-[450px] rounded-3xl">
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
              src={journey.thumbnail}
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
    e.target.remove();
  };

  useEffect(() => {
    console.log(newJourney);
  }, [newJourney]);
  const addImage = (e: any) => {
    Array.from(e).map((image: any) => {
      setNewJourney((prev: any) => ({
        ...prev,
        images: [...prev.images, URL.createObjectURL(image)],
      }));
    });
  };

  const handleRemoveImage = (index: number) => {
    setNewJourney((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index),
    }));
  };
  const handlePostJourney = async () => {
    console.log("posting, ", newJourney);

    setJourneys((prev: any) => [...prev, newJourney]);

    return setNewJourney({
      thumbnail: "",
      date: {
        day: "",
        month: "",
        year: 0,
      },
      dateNumber: {
        day: 0,
        month: 0,
        year: 0,
      },
      images: [],
    });
  };

  const handleSeperateDate = (e: any) => {
    var date = new Date(e);
    const getDayName: any = () => {
      return date.toLocaleDateString("en-EN", { weekday: "long" });
    };
    const getMonthName: any = () => {
      return date.toLocaleDateString("en-EN", { month: "long" });
    };

    let dayName: any = getDayName();
    let monthName: any = getMonthName();

    let year = Number(e.toString().substring(0, 4));
    let month = Number(e.toString().substring(5, 7));
    let day = Number(e.toString().substring(8, 10));

    setNewJourney((prev: any) => ({
      ...prev,
      date: {
        day: dayName,
        month: monthName,
        year: year,
      },
      dateNumber: {
        day,
        month,
        year,
      },
    }));
  };

  const handleAddThumbnail = (e: any) => {
    return (
      e != undefined &&
      setNewJourney((prev: any) => ({
        ...prev,
        thumbnail: URL.createObjectURL(e),
      }))
    );
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
            <form
              className="flex justify-center items-center gap-5"
              onSubmit={(e) => {
                e.preventDefault();

                if (!newJourney.thumbnail) {
                  alert("Please select a thumbnail.");
                  return;
                }

                if (newJourney.images.length <= 0) {
                  alert("Please select at least one image.");
                  return;
                }

                if (newJourney.images.length > 0 && newJourney.thumbnail) {
                  handlePostJourney();
                }
              }}
            >
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
              <div className="fixed lg:relative sm:bottom-5 md:bottom-12 bottom-48 top-0 left-0 right-0 -translate-y-1/2 lg:-translate-y-0">
                <div
                  className={`relative ${
                    clicked
                      ? "min-w-screen lg:min-w-[36rem]  max-w-screen lg:max-w-[45rem] h-screen lg:h-[25rem] bg-white lg:bg-[rgba(255,255,255,0.3)]"
                      : "w-0 h-0 bg-[rgba(255,255,255,0.0)] overflow-hidden overflow-y-hidden"
                  } transition-all duration-700 rounded-xl flex flex-wrap p-3 overflow-y-auto `}
                >
                  <div className="w-full md:w-max h-max flex flex-wrap overflow-y-auto items-start justify-start gap-2">
                    <label
                      className={`${
                        clicked
                          ? "w-full md:w-32 h-32 text-4xl opacity-100"
                          : "w-0 h-0 text-[0px] opacity-0"
                      } mt-72 md:mt-0 flex justify-center items-center bg-blue-500 transition-all text-white rounded-lg cursor-pointer border-2 border-transparent hover:border-white hover:border-opacity-40 duration-1000 hover:duration-300`}
                    >
                      +
                      <input
                        type="file"
                        accept="image/*"
                        name="images"
                        hidden
                        onChange={(e: any) => addImage(e.target.files)}
                        multiple
                      />
                    </label>
                    {newJourney.images.map((image: any, index: any) => (
                      <img
                        className={`${
                          clicked ? "w-32 h-32" : "w-0 h-0"
                        } flex justify-center items-center bg-blue-500 transition-all text-white rounded-lg cursor-pointer border-2 border-transparent hover:border-white hover:border-opacity-40 duration-300 hover:duration-300 bg-transparent hover:bg-[rgba(255,255,255,0.2)] object-cover`}
                        src={image}
                        key={index}
                        onClick={() => handleRemoveImage(index)}
                      />
                    ))}
                  </div>
                </div>
                <label
                  className={`absolute hidden md:flex md:top-[0%] -translate-y-1/2 -translate-x-1/2 left-1/2 ${
                    clicked
                      ? `${
                          newJourney.thumbnail ? "w-36  h-36" : "w-32 h-16"
                        } h-16 border-2 opacity-100 text-3xl`
                      : "w-0 h-0 border-0 opacity-0 text-[0px]"
                  } rounded-full ${
                    newJourney.thumbnail
                      ? " hover:w-32 hover:h-32 "
                      : " hover:w-36 hover:h-36 "
                  } transition-all hover:duration-300  duration-1000 object-cover self-center justify-self-center flex justify-center items-center cursor-pointer text-white border-white bg-white`}
                >
                  {newJourney.thumbnail ? (
                    <img
                      src={newJourney.thumbnail}
                      className="w-full h-full object-cover rounded-full flex justify-center items-center"
                    />
                  ) : (
                    <div className="bg-green-500 w-full h-full flex justify-center items-center rounded-full">
                      +
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e: any) => handleAddThumbnail(e.target.files[0])}
                    name="thumbnail"
                  />
                </label>
                <label
                  className={`absolute top-[35%] md:hidden z-10 -translate-y-1/2 -translate-x-1/2 left-1/2 ${
                    clicked
                      ? `${
                          newJourney.thumbnail ? "w-36  h-36" : "w-32 h-32"
                        } h-16 border-2 opacity-100 text-3xl`
                      : "w-0 h-0 border-0 opacity-0 text-[0px]"
                  } rounded-full ${
                    newJourney.thumbnail
                      ? " hover:w-32 hover:h-32 "
                      : " hover:w-36 hover:h-36 "
                  } transition-all hover:duration-300  duration-1000 object-cover self-center justify-self-center flex justify-center items-center cursor-pointer text-white border-white`}
                >
                  {newJourney.thumbnail ? (
                    <img
                      src={newJourney.thumbnail}
                      className="w-full h-full object-cover rounded-full flex justify-center items-center"
                    />
                  ) : (
                    <div className="bg-green-500 w-full h-full flex justify-center items-center rounded-full">
                      +
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e: any) => handleAddThumbnail(e.target.files[0])}
                  />
                </label>
                <div
                  className={`${
                    clicked
                      ? "h-full w-full left-1/2 absolute top-0 z-0 bg-white md:hidden"
                      : "h-0 w-0 left-1/2"
                  } -translate-x-1/2 duration-[1500ms] transition-all `}
                />
                <div
                  className={`flex fixed md:absolute top-[10rem] md:top-[14rem] md:bottom-0 -translate-x-1/2	translate-y-1/2 left-1/2 gap-3 justify-center items-center h-max md:h-44 bg-white md:bg-transparent transition duration-1000 ${
                    clicked ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  <input
                    type="date"
                    className={`${
                      clicked
                        ? "h-16 text-base w-max border-2"
                        : "h-0 text-[0px] border-0 w-0"
                    } px-5 rounded-full transition-all duration-1000 border-zinc-100`}
                    onChange={(e) => handleSeperateDate(e.target.value)}
                    required
                  />

                  <button
                    className={`${
                      clicked
                        ? "w-32 h-16 border-2 opacity-100 text-base"
                        : "w-0 h-0 border-0 opacity-0 text-[0px]"
                    } rounded-full md:hover:w-36 md:hover:h-36 transition-all hover:duration-300  duration-1000 object-cover self-center justify-self-center flex justify-center items-center bg-blue-500 cursor-pointer active:bg-blue-600 hover:bg-blue-600 text-white border-white`}
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
          )}
          {isAdmin && <span className="text-white text-base">OR</span>}

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
      <div className="w-screen h-full flex justify-center items-center flex-col relative ">
        <img
          src={topBG.src}
          className="absolute w-full h-[100vh] top-0 object-cover pointer-events-none "
        />
        {renderImages()}
      </div>
    </main>
  );
}

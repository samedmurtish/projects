import React, { useState } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  projectData,
  sortedCategories,
  sortCategories,
} from "../../scripts/data";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";
import SnackbarShow from "../../MuiElements/SnackbarShow";
import Footer from "../Footer/Footer";

export default function Projects() {
  const [showBar, setShowBar] = useState({
    clicked: false,
    message: "Product added to cart successfully!",
  });

  const renderProjects = (category) => {
    return projectData.map((value, valueIndex) => (
      <>
        {value.category == category && (
          <div>
            <Link to={`/project/${value.id}`} state={{ project: value }}>
              <div className="w-[320px] h-[400px] bg-[#1b1b1b] flex items-center flex-col p-5 pb-0 rounded-t-3xl justify-center">
                <img
                  src={value.thumbnail}
                  alt={value.name}
                  className="justify-self-center self-center rounded-xl w-full h-max overflow-hidden"
                />
              </div>
            </Link>
            <p className=" bg-[#1b1b1b] py-5 text-2xl flex justify-center items-center w-full text-center flex-col h-max">
              {value.name} <br />
              <span className="text-lg text-gray-300">{value.category}</span>
            </p>
            <div className="bg-rose-400 h-1 w-full"></div>
            <div className="flex w-full h-full">
              <Link
                to={`/project/${value.id}`}
                state={{ project: value }}
                className="w-2/3 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 h-full p-5 transition text-xl flex justify-center items-center"
                onClick={() =>
                  setShowBar({
                    clicked: true,
                    message: "Redirecting to project..",
                  })
                }
              >
                View Project
              </Link>
              <button
                className="w-1/3 flex justify-center items-center text-3xl hover:text-rose-500 border-4 border-t-0 border-l-0 border-rose-900 bg-rose-950 rounded-br-3xl"
                onClick={() =>
                  setShowBar({
                    clicked: true,
                    message: `"${value.name}" successfully added to your liked projects list.`,
                  })
                }
              >
                <MdFavorite />
              </button>
            </div>
          </div>
        )}
      </>
    ));
  };

  const renderCategories = () => {
    sortCategories();

    return sortedCategories.map((value, valueIndex) => (
      <div key={valueIndex} className="flex flex-col w-full">
        <p className="text-5xl text-white font-thin">{value}</p>
        <div className="w-full bg-rose-600 h-1 my-5" />
        <div className="flex w-full h-full gap-5 justify-start items-start flex-wrap ">
          {renderProjects(value)}
        </div>
        <div className="self-center justify-self-center bg-neutral-700 w-1/2 h-[2px] mt-16" />
        <div className="self-center justify-self-center bg-neutral-700 w-2/3 h-[2px] mx-16 mt-[2px]" />
        <div className="self-center justify-self-center bg-neutral-700 w-1/2 h-[2px] my-16 mt-[2px]" />
      </div>
    ));
  };

  return (
    <div>
      <SnackbarShow get={showBar} set={setShowBar} />
      <div className="hidden sm:block ">
        <NavigationBar />
      </div>
      <div className="block sm:hidden">
        <NavigationBarMobile />
      </div>
      <div className="flex w-full h-full pt-24 text-white  font-semibold">
        <div className="mx-auto my-0 w-3/4 h-max">
          <p className="text-8xl py-10 font-extrabold">Projects</p>
          <div className="flex w-full h-full gap-5 justify-start items-center flex-wrap">
            {renderCategories()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

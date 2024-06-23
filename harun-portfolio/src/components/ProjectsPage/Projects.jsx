import React, { useState } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { projectData } from "../../scripts/data";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";
import SnackbarShow from "../../MuiElements/SnackbarShow";

export default function Projects() {
  const [showBar, setShowBar] = useState({
    clicked: false,
    message: "Product added to cart successfully!",
  });

  const renderProjects = () => {
    return projectData.map((value, valueIndex) => (
      <div key={valueIndex}>
        <Link to={`/project/${value.id}`} state={{ project: value }}>
          <div className="w-max h-max bg-[#1b1b1b] flex justify-start items-center flex-col p-5 pb-0 rounded-tl-3xl">
            <img
              src={value.img}
              alt={value.name}
              className=" rounded-tl-xl w-full h-[400px]"
            />
            <p className="p-3 text-2xl flex justify-center items-center w-full text-center flex-col m-5">
              {value.name} <br />
              <span className="text-lg text-gray-300">{value.serie}</span>
            </p>
          </div>
        </Link>
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
          <button className="w-1/3 flex justify-center items-center text-3xl hover:text-rose-500 border-4 border-t-0 border-l-0 border-rose-900 bg-rose-950 rounded-br-3xl">
            <MdFavorite />
          </button>
        </div>
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
      <div className="flex w-full h-full pt-44 text-white  font-semibold">
        <div className="mx-auto my-0 w-3/4 h-max">
          <p className="text-5xl">Projects</p>
          <div className="w-full bg-rose-600 h-1 my-5" />
          <div className="flex w-full h-full gap-5 justify-start items-center flex-wrap">
            {renderProjects()}
          </div>
        </div>
      </div>
    </div>
  );
}

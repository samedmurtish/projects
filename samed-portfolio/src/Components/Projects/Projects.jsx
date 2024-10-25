import React, { useRef } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";
import { projects, sortCategories, sortedCategories } from "./data/data";
import { Link } from "react-router-dom";

export default function Projects() {
  /* const renderProjects = () => {
    return projects.map((value, valueIndex) => (
      <div key={valueIndex}>{value.name}</div>
    ));
  }; */
  const checkMobile = useRef();
  const renderTags = (project) => {
    return project.languages.map((value, valueIndex) => (
      <div
        key={valueIndex}
        className="w-max h-max hover:bg-sky-400 bg-sky-500 px-2 rounded-full flex font-normal text-white border-[3px] border-sky-600"
      >
        {value}
      </div>
    ));
  };

  const renderProjects = (category) => {
    return projects.map((value, valueIndex) => {
      if (value.category === category) {
        return (
          <div key={valueIndex} className="w-[300px]">
            <div className="flex md:hidden" ref={checkMobile}></div>
            <div
              className="rounded-t-3xl"
              style={{
                backgroundColor: value.highlighted ? "rgb(253 224 71)" : "",
              }}
            >
              <div
                className="w-full bg-yellow-300 hover:font-extrabold text-3xl font-bold p-3 flex justify-center items-center rounded-t-3xl font-outline-2 hover:font-outline-4"
                style={{ visibility: !value.highlighted ? "hidden" : "" }}
              >
                Highlighted
              </div>
              <div
                className="w-[300px] h-[300px] bg-[#212121] flex items-center flex-col p-5 pb-0 justify-center rounded-t-3xl"
                style={{ borderTopWidth: value.highlighted ? "4px" : "" }}
              >
                <img
                  src={value.image}
                  alt={value.name}
                  className="justify-self-center self-center rounded-xl w-full h-max overflow-hidden"
                />
              </div>
            </div>
            <div
              className="bg-[#1b1b1b] py-5 text-2xl flex justify-center items-center w-full text-center flex-col h-max gap-4"
              title={value.description}
            >
              <div className="w-[250px] text-ellipsis overflow-hidden text-nowrap">
                {value.name} <br />
              </div>
              <div className="text-lg text-gray-300 w-full flex px-3 gap-1 justify-center select-none flex-wrap">
                {renderTags(value)}
              </div>
            </div>
            <div className="bg-sky-400 h-1 w-full"></div>
            <div className="flex w-full h-full">
              <Link
                to={
                  value.purejs
                    ? `http://projects.samedmurtish.xyz/${value.route}/index.html`
                    : value.react
                    ? `http://${value.reactRoute.toLowerCase()}.samedmurtish.xyz/`
                    : `/project/${value.id}`
                }
                target="_self"
                state={{ project: value.id }}
                className="w-full bg-sky-600 hover:bg-sky-700 active:bg-sky-800 h-full p-5 transition text-xl flex justify-center items-center rounded-b-xl"
              >
                View Project
              </Link>
            </div>
          </div>
        );
      } else {
        return null; // Handle other cases if needed
      }
    });
  };
  /* 
	<button
	className="w-1/3 flex justify-center items-center text-3xl hover:text-sky-500 border-4 border-t-0 border-l-0 border-sky-900 bg-sky-950 rounded-br-3xl"
	onClick={() =>
		setShowBar({
			clicked: true,
			message: `"${value.name}" successfully added to your liked projects list.`,
		})
	}
></button> */
  const renderCategories = () => {
    sortCategories();

    return sortedCategories.map((value, valueIndex) => (
      <div key={valueIndex} className="flex flex-col w-full mb-24">
        <p className="text-5xl text-white font-thin">{value}</p>
        <div className="flex">
          <div className="w-2/3 bg-sky-600 h-1 my-5" />
          <div className="w-[20%] bg-sky-500 h-1 my-5" />
          <div className="w-[10%] bg-sky-400 h-1 my-5" />
          <div className="w-[5%] bg-sky-300 h-1 my-5" />
        </div>
        <div className="flex w-full h-full gap-5 justify-center md:justify-start items-start flex-wrap">
          {renderProjects(value)}
        </div>
      </div>
    ));
  };
  return (
    <div className="h-full select-none">
      <div className="md:inline hidden">
        <NavigationBar />
      </div>
      <div className="md:hidden inline">
        <NavigationBarMobile />
      </div>
      <div className="w-5/6 mx-auto my-0 text-white pt-32 ">
        <div className="text-7xl font-extrabold">Projects</div>
        <div className="w-full h-1 bg-sky-500 " />
        <div className="w-full h-full pl-0 md:pl-10 pt-10 text-5xl font-extrabold">
          {renderCategories()}
        </div>
      </div>
    </div>
  );
}

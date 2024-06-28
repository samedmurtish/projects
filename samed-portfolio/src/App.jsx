import React from "react";
import NavigationBar from "./Components/NavigationBar/NavigationBar";

import { FaReact, FaHtml5 } from "react-icons/fa";
import { BiLogoJavascript } from "react-icons/bi";
import { IoLogoCss3 } from "react-icons/io";
import { RiTailwindCssFill } from "react-icons/ri";

import me from "./assets/photos/me.png";
import NavigationBarMobile from "./Components/NavigationBar/NavigationBarMobile";

const skills = [
  {
    name: "ReactJS",
    icon: <FaReact />,
    progress: 90,
    color: "rgb(56 189 248)",
  },
  {
    name: "Javascript",
    icon: <BiLogoJavascript />,
    progress: 90,
    color: "rgb(253 224 71)",
  },
  {
    name: "HTML5",
    icon: <FaHtml5 />,
    progress: 100,
    color: "rgb(249 115 22)",
  },
  {
    name: "CSS3",
    icon: <IoLogoCss3 />,
    progress: 100,
    color: "rgb(59 130 246)",
  },
  {
    name: "TailwindCSS",
    icon: <RiTailwindCssFill />,
    progress: 100,
    color: "rgb(56 189 248)",
  },
];

const handleSkills = () => {
  return skills.map((value, valueIndex) => (
    <div key={valueIndex} className="w-full">
      <div
        className="flex flex-col justify-center items-center w-full gap-5"
        style={{ color: value.color }}
      >
        <span className="text-7xl">{value.icon}</span>
        <div className="h-[10px] w-full bg-gray-500">
          <div
            className="h-[10px] bg-gray-100"
            style={{ width: `${value.progress}%` }}
          ></div>
        </div>
        <span className="text-lg font-extrabold">
          {value.progress} <span className="text-white">%</span>
        </span>
      </div>
    </div>
  ));
};

export default function App() {
  return (
    <>
      <div className="md:inline hidden">
        <NavigationBar />
      </div>
      <div className="md:hidden inline">
        <NavigationBarMobile />
      </div>
      <div className="sm:overflow-x-hidden md:pt-0 pt-10 text-white flex justify-start items-center h-full mx-auto my-0 w-5/6 overflow-y-auto flex-col pb-32">
        <div className=" mt-28 flex flex-col md:flex-row md:justify-start md:items-start justify-center items-center">
          <div className="w-6/12 md:w-3/12 flex flex-col gap-10">
            <div className="overflow-hidden flex justify-center items-center border-b-8 border-[#1D2537] rounded-full md:mb-0 mb-16">
              <img src={me} className="bg-[rgba(0,0,0,.1)]" />
            </div>
            <span className="hidden flex-col gap-10 lg:hidden sm:hidden md:flex">
              {handleSkills()}
            </span>
          </div>
          <div className="md:ml-16 w-full md:w-[50vw]">
            <div className="px-5">
              <p className="font-extrabold lg:text-8xl text-7xl m-0 text-justify">
                SAMED <span className="font">MURTISH</span>
              </p>
              <p className="font-extralight lg:text-7xl text-6xl text-rose-500 m-0 teko flex">
                <span className="font-extralight">Front-End</span>{" "}
                <div className="ml-5 text-white px-5 pt-2  bg-rose-500 overflow-hidden h-max w-max text-4xl lg:text-5xl">
                  developer
                </div>
              </p>
            </div>
            <div className="w-full h-1 bg-[#1D2537] my-10 mt-6"></div>
            <p className="text-justify text-lg h-full w-full bg-[rgba(0,0,0,.1)] p-3 px-5 rounded-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Perferendis quaerat, sit obcaecati optio reprehenderit sapiente
              voluptatibus impedit totam aut ex magni, eligendi cum corporis!
              Saepe fuga ab nemo quam esse! Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Eos, qui consequuntur. Laboriosam ex
              velit laborum veritatis! Ea impedit aliquam atque accusamus
              eveniet tempora minima, quasi deserunt. Hic, minus veniam.
              Exercitationem? Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Atque odio repudiandae voluptas possimus aspernatur vel
              quasi quod aliquid. Delectus beatae ipsam ex provident totam omnis
              temporibus natus laborum doloremque unde.
            </p>
          </div>
        </div>
        <div className="flex flex-col xl:flex lg:flex md:hidden sm:flex text-8xl pt-20 w-full lg:flex-row justify-between gap-16">
          {handleSkills()}
        </div>
      </div>
    </>
  );
}

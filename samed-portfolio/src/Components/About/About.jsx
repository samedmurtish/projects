import React from "react";
import NavigationBar from "../NavigationBar/NavigationBar";

import { FaReact, FaHtml5 } from "react-icons/fa";
import { BiLogoJavascript } from "react-icons/bi";
import { IoLogoCss3 } from "react-icons/io";
import { RiTailwindCssFill } from "react-icons/ri";

import me from "../../assets/photos/me.png";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";

export default function About() {
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
      <div key={valueIndex} className="md:w-4/12 w-full">
        <div
          className="flex flex-col justify-center items-center w-full gap-5 "
          style={{ color: value.color }}
        >
          <span className="text-7xl">{value.icon}</span>
          <div className="h-[10px] w-full bg-gray-500">
            <div
              className="h-[10px] bg-gray-100"
              style={{ width: `${value.progress}%` }}
            ></div>
          </div>
          <span className="text-lg font-extrabold text-nowrap">
            {value.progress} <span className="text-white">%</span>
          </span>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="md:inline hidden">
        <NavigationBar />
      </div>
      <div className="md:hidden inline">
        <NavigationBarMobile />
      </div>
      <div className="md:pt-10 pt-10 text-white flex justify-start items-center mx-auto my-0 w-5/6 md:5/6 flex-col">
        <div className="mt-28 flex flex-col md:flex-row md:justify-start md:items-start justify-center items-center">
          <div className="w-6/12 md:w-3/12 flex flex-col gap-10">
            <div className="overflow-hidden flex justify-center items-center border-b-8 border-[#1D2537] rounded-full md:mb-0 mb-16">
              <img src={me} className="bg-[rgba(0,0,0,.1)]" />
            </div>
            <span className="hidden flex-col md:flex-row flex-wrap gap-10 lg:hidden sm:hidden md:flex">
              {handleSkills()}
            </span>
          </div>
          <div className="md:ml-16 w-full md:w-[60vw]">
            <div className="px-5">
              <p className="font-extrabold lg:text-8xl text-7xl m-0 text-justify">
                SAMED <span className="font">MURTISH</span>
              </p>
              <p className="font-extralight lg:text-7xl text-6xl text-sky-500 m-0 teko flex flex-col xl:flex-row items-start xl:items-center gap-2 md:gap-0">
                <span className="font-extralight">Front-End</span>{" "}
                <span className="xl:ml-5 text-white px-5 pt-2  bg-sky-500 overflow-hidden h-max w-max text-4xl lg:text-5xl">
                  developer
                </span>
              </p>
            </div>
            <div className="w-full h-1 bg-[#1D2537] my-10 mt-6"></div>
            <p className="text-justify text-lg h-full w-11/12 md:w-full mx-auto my-0 bg-[rgba(255,255,255,.05)] p-3 px-5 rounded-lg">
              Hello, I`m{" "}
              <span className="font-bold text-rose-500">Samed Murtish</span> and
              I`m a <span className="font-bold">self-taught</span> front-end
              developer with a passion for creating engaging{" "}
              <span className="font-bold">user experiences</span>. My journey in
              web development began out of curiosity and has since evolved into
              a professional career where I leverage technologies like
              <span className="text-[#38BDF8] font-bold"> React</span>,{" "}
              <span className="text-[#e380ff] font-bold">Vite</span>,{" "}
              <span className="text-[#6ad2ff] font-bold">Tailwind</span>
              <span className="text-[#0b84b8] font-extrabold">CSS </span> to
              build
              <span className="font-bold"> responsive</span> and{" "}
              <span className="font-bold"> dynamic</span> web applications. I am
              dedicated to{" "}
              <span className="font-bold">continuous learning</span> and
              applying best practices to deliver{" "}
              <span className="font-bold">high-quality</span> software
              solutions.
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

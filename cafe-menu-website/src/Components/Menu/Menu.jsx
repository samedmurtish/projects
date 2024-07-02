import React from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";
import { menu } from "./menuData";
import { Link, Outlet } from "react-router-dom";

export default function Menu() {
  const renderCategories = () => {
    return menu.map((value) => (
      <Link
        key={value.id}
        className="md:w-[700px] h-max min-h-[200px] md:h-[300px] overflow-hidden flex items-center mb-5 bg-[#ffffff0c] hover:bg-[#ffffff11] cursor-pointer rounded-xl transition"
        to={`${value.category}`}
        style={{
          alignSelf: value.id % 2 ? "end" : "",
          justifyContent: value.id % 2 ? "end" : "",
        }}
      >
        {!(value.id % 2) && (
          <img
            src={value.image}
            className="w-1/2 rounded-l-xl self-center md:self-end"
          />
        )}

        <span className="px-5 md:px-16 text-2xl md:text-5xl" id="font">
          {value.title}
        </span>

        {value.id % 2 ? (
          <img
            src={value.image}
            className="w-1/2 rounded-r-xl self-center md:self-center"
          />
        ) : (
          ""
        )}
      </Link>
    ));
  };

  return (
    <div>
      <div className="lg:inline hidden">
        <NavigationBar />
      </div>
      <div className="lg:hidden inline">
        <NavigationBarMobile />
      </div>
      <div className="pt-24 md:pt-32 flex mx-auto my-0 w-3/4 lg:w-1/2 flex-col pb-16 text-[#EFAB3A]">
        <span
          className="flex justify-center items-center w-full text-4xl md:text-6xl pb-10"
          id="font"
        >
          Menu
        </span>
        {renderCategories()}
      </div>
    </div>
  );
}

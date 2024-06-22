import React from "react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  const pages = [
    { link: "about", title: "About Me" },
    { link: "projects", title: "My Projects" },
    { link: "cv", title: "CV" },
  ];

  const renderNav = () => {
    return pages.map((value, valueIndex) => (
      <Link
        to={`/${value.link}`}
        key={valueIndex}
        className="flex justify-center items-center"
      >
        <div className="p-3 border-b-2 border-b-transparent hover:border-b-white cursor-pointer w-max transition hover:bg-[#a0002b] active:bg-[#920127] rounded-t-lg flex">
          <p>{value.title}</p>
        </div>
        {valueIndex != pages.length - 1 && (
          <div className="h-[30px] w-[1px] mx-3 bg-[#cf5f5f]"></div>
        )}
      </Link>
    ));
  };

  return (
    <>
      <div className="bg-[#AB012F] absolute w-full">
        <div className="flex justify-between items-center text-white font-semibold py-5 text-xl mx-auto my-0 w-3/4 shadow-lg">
          <Link className="py-3" to="/">
            Harun Spaho
          </Link>
          <div className="flex">{renderNav()}</div>
        </div>
      </div>
    </>
  );
}

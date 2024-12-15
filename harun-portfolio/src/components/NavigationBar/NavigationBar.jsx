import React, { useState } from "react";
import { Link } from "react-router-dom";
import SnackbarShow from "../../MuiElements/SnackbarShow";

export default function NavigationBar() {
  const pages = [
    { link: "about", title: "About Me" },
    { link: "projects", title: "My Projects" },
    { link: "cv", title: "CV" },
  ];
  const [showBar, setShowBar] = useState({
    clicked: false,
    message: "Redirecting!",
  });

  document.title = "Harun Spaho`s Portfolio";

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
      <SnackbarShow get={showBar} set={setShowBar} />
      <div className="bg-[#ab012e33] border-[#AB012F] border-b-2 fixed w-full backdrop-blur-lg">
        <div className="flex justify-between items-center text-white font-semibold py-5 text-xl mx-auto my-0 w-3/4">
          <Link
            className="py-3 bg-[#AB012F] rounded-xl p-3 px-5 min-w-[5rem] mr-5 inline-flex justify-center items-center text-wrap"
            to="/"
          >
            <span className="text-3xl font-extrabold text-center">
              HARUN SPAHO
            </span>
          </Link>
          <div className="flex bg-[#AB012F] px-5 rounded-xl">{renderNav()}</div>
        </div>
      </div>
    </>
  );
}

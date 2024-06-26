import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
export default function NavigationBarMobile() {
  const pages = [
    { link: "about", title: "About Me" },
    { link: "projects", title: "My Projects" },
    { link: "cv", title: "CV" },
  ];

  const [menuOpened, setMenuOpened] = useState(false);

  document.title = "Harun Spaho`s Portfolio";
  const renderNav = () => {
    return pages.map((value, valueIndex) => (
      <Link
        to={`/${value.link}`}
        key={valueIndex}
        className="flex justify-center items-center px-5 pb-2"
      >
        <div className="p-3 border-b-2 border-b-transparent hover:border-b-white border-b-[#cf5f5f] cursor-pointer w-full transition hover:bg-[#ac002e] bg-[#a0002b] active:bg-[#920127] flex justify-center">
          <p>{value.title}</p>
        </div>
      </Link>
    ));
  };

  return (
    <>
      <div className="bg-[#AB012F] fixed w-full">
        <div className="flex justify-between items-center text-white font-semibold py-5 text-xl mx-auto my-0 w-3/4 ">
          <Link className="py-3" to="/">
            Harun Spaho
          </Link>
          <div
            className="rounded-full bg-[#A1012C] hover:bg-[#8b0328] p-2 cursor-pointer"
            onClick={() => setMenuOpened(!menuOpened)}
          >
            <HiOutlineMenu />
          </div>
        </div>

        {menuOpened && (
          <div className="h-screen w-2/5 bg-[#960029] fixed right-0 text-white">
            <div className="font-semibold py-3">{renderNav()}</div>
          </div>
        )}
      </div>
    </>
  );
}

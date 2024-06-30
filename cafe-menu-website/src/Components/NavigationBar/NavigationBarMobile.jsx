import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { navigations } from "./Navigations";
import { IoIosClose } from "react-icons/io";
export default function NavigationBarMobile() {
  const [menuOpened, setMenuOpened] = useState(false);

  const renderNav = () => {
    return navigations.map((value, valueIndex) => (
      <Link
        to={`/${value.route}`}
        key={valueIndex}
        className="flex justify-center items-center pb-2"
      >
        <div className="p-3 border-b-4 text-white border-b-transparent hover:border-b-[#05A981] cursor-pointer w-3/4 transition hover:bg-[rgba(255,255,255,0.1)] bg-transparent active:bg-[rgba(255,255,255,0.1)] flex justify-center rounded-lg text-2xl md:text-5xl font-bold">
          <p>{value.name}</p>
        </div>
      </Link>
    ));
  };

  return (
    <>
      <div className="bg-[#000000] fixed w-full z-[99999]" id="font">
        <div className="flex justify-center items-center fixed text-white font-semibold py-2 text-xl mx-auto my-0 w-full z-[999999999] bg-black">
          <div
            className="w-3/4 flex flex-row h-full justify-between items-center"
            style={{
              visibility: menuOpened && "hidden",
              width: menuOpened && "0px",
            }}
          >
            <Link className="py-3" to="/">
              <span className="font-extrabold">HOLIDAY</span>
            </Link>
            <div
              className="rounded-full bg-[#151515] hover:bg-[#252525] p-2 cursor-pointer"
              onClick={() => setMenuOpened(!menuOpened)}
            >
              <HiOutlineMenu />
            </div>
          </div>
          <div
            className="text-6xl flex justify-center w-full h-full items-center"
            style={{
              visibility: !menuOpened && "hidden",
              width: !menuOpened && "0px",
            }}
            onClick={() => setMenuOpened(!menuOpened)}
          >
            <IoIosClose />
          </div>
        </div>

        {menuOpened && (
          <div className="h-full w-screen bg-[rgba(0,0,0,0.6)] fixed right-0 text-white flex flex-col justify-center ">
            <div className="font-semibold py-3 flex justify-between flex-col">
              {renderNav()}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

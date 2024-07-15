import React, { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
export default function LeftMenu({ category }) {
  const [menuOpened, setMenuOpened] = useState(false);

  const renderNav = () => {
    return (
      <>
        <ul className="h-full w-full rounded-b-xl px-2">
          <li
            className="bg-[#061d3a] w-full h-10 flex items-center justify-start font-semibold pl-3 hover:bg-[#08274d] cursor-pointer transition text-white border-b-2 border-[#061d3a] hover:border-white hover:border-b-2 active:border-b-2"
            onClick={() => category("all")}
          >
            ALL
          </li>
          <li
            className="bg-[#061d3a] w-full h-10 flex items-center justify-start font-semibold pl-3 hover:bg-[#08274d] cursor-pointer transition text-white border-b-2 border-[#061d3a] hover:border-white hover:border-b-2 active:border-b-2"
            onClick={() => category("groceries")}
          >
            GROCERIES
          </li>
          <li
            className="bg-[#061d3a] w-full h-10 flex items-center justify-start font-semibold pl-3 hover:bg-[#08274d] cursor-pointer transition text-white border-b-2 border-[#061d3a] hover:border-white hover:border-b-2 active:border-b-2"
            onClick={() => category("beauty")}
          >
            BEAUTY
          </li>
          <li
            className="bg-[#061d3a] w-full h-10 flex items-center justify-start font-semibold pl-3 hover:bg-[#08274d] cursor-pointer transition text-white border-b-2 border-[#061d3a] hover:border-white hover:border-b-2 active:border-b-2"
            onClick={() => category("furniture")}
          >
            FURNITURE
          </li>
        </ul>
      </>
    );
  };

  return (
    <>
      <div className="bg-[#061d3a] fixed w-full z-[99999] top-0 left-0 md:hidden flex">
        <div className="flex justify-end items-center text-white font-semibold py-5 text-xl mx-auto my-0 w-3/4 ">
          <div
            className="rounded-full bg-[#05162c] hover:bg-[#05162c] p-2 cursor-pointer"
            onClick={() => setMenuOpened(!menuOpened)}
          >
            <HiOutlineMenuAlt3 />
          </div>
        </div>

        {menuOpened && (
          <div className="h-screen w-2/5 bg-[#05162c] fixed right-0 text-white">
            <div className="font-semibold py-3">{renderNav()}</div>
          </div>
        )}
      </div>

      <div className="w-72 h-max hidden md:flex flex-col justify-center items-center fixed">
        <div className="w-full h-full flex items-center flex-col">
          <div className="bg-slate-600 h-16 w-full rounded-xl flex text-white font-semibold justify-center items-center flex-col border-slate-700 border-t-2 text-xl">
            CATEGORIES
          </div>
          <ul className="h-full w-[90%] bg-gray-200 border-x-4 border-b-4 border-gray-300 rounded-b-xl">
            <li
              className="bg-gray-100 w-full h-10 flex items-center justify-start font-semibold pl-3 hover:bg-gray-50 cursor-pointer transition text-slate-700"
              onClick={() => category("all")}
            >
              ALL
            </li>
            <li
              className="bg-gray-100 w-full h-10 flex items-center justify-start font-semibold pl-3 mt-1 hover:bg-gray-50 cursor-pointer transition text-slate-700"
              onClick={() => category("groceries")}
            >
              GROCERIES
            </li>
            <li
              className="bg-gray-100 w-full h-10 flex items-center justify-start font-semibold pl-3 mt-1 hover:bg-gray-50 cursor-pointer transition text-slate-700"
              onClick={() => category("beauty")}
            >
              BEAUTY
            </li>
            <li
              className="bg-gray-100 w-full h-10 flex items-center justify-start font-semibold pl-3 mt-1 rounded-b-lg hover:bg-gray-50 cursor-pointer transition text-slate-700"
              onClick={() => category("furniture")}
            >
              FURNITURE
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useRef, useState } from "react";
import logo from "../images/logo.png";
import { AiOutlineUser } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
export default function NavigationBar() {
  const [scroll, setScroll] = useState(false);
  const [currentScroll, setCurrentScroll] = useState(window.scrollY);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setCurrentScroll((current) => current + window.scrollY);
      setShow(window.scrollY <= 50);
      setScroll(true);
    };

    setScroll(false);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className="fixed w-full">
        {show && (
          <div className="bg-rose-700 topBar" id="topBar">
            <div className="h-full w-5/6 mx-auto my-0 text-white text-xs flex justify-between text-center items-center py-1 ">
              <div>
                <p>Brand Waali Quality, Bazaar Waali Deal!</p>
              </div>
              <div className="flex">
                <p className="px-2 hover:cursor-pointer">Impact@Snapdeal</p>
                <p className="px-2 hover:cursor-pointer">Help Center</p>
                <p className="px-2 hover:cursor-pointer">Sell On Snapdeal</p>
                <p className="px-2 flex justify-center items-center hover:cursor-pointer">
                  <IoMdDownload /> Download App
                </p>
                <p className="px-2 hover:cursor-pointer">Donate For Elderly</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-rose-600">
          <div className="h-16 w-5/6 mx-auto my-0 flex justify-between items-center text-nowrap flex-nowrap">
            <img src={logo} className="w-50 h-10" alt="" />
            <div className="flex flex-1 mx-32">
              <input
                type="text"
                placeholder="Search products & brands"
                className="px-5 h-9 w-2/4"
              ></input>
              <button className="text-white bg-gray-800 hover:bg-gray-700 transition h-9 w-40 px-6 flex justify-center items-center text-center">
                <FaSearch />
                <p className="px-2">Search</p>
              </button>
            </div>
            <div className="w-32 h-full flex justify-between items-center">
              <p className="text-white flex justify-center items-center">
                <span className="px-3">Cart</span>
                <span className="font-extrabold text-2xl">
                  <RiShoppingCartLine />
                </span>
              </p>
            </div>
            <div className="w-32 h-full flex justify-between items-center">
              <p className="text-white">Sign In</p>
              <div className="bg-rose-700 w-9 h-9 rounded-full flex justify-center items-center">
                <p className="text-1xl text-white">
                  <FaUser />
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

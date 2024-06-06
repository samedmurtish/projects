import React from "react";
import { aboutUsData } from "../../data/data";

export default function AboutUs() {
  const renderAboutUs = () => {
    return aboutUsData.map((value, valueIndex) => (
      <div className="flex flex-col" key={valueIndex}>
        <div className="font-bold pb-5 text-base">{value.title}</div>
        {value.content.map((contentValue, contentValueIndex) => (
          <a
            key={contentValueIndex}
            className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer"
          >
            {contentValue}
          </a>
        ))}
      </div>
    ));
  };

  return (
    <div>
      <div className="shadow bg-white py-10 text-xs text-gray-500 text-pretty flex border-2 border-gray-100 ">
        <div className="flex justify-between w-11/12 mx-auto my-0 ">
          {renderAboutUs()}
          <div className="flex flex-col  w-80">
            <p className="font-bold pb-5 text-base">SUBSCRIBE</p>
            <div className="flex mb-5">
              <input
                type="text"
                className="px-3 border-2 border-gray-200"
                placeholder="Your email address"
              />
              <button className="text-white bg-gray-800 hover:bg-gray-700 transition h-9 w-32 px-6 flex justify-center items-center text-center">
                SUBSCRIBE
              </button>
            </div>
            <p className="text-gray-500">
              Register now to get updates on promotions and coupons.{" "}
              <a className="text-blue-400 hover:text-blue-500 transition hover:underline cursor-pointer">
                Or Download App
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

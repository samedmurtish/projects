import React from "react";
import { womenCategory, menCategory, navigationsText } from "../../data/data";

export default function Navigations() {
  const displayCategory = (category) => {
    return category.map((value, index) => (
      <div key={index} className="flex">
        <a className="hover:underline cursor-pointer flex flex-row text-nowrap flex-nowrap h-fit">
          {value}
        </a>
        {index < category.length - 1 && <p className="px-1">/</p>}
      </div>
    ));
  };

  return (
    <div className="shadow bg-gray-100 py-10 text-xs text-gray-500 text-pretty border-2 border-gray-200">
      <div className="h-full flex flex-col justify-between items-center w-11/12 mx-auto my-0">
        <div className="flex">
          <a className="hover:underline hover:cursor-pointer inline pr-3">
            <span className="font-semibold">Mens: </span>
          </a>
          <div className="flex flex-wrap">{displayCategory(menCategory)}</div>
        </div>
        <div className="flex">
          <a className="hover:underline hover:cursor-pointer inline pr-3">
            <span className="font-semibold">Women: </span>
          </a>
          <div className="flex flex-wrap">{displayCategory(womenCategory)}</div>
        </div>
        <p className="py-5">{navigationsText}</p>
      </div>
    </div>
  );
}

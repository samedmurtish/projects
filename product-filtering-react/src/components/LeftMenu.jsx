import React from "react";

export default function LeftMenu({ category }) {
  return (
    <>
      <div className="w-72 h-max flex flex-col justify-center items-center fixed ">
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
        <div className="w-full h-full flex items-center flex-col pt-5">
          <div className="bg-slate-600 h-16 w-full rounded-xl flex text-white font-semibold justify-center items-center flex-col border-slate-700 border-t-2 text-xl">
            FILTER
          </div>

          <div className="h-full w-[90%] bg-gray-200 border-x-4 border-b-4 border-gray-300 rounded-b-xl">
            <p>Color:</p>
            <div className="rounded-full w-8 h-8 bg-purple-500 border-4 border-[rgba(0,0,0,0.2)] shadow-inner"></div>
          </div>
        </div>
      </div>
    </>
  );
}

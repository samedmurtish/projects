import React from "react";

export default function Sorting({ sortProducts }) {
  return (
    <div className="flex flex-row items-center gap-3">
      <div className="bg-slate-600 h-14 w-32 rounded-xl flex text-white font-semibold justify-center items-center flex-col text-xl">
        SORT BY
      </div>
      <div
        className="border-gray-300 active:border-gray-400 active:bg-gray-300 hover:bg-gray-100 transition border-4 bg-white h-12 w-28 rounded-xl flex text-gray-800 font-semibold justify-center items-center flex-col text-lg cursor-pointer"
        onClick={() => sortProducts("default")}
      >
        default
      </div>
      <div
        className="border-gray-300 active:border-gray-400 active:bg-gray-300 hover:bg-gray-100 transition border-4 bg-white h-12 w-28 rounded-xl flex text-gray-800 font-semibold justify-center items-center flex-col text-lg cursor-pointer"
        onClick={() => sortProducts("price")}
      >
        price
      </div>
    </div>
  );
}

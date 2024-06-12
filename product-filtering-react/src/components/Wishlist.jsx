import React, { useState } from "react";

import { getList, updateWishlist } from "../data/wishlist";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(getList);

  const removeFromList = (itemId) => {
    const updatedList = wishlist.filter((item) => item.id !== itemId);
    setWishlist((value) => {
      const newValue = updatedList;
      updateWishlist(newValue);
      return newValue;
    });
  };

  const renderList = () => {
    return wishlist.map((value, valueIndex) => (
      <li
        key={valueIndex}
        className="w-full h-[80px] bg-slate-100 mb-1 p-3 flex items-center text-slate-600 font-bold rounded-xl justify-between flex-row"
      >
        <div className="flex justify-center items-center">
          <div className="pr-3 border-r-gray-200 border-r-2 h-full w-16 flex justify-center items-center">
            {valueIndex + 1}
          </div>
          <img src={value.thumbnail} alt={value.title} className="h-12 w-20" />
        </div>
        <div className="flex w-full h-full justify-between items-center">
          <p
            className="w-full text-nowrap font-normal"
            id="product-name-wishlist"
          >
            {value.title}
          </p>
          <div className="h-full w-[30%] bg-slate-700 text-white p-3 rounded-l-full cursor-pointer hover:bg-slate-600 transition flex justify-center items-center">
            <p className="px-1">Add To Cart</p>
          </div>
          <div
            className="h-full w-max bg-slate-500 text-white p-3 rounded-r-full cursor-pointer hover:bg-rose-500 transition flex items-center justify-center"
            onClick={() => removeFromList(value.id)}
          >
            <p className="px-1 pr-2">Remove</p>
          </div>
        </div>
      </li>
    ));
  };
  return (
    <div className="mx-auto my-0 w-full h-screen ">
      <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="bg-slate-600 flex justify-center items-center h-[75px] w-1/2 font-semibold text-white text-2xl shadow-xl z-50">
          WISHLIST
        </div>
        <div className="bg-slate-200 h-3/4 w-[48%] rounded-b-xl overflow-y-auto overflow-x-hidden">
          <ul className="flex flex-col px-1 pt-1 w-full h-full">
            {wishlist.length == 0 ? (
              <p className="mx-auto my-auto text-xl">
                Your wishlist is
                <span className="font-semibold pl-1">empty</span>.
              </p>
            ) : (
              renderList()
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

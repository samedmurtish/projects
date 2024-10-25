import React, { useState } from "react";
import { getList, updateWishlist } from "../data/wishlist";
import { addToCart } from "../data/cart";
import { useLocation } from "react-router-dom";
import SnackbarShow from "../MuiElements/SnackbarShow";
import RedirectIcons from "./NavigationBar/RedirectIcons";

export default function Wishlist() {
  const [showBar, setShowBar] = useState({
    clicked: false,
    message: "Product added to cart successfully!",
  });
  const [wishlist, setWishlist] = useState(getList);
  const [cartLength, setCartLength] = useState(
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).length
      : 0
  );
  const removeFromList = (itemId) => {
    const updatedList = wishlist.filter((item) => item.id !== itemId);
    setWishlist(updatedList);
    updateWishlist(updatedList);
  };

  const renderList = () => {
    return wishlist.map((value, valueIndex) => (
      <li
        key={valueIndex}
        className="w-full h-[80px] bg-slate-100 mb-1 p-3 flex items-center text-slate-600 font-bold rounded-xl justify-between flex-row shadow-md"
      >
        <div className="flex justify-center items-center">
          <div className="pr-3 border-r-gray-200 border-r-2 h-full w-16 flex justify-center items-center">
            {valueIndex + 1}
          </div>
          <img src={value.thumbnail} alt={value.title} className="h-12 w-20" />
        </div>
        <div className="flex w-full h-full justify-between items-center">
          <p className="w-full text-nowrap font-normal">{value.title}</p>
          <div
            className="h-full w-[30%] bg-slate-700 text-white p-3 rounded-l-full cursor-pointer hover:bg-slate-600 transition flex justify-center items-center"
            onClick={() => {
              setShowBar({
                clicked: true,
                message: "Product added to cart successfully!",
              });
              addToCart(value);
            }}
          >
            <p className="px-1">Add To Cart</p>
          </div>
          <div
            className="h-full w-max bg-slate-500 text-white p-3 rounded-r-full cursor-pointer hover:bg-rose-500 transition flex items-center justify-center"
            onClick={() => {
              setShowBar({
                clicked: true,
                message: "Product removed from wishlist successfully!",
              });
              removeFromList(value.id);
            }}
          >
            <p className="px-1 pr-2">Remove</p>
          </div>
        </div>
      </li>
    ));
  };

  return (
    <>
      <SnackbarShow get={showBar} set={setShowBar} />
      <div className="mx-auto my-0 w-[80%] md:w-[60%] h-screen ">
        <div className="flex flex-col justify-center items-center h-full w-full">
          <div className="w-full py-5">
            <RedirectIcons wishlist={false} home={true} cart={true} />
          </div>
          <div className="bg-slate-600 flex justify-center items-center h-[75px] w-full font-semibold text-white text-2xl shadow-xl z-50 rounded-md">
            WISHLIST
          </div>
          <div className="bg-slate-200 h-3/4 w-full rounded-b-xl overflow-y-auto shadow-xl overflow-x-hidden">
            <ul className="flex flex-col px-1 pt-1 w-full h-full">
              {wishlist.length === 0 ? (
                <p className="mx-auto my-auto text-xl">
                  List is <span className="font-semibold pl-1">empty</span>.
                </p>
              ) : (
                renderList()
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

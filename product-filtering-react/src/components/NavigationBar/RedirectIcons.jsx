import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline, IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function RedirectIcons({ home, wishlist, cart }) {
  const [wishlistLength, setWishlistLength] = useState(
    localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist")).length
      : 0
  );
  const [cartLength, setCartLength] = useState(
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).length
      : 0
  );

  useEffect(() => {
    setCartLength(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart")).length
        : 0
    );
    setWishlistLength(
      localStorage.getItem("wishlist")
        ? JSON.parse(localStorage.getItem("wishlist")).length
        : 0
    );
  });

  const renderRedirectIcons = () => {
    return (
      <div className="flex justify-between">
        {home && (
          <Link
            to={"/"}
            className="flex justify-center flex-col items-center"
            id="home-div-icon"
          >
            {/* Wishlist link with icon and length */}
            <IoHomeOutline
              className="cursor-pointer hover:text-slate-500 text-slate-400 text-4xl"
              id="home-icon"
            />
            <span className="text-gray-500 font-semibold px-5">Home</span>
          </Link>
        )}

        <div className="flex">
          {wishlist && (
            <Link
              to={"/wishlist"}
              className="flex justify-center flex-col items-center"
              id="wishlist-div-icon"
            >
              {/* Wishlist link with icon and length */}
              <FaRegHeart
                className="cursor-pointer hover:text-slate-500 text-slate-400 text-4xl"
                id="wishlist-icon"
              />
              <span className="text-gray-500 font-semibold px-5">
                Wishlist ({" "}
                <span className="text-slate-900 font-extrabold">
                  {wishlistLength}
                </span>{" "}
                )
              </span>
            </Link>
          )}
          {cart && (
            <Link
              to={"/cart"}
              className="flex justify-center flex-col items-center"
              id="cart-div-icon"
            >
              {/* Wishlist link with icon and length */}
              <IoCartOutline
                className="cursor-pointer hover:text-slate-500 text-slate-400 text-4xl"
                id="cart-icon"
              />
              <span className="text-gray-500 font-semibold px-5">
                Cart ({" "}
                <span className="text-slate-900 font-extrabold">
                  {cartLength}
                </span>{" "}
                )
              </span>
            </Link>
          )}
        </div>
      </div>
    );
  };

  return <div className="h-full w-full">{renderRedirectIcons()}</div>;
}

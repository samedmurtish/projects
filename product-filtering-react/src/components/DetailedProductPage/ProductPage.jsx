import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import ErrorPage from "../Error/ErrorPage";
import ImageShowcase from "./ImageShowcase";
import RenderStars from "../Products/RenderStars";
import { FaRegHeart } from "react-icons/fa"; // Import an icon from react-icons
import { IoCartOutline } from "react-icons/io5";
import { addToCart } from "../../data/cart";
import { FaHeart } from "react-icons/fa";
import SnackbarShow from "../../MuiElements/SnackbarShow";
import { addToWishlist } from "../../data/wishlist";

export default function ProductPage() {
  const location = useLocation();
  let product;
  location.state != null ? ({ product } = location.state) : null;

  console.log(product);

  const [showBar, setShowBar] = useState({
    clicked: false,
    message: "Product added to cart successfully!",
  });
  // Initialize wishlistLength state based on localStorage
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

  const renderRedirectIcons = () => {
    return (
      <div className="flex">
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
            <span className="text-slate-900 font-extrabold">{cartLength}</span>{" "}
            )
          </span>
        </Link>
      </div>
    );
  };

  const renderTags = () => {
    return product.tags.map((value, valueIndex) => (
      <div key={`${value}-${valueIndex}`}>
        <p className="rounded-full bg-slate-300 hover:bg-slate-500 w-max h-max px-3 py-1 hover:text-white text-slate-500 font-semibold text-xs flex justify-center items-center text-center transition cursor-default">
          <span className="text-slate-400 flex justify-center items-center text-center">
            #
          </span>
          {value}
        </p>
      </div>
    ));
  };

  return (
    <div>
      <SnackbarShow get={showBar} set={setShowBar} />
      {product == null ? (
        <ErrorPage />
      ) : (
        <>
          <div className="mx-auto my-0 w-11/12 h-screen flex justify-center py-10">
            <div className="flex flex-col h-full w-max ">
              <div className="self-end p-5">{renderRedirectIcons()}</div>
              <div className="bg-gray-100 h-max w-max rounded-b-xl overflow-y-auto shadow-xl overflow-x-hidden rounded-xl">
                <div className="flex flex-row h-full w-max">
                  <ImageShowcase product={product} />
                  <div className="w-max h-full p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex">{renderTags()}</div>
                      <div className="text-2xl font-semibold pb-0 w-max ">
                        <p className="max-w-[700px]"> {product.title}</p>
                      </div>
                      <div className="w-max">{product.brand}</div>
                      <div className="text-yellow-300 flex justify-start items-center gap-x-2 bg-gray-100 w-fit text-base py-1">
                        <div className="flex">
                          <RenderStars stars={product.rating} />
                        </div>
                      </div>
                      <p className="rounded-full bg-slate-500 hover:bg-slate-600 w-max h-max px-3 py-1 my-2 text-white font-semibold transition cursor-default">
                        <span className="text-slate-300 pr-1">$</span>
                        {product.price}
                      </p>
                    </div>
                    <div className="flex h-max w-max justify-between">
                      <div className="flex">
                        <button
                          className="h-max w-max bg-slate-600 hover:bg-slate-500 text-white p-3 rounded-lg cursor-pointer transition flex justify-center font-semibold mr-1"
                          id="add-to-cart"
                          onClick={() => {
                            setShowBar({
                              clicked: true,
                              message: "Product added to cart successfully!",
                            });
                            addToCart(product);
                            setCartLength(
                              JSON.parse(localStorage.getItem("cart")).length
                            );
                          }}
                        >
                          <p className="px-1">Buy Now</p>
                        </button>{" "}
                        <button
                          className="h-max w-max bg-slate-600 hover:bg-slate-500 text-white p-3 rounded-lg cursor-pointer transition flex justify-center mr-3 font-semibold"
                          id="add-to-cart"
                          onClick={() => {
                            setShowBar({
                              clicked: true,
                              message: "Product added to cart successfully!",
                            });
                            addToCart(product);
                            setCartLength(
                              JSON.parse(localStorage.getItem("cart")).length
                            );
                          }}
                        >
                          <p className="px-1">Add To Cart</p>
                        </button>{" "}
                      </div>
                      <button
                        className="h-max w-max bg-slate-500 text-white p-3 rounded-xl  cursor-pointer transition flex justify-center items-center hover:bg-slate-600 active:text-rose-400   hover:text-rose-500 text-2xl"
                        onClick={() => {
                          setShowBar({
                            clicked: true,
                            message: "Product added to wishlist successfully!",
                          });
                          addToWishlist(product);
                          setWishlistLength(
                            JSON.parse(localStorage.getItem("wishlist")).length
                          );
                        }}
                      >
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Outlet />
    </div>
  );
}

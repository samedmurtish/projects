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
import { FaCircleUser } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import RedirectIcons from "../NavigationBar/RedirectIcons";

export default function ProductPage() {
  const location = useLocation();
  let product;
  location.state != null ? ({ product } = location.state) : null;
  window.scrollTo(0, 0);
  //console.log(product);

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

  const renderTags = () => {
    return product.tags.map((value, valueIndex) => (
      <div key={`${value}-${valueIndex}`}>
        <p className="rounded-full bg-slate-300 hover:bg-slate-500 w-max h-max px-2 py-1 hover:text-white text-slate-500 font-semibold text-xs flex justify-center items-center text-center transition cursor-default">
          <span className="text-slate-400 flex justify-center items-center text-center font-extrabold">
            #
          </span>
          {value}
        </p>
      </div>
    ));
  };

  const renderReviews = () => {
    return product.reviews.map((value, valueIndex) => (
      <div
        key={valueIndex}
        className="h-full w-full bg-gray-200 flex flex-row py-3 justify-start border-b-slate-300 border-b-2"
      >
        <div className="text-3xl text-slate-600 p-3 pt-2 w-max h-full flex justify-start items-start">
          <FaCircleUser />
        </div>
        <div className="flex flex-col w-full pr-3">
          <div className="text-slate-700 font-semibold pb-3 w-full">
            <div className="flex justify-between flex-row w-full">
              <div>{value.reviewerName}</div>
              <div>{value.date}</div>
            </div>
            <span className="text-slate-400 flex  items-center">
              <RenderStars stars={value.rating} />
              <span className="text-slate-500 px-1">({value.rating})</span>
            </span>
          </div>
          <div className="text-slate-600">{value.comment}</div>
        </div>
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
          <div className="mx-auto my-0 w-11/12 h-full flex justify-center py-10 overflow-y-auto">
            <div className="flex flex-col h-full w-max overflow-y-auto">
              <div className="p-5">
                <RedirectIcons
                  wishlistLength={wishlistLength}
                  cartLength={cartLength}
                  home={true}
                  wishlist={true}
                  cart={true}
                />
              </div>
              <div className="h-full w-full rounded-b-xl overflow-y-auto shadow-xl overflow-x-hidden rounded-xl flex items-center justify-evenly">
                <div className="flex flex-row h-full w-full justify-evenly bg-gray-100">
                  <ImageShowcase product={product} />
                  <div className="w-full p-10 py-7 pt-3 flex flex-col justify-between">
                    <div>
                      <div className="flex py-2">{renderTags()}</div>
                      <div className="text-2xl font-semibold pb-0 w-max ">
                        <p className="max-w-[700px] text-slate-600">
                          {product.title}
                        </p>
                      </div>
                      <div className="w-max text-slate-400">
                        {product.brand}
                      </div>
                      <div className="text-yellow-300 flex justify-start items-center gap-x-2 bg-gray-100 w-fit text-base py-1">
                        <div className="flex">
                          <RenderStars stars={product.rating} />
                        </div>
                      </div>
                      <div className="flex">
                        {product.availabilityStatus == "In Stock" ? (
                          <p className="rounded-full rounded-r-none bg-green-400 hover:bg-green-500 w-max h-max px-3 py-1 my-2 text-white font-semibold transition cursor-default text-sm">
                            {product.availabilityStatus}
                          </p>
                        ) : (
                          <p className="rounded-full rounded-r-none bg-rose-400 hover:bg-rose-500 w-max h-max px-3 py-1 my-2 text-white font-semibold transition cursor-default text-sm">
                            {product.availabilityStatus}
                          </p>
                        )}
                        <p className="rounded-full rounded-l-none bg-slate-500  hover:bg-slate-600 w-max h-max px-3 py-1 my-2 text-white font-semibold transition cursor-default text-sm">
                          Items Left: {product.stock}
                        </p>{" "}
                      </div>
                      <p className="rounded-full bg-slate-500 hover:bg-slate-600 w-max h-max px-3 py-1 my-2 text-white font-semibold transition cursor-default">
                        <span className="text-slate-300 pr-1">$</span>
                        {product.price}
                      </p>
                    </div>
                    <div className="flex h-full w-max justify-center items-end">
                      <div className="flex">
                        <Link
                          to={"/cart"}
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
                        </Link>
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
              <div className="w-full h-full text-white font-semibold flex justify-center items-center flex-col py-5 pt-10 flex-wrap text-wrap rounded-b-xl">
                <div className="py-6 px-6 text-2xl bg-slate-600 w-full rounded-xl flex justify-center">
                  DESCRIPTION
                </div>
                <div className="w-[95%] h-full bg-gray-200 flex justify-center items-center rounded-b-xl">
                  <div className="h-full w-full  flex flex-row p-3 justify-start rounded-b-xl border-b-slate-300 border-b-2 text-wrap flex-wrap text-slate-500">
                    {product.description}
                  </div>
                </div>
              </div>
              <div className="w-full h-full text-white font-semibold flex justify-center items-center flex-col py-5">
                <div className="py-6 px-6 text-2xl bg-slate-600 w-full rounded-xl  flex justify-center">
                  REVIEWS
                </div>
                <div className="w-[95%] h-full rounded-b-xl">
                  {renderReviews()}
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

// Import necessary modules and icons from React and react-icons library
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { addToWishlist } from "../../data/wishlist";
import SkeletonProduct from "../../react-skeleton/SkeletonProduct";
import { addToCart } from "../../data/cart";
import SnackbarShow from "../../MuiElements/SnackbarShow";
import { Link, Outlet } from "react-router-dom";
import RenderStars from "./RenderStars";

// Define the Products component which takes products, sortBy, and category as props
export default function Products({
  products,
  sortBy,
  category,
  wishlistIncrease,
  cartIncrease,
  loading,
}) {
  useEffect(() => {
    if (loading)
      setShowBar({
        clicked: true,
        message: "Loading products..",
      });
  }, [loading]);

  const [showBar, setShowBar] = useState({
    clicked: false,
    message: "Product added to cart successfully!",
  });

  // State to store products sorted by price
  const [productsByPrice, setProductsByPrice] = useState({});

  // Function to render individual product
  const product = (value, valueIndex) => {
    return (
      <Link
        to={`/product/${value.id}`}
        state={{ product: value }}
        key={valueIndex}
      >
        <div className="h-fit w-64 bg-gray-100 flex justify-between items-center flex-col rounded-xl">
          <div className="w-full flex flex-col items-center">
            <div>
              <img
                className="w-full bg-white border-[5px] border-gray-200 shadow-inner border-b-0 rounded-t-2xl"
                src={value.thumbnail}
                alt={`${value.title} thumbnail`}
              />
            </div>
            <div
              className="pt-2 px-3 h-[40px] flex justify-center text-center items-center bg-gray-200 w-full"
              id="product-name"
            >
              {value.title}
            </div>
            <div className="py-2 px-3 h-full text-yellow-300 flex justify-center items-center gap-x-2 bg-gray-100 w-full border-x-[5px]">
              <div className="flex">
                <RenderStars stars={value.rating} />
              </div>
              <div>
                <span className="text-black">({value.rating})</span>
              </div>
            </div>
            <div className="pb-3 px-3 w-full bg-gray-200 flex justify-center items-center pt-2">
              ${value.price}
            </div>
          </div>
          <div className="w-full flex">
            <button
              className="self-end h-[60px] w-2/3 flex justify-center items-center bg-slate-600 hover:bg-slate-500 rounded-bl-2xl text-white font-semibold transition"
              id="add-to-cart"
              onClick={() => {
                setShowBar({
                  clicked: true,
                  message: "Product added to cart successfully!",
                });
                addToCart(value, cartIncrease);
              }}
            >
              Add To Cart
            </button>
            <button
              className="self-end h-[60px] w-1/3 flex justify-center items-center bg-slate-500 rounded-br-2xl active:text-rose-400 text-white  hover:text-rose-500 transition font-semibold text-2xl"
              id="add-to-wishlist"
              onClick={() => {
                setShowBar({
                  clicked: true,
                  message: "Product added to wishlist successfully!",
                });
                addToWishlist(value, wishlistIncrease);
              }}
            >
              <FaHeart />
            </button>
          </div>
        </div>
      </Link>
    );
  };

  // Function to sort products by the specified criteria
  const sort = (sortBy) => {
    if (sortBy !== "none") {
      if (sortBy === "ascending") {
        setProductsByPrice([...products].sort((a, b) => a.price - b.price));
      } else {
        setProductsByPrice([...products].sort((a, b) => b.price - a.price));
      }
    }
  };

  // Use useEffect to sort products whenever sortBy or category changes
  useEffect(() => {
    sort(sortBy);
  }, [sortBy, category]);

  const renderLoadingProducts = () => {
    if (!Array.isArray(products)) return null;
    return products.map((value, valueIndex) => (
      <div key={valueIndex}>
        <SkeletonProduct />
      </div>
    ));
  };

  // Function to render products based on sorting and filtering criteria
  const renderProducts = () => {
    if (!Array.isArray(products)) return null;
    if (sortBy !== "none" && !Array.isArray(productsByPrice)) return null;

    // If sorting by price
    if (sortBy !== "none") {
      return category !== "all"
        ? productsByPrice
            .filter((product) => product.category === category)
            .map((value, valueIndex) => product(value, valueIndex))
        : productsByPrice.map((value, valueIndex) =>
            product(value, valueIndex)
          );
    }

    // If not sorting by price
    return category !== "all"
      ? products
          .filter((product) => product.category === category)
          .map((value, valueIndex) => product(value, valueIndex))
      : products.map((value, valueIndex) => product(value, valueIndex));
  };

  // Render the products
  return (
    <>
      <SnackbarShow get={showBar} set={setShowBar} />
      {loading ? renderLoadingProducts() : renderProducts()}
    </>
  );
}

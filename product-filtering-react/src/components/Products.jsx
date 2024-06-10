import React, { useEffect, useState } from "react";
import { BiCategory } from "react-icons/bi";

import { FaRegStar, FaStar, FaStarHalfAlt, FaHeart } from "react-icons/fa";

export default function Products({ products, sortBy, category }) {
  const [productsByPrice, setProductsByPrice] = useState({});

  const product = (value, valueIndex) => {
    return (
      <div key={valueIndex}>
        <div className="h-fit w-64 bg-gray-100 flex justify-between items-center flex-col rounded-xl">
          <div className="w-full flex flex-col items-center">
            <div className="">
              <img
                className="w-full bg-white border-[5px] border-gray-200 shadow-inner border-b-0 rounded-t-2xl"
                src={value.thumbnail}
                alt=""
              />
            </div>
            <div
              className="pt-2 px-3 h-[40px] flex justify-center text-center items-center bg-gray-200 w-full"
              id="product-name"
            >
              {value.title}
            </div>
            <div className="py-2 px-3 h-full text-yellow-300 flex justify-center items-center gap-x-2 bg-gray-100 w-full border-x-[5px]">
              <div className="flex">{renderStars(value.rating)}</div>
              <div className="">
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
            >
              Add To Cart
            </button>
            <button
              className="self-end h-[60px] w-1/3 flex justify-center items-center bg-slate-500 rounded-br-2xl text-white hover:text-rose-500 transition font-semibold text-2xl "
              id="add-to-wishlist"
            >
              <FaHeart />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const sort = (sortBy) => {
    if (sortBy == "price")
      return setProductsByPrice(
        [...products].sort((a, b) => a.price - b.price)
      ); // Price Ascending
  };

  useEffect(() => {
    sort(sortBy, category);
  }, [sortBy]);

  const renderStars = (stars) => {
    let starList = [];

    const fixed = Math.floor(stars);

    for (let index = 0; index < fixed; index++) {
      starList.push(<FaStar key={`star-${index}`} />);
    }

    if (stars >= Math.floor(stars) + 0.5) {
      starList.push(<FaStarHalfAlt key={`half-star-${starList.length}`} />);
    }

    let length = starList.length;

    while (length < 5) {
      starList.push(<FaRegStar key={`empty-star-${length}`} />);
      length++;
    }

    return <>{starList}</>;
  };
  const renderProducts = () => {
    if (!Array.isArray(products)) return null;
    if (sortBy == "price" && !Array.isArray(productsByPrice)) return null;

    if (sortBy == "price") {
      if (category != "all")
        return productsByPrice
          .filter((product) => product.category == category)
          .map((value, valueIndex) => product(value, valueIndex));
      else
        return productsByPrice.map((value, valueIndex) =>
          product(value, valueIndex)
        );
    }
    if (category != "all")
      return products
        .filter((product) => product.category == category)
        .map((value, valueIndex) => product(value, valueIndex));
    return products.map((value, valueIndex) => product(value, valueIndex));
  };
  return <>{renderProducts()}</>;
}

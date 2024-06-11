// Import necessary modules and icons from React and react-icons library
import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt, FaHeart } from "react-icons/fa";

// Define the Products component which takes products, sortBy, and category as props
export default function Products({ products, sortBy, category }) {
  // State to store products sorted by price
  const [productsByPrice, setProductsByPrice] = useState({});

  console.log(sortBy);

  // Function to render individual product
  const product = (value, valueIndex) => {
    return (
      <div key={valueIndex}>
        <div className="h-fit w-64 bg-gray-100 flex justify-between items-center flex-col rounded-xl">
          <div className="w-full flex flex-col items-center">
            <div>
              <img
                className="w-full bg-white border-[5px] border-gray-200 shadow-inner border-b-0 rounded-t-2xl"
                src={value.thumbnail}
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

  // Function to sort products by the specified criteria
  const sort = (sortBy) => {
    if (sortBy != "none")
      return sortBy == "ascending"
        ? setProductsByPrice([...products].sort((a, b) => a.price - b.price))
        : setProductsByPrice([...products].sort((a, b) => b.price - a.price));
    // Sort by price in ascending order
  };

  // Use useEffect to sort products whenever sortBy or category changes
  useEffect(() => {
    sort(sortBy, category);
  }, [sortBy]);

  // Function to render star rating for a product
  const renderStars = (stars) => {
    let starList = [];

    const fixed = Math.floor(stars);

    // Render filled stars
    for (let index = 0; index < fixed; index++) {
      starList.push(<FaStar key={`star-${index}`} />);
    }

    // Render half star if applicable
    if (stars >= Math.floor(stars) + 0.5) {
      starList.push(<FaStarHalfAlt key={`half-star-${starList.length}`} />);
    }

    // Render empty stars to fill up to 5 stars
    let length = starList.length;
    while (length < 5) {
      starList.push(<FaRegStar key={`empty-star-${length}`} />);
      length++;
    }

    return <>{starList}</>;
  };

  // Function to render products based on sorting and filtering criteria
  const renderProducts = () => {
    if (!Array.isArray(products)) return null;
    if (sortBy != "none" && !Array.isArray(productsByPrice)) return null;

    // If sorting by price
    if (sortBy != "none") {
      return category != "all"
        ? productsByPrice
            .filter((product) => product.category == category)
            .map((value, valueIndex) => product(value, valueIndex))
        : productsByPrice.map((value, valueIndex) =>
            product(value, valueIndex)
          );
    }

    // If not sorting by price
    return category != "all"
      ? products
          .filter((product) => product.category == category)
          .map((value, valueIndex) => product(value, valueIndex))
      : products.map((value, valueIndex) => product(value, valueIndex));
  };

  // Render the products
  return <>{renderProducts()}</>;
}

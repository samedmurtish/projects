import React from "react";
import Data from "./api/Data";
import { FaRegStar, FaStar, FaStarHalfAlt, FaHeart } from "react-icons/fa";

export default function App() {
  const { products, loading, error } = Data();

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
    return products.map((value, valueIndex) => (
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
    ));
  };
  return (
    <>
      <div className="h-full mx-auto my-0 w-11/12 mt-10 select-none">
        {!loading ? (
          <div className="flex flex-row h-full w-full gap-5">
            <div className="w-72 h-max flex flex-col justify-center items-center fixed ">
              <div className="w-full h-full flex items-center flex-col">
                <div className="bg-slate-600 h-16 w-full rounded-xl flex text-white font-semibold justify-center items-center flex-col border-slate-700 border-t-2 text-xl">
                  CATEGORIES
                </div>
                <ul className="h-full w-[90%] bg-gray-200 border-x-4 border-b-4 border-gray-300 rounded-b-xl">
                  <li className="bg-gray-100 w-full h-10 flex items-center justify-start font-semibold pl-3 hover:bg-gray-50 cursor-pointer transition text-slate-700">
                    FOOD
                  </li>
                  <li className="bg-gray-100 w-full h-10 flex items-center justify-start font-semibold pl-3 mt-1 hover:bg-gray-50 cursor-pointer transition text-slate-700">
                    COSMETICS
                  </li>
                  <li className="bg-gray-100 w-full h-10 flex items-center justify-start font-semibold pl-3 mt-1 rounded-b-lg hover:bg-gray-50 cursor-pointer transition text-slate-700">
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
            <div className="pl-80">
              <div className="flex flex-row items-center gap-3">
                <div className="bg-slate-600 h-14 w-32 rounded-xl flex text-white font-semibold justify-center items-center flex-col text-xl">
                  SORT BY
                </div>
                <div className="border-gray-300 active:border-gray-400 active:bg-gray-300 hover:bg-gray-100 transition border-4 bg-white h-12 w-28 rounded-xl flex text-gray-800 font-semibold justify-center items-center flex-col text-lg cursor-pointer">
                  default
                </div>
                <div className="border-gray-300 active:border-gray-400 active:bg-gray-300 hover:bg-gray-100 transition border-4 bg-white h-12 w-28 rounded-xl flex text-gray-800 font-semibold justify-center items-center flex-col text-lg cursor-pointer">
                  price
                </div>
              </div>
              <div className="flex justify-between items-center overflow-auto flex-wrap gap-3 w-full pt-5">
                {renderProducts()}
              </div>
            </div>
          </div>
        ) : (
          <div class="wrapper">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <span>Loading Products...</span>
          </div>
        )}
      </div>
    </>
  );
}

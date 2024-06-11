import React, { useState } from "react";
import Data from "./api/Data";
import LeftMenu from "./components/LeftMenu";
import Products from "./components/Products";
import Loading from "./components/Loading";
import Sorting from "./components/Sorting";
import { FaRegHeart } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
export default function App() {
  const { products, loading } = Data();

  const [sortType, setSortType] = useState("none");

  const [category, setCategory] = useState("all");

  const handleSortProducts = (type) => {
    console.log("sorting by " + type + "..");
    setSortType(type);
  };

  const handleCategories = (category) => {
    /* console.log("category successfully set to " + category); */
    setCategory(category);
  };

  return (
    <>
      <div className="h-full mx-auto my-0 w-11/12 mt-10 mb-10 select-none">
        {!loading ? (
          <>
            <LeftMenu category={handleCategories} />
            <div className="flex flex-col h-full w-full gap-5">
              <div className="pl-80">
                <div className="flex justify-between items-center">
                  <Sorting sortProducts={handleSortProducts} />
                  <Link
                    to={"wishlist"}
                    className="flex justify-center flex-col items-center "
                  >
                    <FaRegHeart className="cursor-pointer hover:text-slate-500 text-slate-400 text-4xl" />
                    <span className="text-gray-500 font-semibold px-5">
                      Wishlist
                    </span>
                  </Link>
                </div>
                <div className="flex justify-between items-center overflow-auto flex-wrap gap-3 w-full pt-5">
                  <Products
                    products={products}
                    sortBy={sortType}
                    loaded={loading}
                    category={category}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
      <Outlet />
    </>
  );
}

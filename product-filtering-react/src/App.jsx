import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Data from "./api/Data";
import LeftMenu from "./components/LeftMenu";
import Products from "./components/Products";
import Loading from "./components/Loading";
import Sorting from "./components/Sorting";
import Wishlist from "./components/Wishlist";
import { FaRegHeart } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { CartProvider } from "./contexts/CartContext.jsx";

export default function App() {
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

  const { products, loading } = Data();

  const [sortType, setSortType] = useState("none");
  const [category, setCategory] = useState("all");

  const handleSortProducts = (type) => {
    setSortType(type);
  };

  const handleCategories = (category) => {
    setCategory(category);
  };

  const handleWishlistLength = () => {
    setWishlistLength((value) => {
      const newValue = value + 1;
      return newValue;
    });
  };

  const handleCartLength = () => {
    setCartLength((value) => {
      const newValue = value + 1;
      return newValue;
    });
  };

  return (
    <Router>
      <CartProvider handleCartLength={handleCartLength}>
        <div className="h-full mx-auto my-0 w-11/12 mt-10 mb-10 select-none">
          <LeftMenu category={handleCategories} />
          <div className="flex flex-col h-full w-full gap-5">
            <div className="pl-80">
              <div className="flex justify-between items-center">
                <Sorting sortProducts={handleSortProducts} />
                <div className="flex">
                  <Link
                    to="wishlist"
                    className="flex justify-center flex-col items-center"
                    id="wishlist-div-icon"
                  >
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
                    to="cart"
                    className="flex justify-center flex-col items-center"
                    id="cart-div-icon"
                  >
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
                </div>
              </div>
              <div className="flex justify-between items-center overflow-auto flex-wrap gap-3 w-full pt-5">
                <Products
                  products={products}
                  sortBy={sortType}
                  loaded={loading}
                  category={category}
                  wishlistIncrease={handleWishlistLength}
                  cartIncrease={handleCartLength}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </CartProvider>
    </Router>
  );
}

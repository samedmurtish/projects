import React, { useState } from "react";
import Data from "./api/Data"; // Import the data fetching function
import LeftMenu from "./components/LeftMenu"; // Import the LeftMenu component
import Products from "./components/Products"; // Import the Products component
import Loading from "./components/Loading"; // Import the Loading component
import Sorting from "./components/Sorting"; // Import the Sorting component
import { FaRegHeart } from "react-icons/fa"; // Import an icon from react-icons
import { Link, Outlet } from "react-router-dom"; // Import routing components
import { IoCartOutline } from "react-icons/io5";

export default function App() {
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

  // Fetch products and loading state from the Data hook
  const { products, loading } = Data();

  // State for sorting type
  const [sortType, setSortType] = useState("none");

  // State for selected category
  const [category, setCategory] = useState("all");

  // Function to handle sorting products
  const handleSortProducts = (type) => {
    // console.log("sorting by " + type + "..");
    setSortType(type);
  };

  // Function to handle category selection
  const handleCategories = (category) => {
    /* console.log("category successfully set to " + category); */
    setCategory(category);
  };

  // Function to handle wishlist length update
  const handleWishlistLength = () => {
    setWishlistLength((value) => {
      const newValue = value + 1;
      return newValue;
    });
  };
  // Function to handle cart length update
  const handleCartLength = () => {
    setCartLength((value) => {
      const newValue = value + 1;
      return newValue;
    });
  };

  return (
    <>
      <div className="h-full mx-auto my-0 w-11/12 mt-10 mb-10 select-none">
        <>
          {/* Render the left menu with category selection handler */}
          <LeftMenu category={handleCategories} />
          <div className="flex flex-col h-full w-full gap-5">
            <div className="pl-80">
              <div className="flex justify-between items-center">
                {/* Render the sorting component with sort handler */}
                <Sorting sortProducts={handleSortProducts} />
                <div className="flex">
                  <Link
                    to={"wishlist"}
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
                    to={"cart"}
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
                </div>
              </div>
              <div className="flex justify-between items-center overflow-auto flex-wrap gap-3 w-full pt-5">
                {/* Render products with sorting, category, and wishlist update handler */}
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
        </>
      </div>
      <Outlet /> {/* Render nested routes */}
    </>
  );
}

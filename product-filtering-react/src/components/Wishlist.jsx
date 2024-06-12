import React, { useState } from "react";
import { getList, updateWishlist } from "../data/wishlist";

// Define the Wishlist component
export default function Wishlist() {
  // Initialize wishlist state using getList to get the current wishlist from localStorage
  const [wishlist, setWishlist] = useState(getList);

  // Function to remove an item from the wishlist
  const removeFromList = (itemId) => {
    // Filter out the item with the matching itemId
    const updatedList = wishlist.filter((item) => item.id !== itemId);
    // Update the wishlist state and localStorage
    setWishlist(() => {
      const newValue = updatedList;
      updateWishlist(newValue);
      return newValue;
    });
  };

  // Function to render the wishlist items
  const renderList = () => {
    return wishlist.map((value, valueIndex) => (
      <li
        key={valueIndex} // Use valueIndex as the key
        className="w-full h-[80px] bg-slate-100 mb-1 p-3 flex items-center text-slate-600 font-bold rounded-xl justify-between flex-row shadow-md"
      >
        <div className="flex justify-center items-center">
          <div className="pr-3 border-r-gray-200 border-r-2 h-full w-16 flex justify-center items-center">
            {valueIndex + 1} {/* Display the item index */}
          </div>
          <img src={value.thumbnail} alt={value.title} className="h-12 w-20" />{" "}
          {/* Display the item thumbnail */}
        </div>
        <div className="flex w-full h-full justify-between items-center">
          <p className="w-full text-nowrap font-normal">{value.title}</p>{" "}
          {/* Display the item title */}
          <div className="h-full w-[30%] bg-slate-700 text-white p-3 rounded-l-full cursor-pointer hover:bg-slate-600 transition flex justify-center items-center">
            <p className="px-1">Add To Cart</p> {/* Add to Cart button */}
          </div>
          <div
            className="h-full w-max bg-slate-500 text-white p-3 rounded-r-full cursor-pointer hover:bg-rose-500 transition flex items-center justify-center"
            onClick={() => removeFromList(value.id)} // Handle click to remove item from wishlist
          >
            <p className="px-1 pr-2">Remove</p> {/* Remove button */}
          </div>
        </div>
      </li>
    ));
  };

  return (
    <div className="mx-auto my-0 w-full h-screen ">
      <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="bg-slate-600 flex justify-center items-center h-[75px] w-[49%] font-semibold text-white text-2xl shadow-xl z-50 rounded-md">
          WISHLIST
        </div>
        <div className="bg-slate-200 h-3/4 w-[48%] rounded-b-xl overflow-y-auto shadow-xl overflow-x-hidden">
          <ul className="flex flex-col px-1 pt-1 w-full h-full">
            {wishlist.length == 0 ? ( // Check if wishlist is empty
              <p className="mx-auto my-auto text-xl">
                List is
                <span className="font-semibold pl-1">empty</span>.
              </p>
            ) : (
              renderList() // Render wishlist items if not empty
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

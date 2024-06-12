import React, { useState } from "react";

// Define the Sorting component, which takes a prop called sortProducts
export default function Sorting({ sortProducts }) {
  // Initialize a state variable priceController with default value 0 and a function to update it
  const [priceController, setPriceController] = useState(0);

  // Array to map priceController values to text
  const priceText = ["none", "ascending", "descending"];

  // Function to handle updating the priceController state and calling the sortProducts function
  const handlePriceText = () => {
    // Update the state based on the previous value
    setPriceController((prev) => {
      // Calculate the new value (cycle through 0, 1, 2, then back to 0)
      const newValue = prev < 2 ? prev + 1 : 0;
      // Call sortProducts with the appropriate text based on the new value
      sortProducts(priceText[newValue]);
      // Return the new value to update the state
      return newValue;
    });
  };

  return (
    <div className="flex flex-row items-center gap-3">
      {/* Container for the "SORT BY" label */}
      <div className="bg-slate-600 h-14 w-32 rounded-xl flex text-white font-semibold justify-center items-center flex-col text-xl">
        SORT BY
      </div>
      {/* Button to cycle through price sorting options */}
      <div
        className="border-gray-300 active:border-gray-400 active:bg-gray-300 hover:bg-gray-100 transition border-4 bg-white h-12 w-max px-3 rounded-xl flex text-gray-800 font-semibold justify-center items-center flex-col text-lg cursor-pointer"
        onClick={() => handlePriceText()} // Handle click to change sorting option
      >
        Price: {priceText[priceController]}{" "}
        {/* Display current sorting option */}
      </div>
    </div>
  );
}

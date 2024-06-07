import React, { useEffect, useState } from "react";
import qrcode from "../../images/bar-code.png";
import { IoIosSearch } from "react-icons/io";
import {
  imageCategory,
  contentCategories,
  categories,
} from "../../data/data.js";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { FaStarHalfAlt, FaStar, FaRegStar } from "react-icons/fa";
// Main functional component
export default function Content() {
  // State to keep track of the current category index
  const [categoryIndex, setCategoryIndex] = useState(0);

  // useEffect hook to select the category on initial render
  useEffect(() => {
    selectCategory(categoryIndex, null);
  }, []);

  // Function to handle category selection
  const selectCategory = (index, nextPrev) => {
    if (index !== undefined) setCategoryIndex(index);

    if (nextPrev != null || nextPrev !== undefined) index = categoryIndex;

    // Remove border class from all category elements
    for (let i = 0; i < imageCategory.length; i++) {
      const categoryElement = document.getElementById("image-category-" + i);
      if (
        categoryElement &&
        categoryElement.classList.contains("border-b-black")
      ) {
        categoryElement.classList.remove("border-b-black");
        categoryElement.classList.add("hover:border-b-gray-300");
      }
    }

    // Adjust index based on next or previous action
    if (nextPrev != null) {
      if (nextPrev === "next") {
        if (index < imageCategory.length - 1) index = categoryIndex + 1;
        else if (index === imageCategory.length - 1) index = 0;
      } else if (nextPrev === "prev") {
        if (index > 0) index = categoryIndex - 1;
        else if (index === 0) index = imageCategory.length - 1;
      }
    }

    // Add border class to the selected category element
    const selectedCategoryElement = document.getElementById(
      "image-category-" + index
    );
    if (selectedCategoryElement) {
      selectedCategoryElement.classList.add("border-b-black");
      selectedCategoryElement.classList.remove("hover:border-b-gray-300");
    }

    // Update the category image banner
    const categoryImageBanner = document.getElementById(
      "category-image-banner"
    );
    if (categoryImageBanner) {
      categoryImageBanner.src = imageCategory[index].image;
    }

    // Update the state with the new category index
    return setCategoryIndex(index);
  };

  // Function to render image category elements
  const renderImageCategory = () => {
    return imageCategory.map((value, valueIndex) => (
      <div
        key={valueIndex}
        className="w-full h-full flex justify-center items-center solid border-x-[1px] border-gray-100 cursor-pointer border-b-black border-b-2 border-2 transition"
        id={"image-category-" + valueIndex}
        onClick={() => selectCategory(valueIndex)}
      >
        {value.name}
      </div>
    ));
  };

  // Function to render categories
  const renderCategories = () => {
    return categories.map((value, valueIndex) => (
      <div key={valueIndex}>
        <div className="p-3 pl-5 pt-5 pb-2">{value}</div>
        <ul className="pl-2 cursor-pointer">
          {valueIndex === 0
            ? renderCategoryContent(valueIndex, true)
            : renderCategoryContent(valueIndex, false)}
        </ul>
      </div>
    ));
  };

  // Function to render content of each category
  const renderCategoryContent = (index, image) => {
    return contentCategories[index].map((value, valueIndex) => (
      <li
        key={valueIndex}
        className="hover:border-l-red-500 solid border-l-[3px] hover:bg-gray-100 flex items-center p-1 hover:border-t-[1px] hover:border-t-gray-200 hover:border-b-[1px] hover:border-b-gray-200 border-t-[1px] border-b-[1px] border-white"
      >
        <div className="flex items-center justify-start pl-1 truncate">
          {image && (
            <div className="left-bar-small-image mr-2">
              <img
                src={value.image}
                className="left-bar-small-image"
                alt={value.name}
              />
            </div>
          )}
          <div className="text-nowrap overflow-hidden text-ellipsis pb-[0.5px] flex items-center justify-center">
            {index === 2 && <IoIosSearch />}
            {index === 2 ? (
              <div className="pl-3 truncate">{image ? value.name : value}</div>
            ) : (
              <div className="pl-0 truncate pr-2">
                {image ? value.name : value}
              </div>
            )}
          </div>
        </div>
      </li>
    ));
  };

  return (
    <div className=" bg-gray-100 text-xs text-gray-500 text-pretty flex border-1 border-gray-100 select-none ">
      <div className="flex h-full pt-32 w-11/12 mx-auto my-0 flex-col">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="flex flex-col gap-4 shadow-xl mr-5">
              <div className="h-full flex w-52 bg-white flex-col pb-5">
                {renderCategories()}
              </div>
            </div>

            <div className="h-16 flex items-center w-52 justify-start my-10">
              <div>
                <img src={qrcode} />
              </div>
              <div className="pl-3">
                <p className="text-gray-900 pb-1">
                  Enjoy Convenient Order Tracking
                </p>
                <p className="text-gray-400">Scan to download app</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-[90%]">
            <div className="flex flex-row">
              <div className="w-full h-max mb-5">
                <div className="h-[45%] w-full bg-white border-b-[1px] solid border-b-gray-200 flex items-center justify-center">
                  <div className="w-full h-full flex items-center cursor-pointer relative">
                    <div
                      className="bg-white absolute rounded-full w-10 h-10 text-3xl flex justify-center items-center hover:bg-gray-700 hover:text-white transition cursor-pointer opacity-100 right-5"
                      onClick={() => selectCategory(...[, "next"])}
                    >
                      <GrFormNext />
                    </div>
                    <div
                      className="bg-white absolute rounded-full w-10 h-10 text-3xl flex justify-center items-center hover:bg-gray-700 hover:text-white transition cursor-pointer left-5"
                      onClick={() => selectCategory(...[, "prev"])}
                    >
                      <GrFormPrevious />
                    </div>
                    <img
                      id="category-image-banner"
                      className="w-[1200px] h-[300px]"
                    />
                  </div>
                </div>
                <div className="h-16 w-full bg-white flex justify-center items-center">
                  {renderImageCategory()}
                </div>
              </div>
              <div className="w-96 bg-white ml-5 h-[95%] flex items-center flex-col p-2 justify-center ">
                <div className="right-bar-image self-start w-full h-full"></div>
                <div className=" pb-3">Your Delivery Pincode</div>
                <div className="bg-gray-300 w-10 h-[2px] mb-3"></div>
                <div className="pb-3 flex items-center justify-center text-center">
                  Enter your pincode to check availability and faster delivery
                  options
                </div>
                <input
                  type="text"
                  placeholder="Enter pincode"
                  className="w-[92%] solid border-gray-200 border-[1px] p-3 bg-gray-50"
                />
                <div className="flex pt-3 flex-row items-center justify-between w-[92%]">
                  <button className="text-white bg-gray-800 hover:bg-gray-700 transition h-9 w-2/3 px-6 flex justify-center items-center text-center mr-3 rounded-md">
                    SUBMIT
                  </button>
                  <button className=" bg-gray-100 text-gray-400 hover:text-gray-500 transition h-9 w-16 px-6 flex justify-center items-center text-center rounded-md">
                    NEXT
                  </button>
                </div>
              </div>
            </div>
            <div className="h-full">
              <p className="pb-3 text-xl">TRENDING PRODUCTS</p>
              <div className="bg-white w-full h-full flex flex-row justify-center gap-x-3">
                <div className="h-full w-64 bg-white flex flex-col items-start justify-start p-5">
                  <img
                    src="https://n1.sdlcdn.com/imgs/i/n/r/bhawna-collection-Loard-Shiv-Trishul-SDL890408077-1-86933.jpeg"
                    alt=""
                    className="w-max h-2/3 self-center"
                  />
                  <div className="w-full h-12 overflow-hidden truncate text-ellipsis">
                    <p className="text-nowrap text-base h-full truncate text-ellipsis w-[100%]">
                      Bhawna Collection Loard Shiv Trishul Damru Locket With
                      Puchmukhi Rudraksha Mala Gold-plated Brass, Wood For Men &
                      Women
                    </p>
                  </div>
                  <div className="flex flex-row text-yellow-300 ">
                    <FaStar /> <FaStar /> <FaStar /> <FaStarHalfAlt />{" "}
                    <FaRegStar />
                  </div>
                </div>
                <div className="h-full w-full bg-purple-300"></div>
                <div className="h-full w-full bg-purple-200"></div>
                <div className="h-full w-full bg-purple-300"></div>
                <div className="h-full w-full bg-purple-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

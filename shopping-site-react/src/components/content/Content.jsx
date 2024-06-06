import React, { useEffect, useState } from "react";
import qrcode from "../../images/bar-code.png";
import { IoIosSearch } from "react-icons/io";
import {
  imageCategory,
  contentCategories,
  categories,
} from "../../data/data.js";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export default function Content() {
  const [categoryIndex, setCategoryIndex] = useState(0);

  useEffect(() => {
    selectCategory(categoryIndex, null);
  }, []);

  const selectCategory = (index, nextPrev) => {
    if (index != undefined) setCategoryIndex(index);

    if (nextPrev != null || nextPrev != undefined) index = categoryIndex;

    for (let index = 0; index < imageCategory.length; index++) {
      const categoryElement = document.getElementById(
        "image-category-" + index
      );
      if (
        categoryElement &&
        categoryElement.classList.contains("border-b-black")
      ) {
        categoryElement.classList.remove("border-b-black");
      }
    }

    if (nextPrev != null) {
      if (nextPrev == "next") {
        if (index < imageCategory.length - 1) index = categoryIndex + 1;
        else if (index === imageCategory.length - 1) index = 0;
      } else if (nextPrev == "prev") {
        if (index > 0) index = categoryIndex - 1;
        else if (index === 0) index = imageCategory.length - 1;
      }
    }
    const selectedCategoryElement = document.getElementById(
      "image-category-" + index
    );
    if (selectedCategoryElement) {
      selectedCategoryElement.classList.add("border-b-black");
    }

    const categoryImageBanner = document.getElementById(
      "category-image-banner"
    );
    if (categoryImageBanner) {
      categoryImageBanner.src = imageCategory[index].image;
    }
    return setCategoryIndex(index);
  };

  const renderImageCategory = () => {
    return imageCategory.map((value, valueIndex) => (
      <div
        key={valueIndex}
        className="w-full h-full flex justify-center items-center solid border-x-[1px] border-gray-100 cursor-pointer border-b-black border-b-2"
        id={"image-category-" + valueIndex}
        onClick={() => selectCategory(valueIndex)}
      >
        {value.name}
      </div>
    ));
  };

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
    <div className=" bg-gray-100 text-xs text-gray-500 text-pretty flex border-1 border-gray-100 select-none">
      <div className="flex h-full pt-32 w-11/12 mx-auto my-0 flex-col">
        <div className="flex flex-row">
          <div className="flex flex-col gap-4 shadow-xl">
            <div className="h-full flex w-52 bg-white flex-col pb-5">
              {renderCategories()}
            </div>
          </div>
          <div className="w-full h-full pl-5">
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
                <img id="category-image-banner" className="w-full h-full" />
              </div>
            </div>
            <div className="h-16 w-full bg-white flex justify-center items-center">
              {renderImageCategory()}
            </div>
          </div>
          <div className="w-96 bg-white ml-5 h-[54%] flex justify-center items-center">
            <div className="right-bar-image w-full h-full" />
          </div>
        </div>

        <div className="h-16 flex items-center w-52 justify-start my-10">
          <div>
            <img src={qrcode} />
          </div>
          <div className="pl-3">
            <p className="text-gray-900 pb-1">Enjoy Convenien Order Tracking</p>
            <p className="text-gray-400">Scan to download app</p>
          </div>
        </div>
      </div>
    </div>
  );
}

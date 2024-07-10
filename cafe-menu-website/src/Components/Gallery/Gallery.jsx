import React from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";
import { galleryData, sortCategories, sortedCategories } from "./galleryData";
import MoveToTop from "../MoveToTop/MoveToTop";

export default function Gallery() {
  const renderPhotos = (category) => {
    return galleryData.map((value) => (
      <>
        {value.category === category && (
          <img
            src={value.image}
            className="min-w-[250px] md:min-w-[400px] min-h-[250px] md:min-h-[400px]"
          />
        )}
      </>
    ));
  };

  const renderCategories = () => {
    sortCategories();

    return sortedCategories.map((value, valueIndex) => (
      <div key={valueIndex} className="flex flex-col w-full mb-24">
        <p className="text-5xl text-[#EFAB3A] font-thin" id="font">
          {value}
        </p>
        <div className="flex w-full h-[250px] md:h-[400px] overflow-x-auto rounded-3xl overflow-hidden justify-start items-center gap-5">
          {renderPhotos(value)}
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="lg:inline hidden">
        <NavigationBar />
      </div>
      <div className="lg:hidden inline">
        <NavigationBarMobile />
      </div>
      <MoveToTop />
      <div className="pt-32 w-10/12 mx-auto my-0" id="start">
        {renderCategories()}
      </div>
    </div>
  );
}

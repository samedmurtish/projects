import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { menu } from "../Menu/menuData";
import { ColorExtractor } from "react-color-extractor";
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";
import MoveToTop from "../MoveToTop/MoveToTop";
import { IoArrowBackCircle } from "react-icons/io5";
import hexToRgba from "hex-to-rgba";

export default function MenuDetailed() {
  const { category } = useParams();
  const [mainItemColor, setMainItemColor] = useState([]);

  const sortColors = (colors) => {
    setMainItemColor((prevColors) => {
      if (!prevColors.some((colorObj) => colorObj === colors[2])) {
        return [...prevColors, colors[2]];
      }
      return prevColors;
    });
  };
  const renderItems = () => {
    return menu.map((categoryItem) => (
      <div key={categoryItem.id}>
        {category == categoryItem.category && (
          <>
            <div
              className="text-5xl w-full flex justify-between items-center py-16 "
              id="textFont"
            >
              <div className="flex gap-5 ">
                <Link
                  to={"/menu"}
                  className="flex justify-center items-center bg-[#ce912f] rounded-full h-max self-center"
                >
                  <div className="bg-white w-5 h-5 absolute"></div>
                  <div className="text-[#EFAB3A] z-[9999]">
                    <IoArrowBackCircle />
                  </div>
                </Link>
                <div>{categoryItem.title}</div>
              </div>
            </div>
            <div
              key={categoryItem.id}
              className="w-full h-full flex flex-wrap justify-center gap-5 items-end"
              style={{
                display: category == categoryItem.category ? "hidden" : "",
              }}
            >
              {categoryItem.items.map((item) => (
                <div
                  className="flex flex-col justify-start md:justify-start items-start rounded-2xl w-[150px] h-[230px] md:w-[300px] md:h-[400px]"
                  key={item.id}
                  style={{
                    backgroundColor:
                      hexToRgba(`${mainItemColor[item.id]}`, "0.7") ||
                      "transparent",
                  }}
                >
                  <ColorExtractor
                    src={item.image}
                    getColors={(colors) => {
                      sortColors(colors);
                    }}
                  />
                  <div className="w-full h-[150px] md:h-max overflow-hidden flex items-center justify-center">
                    <img
                      src={item.image}
                      className="object-cover rounded-2xl w-full h-full border-b-[6px]"
                      style={{ borderBottomColor: `${mainItemColor[item.id]}` }}
                    />
                  </div>
                  <div className="w-full md:w-[280px] flex justify-center items-end">
                    <span
                      className="py-3 flex justify-center items-start flex-col text-lg text-ellipsis overflow-hidden text-nowrap"
                      id="textFont"
                    >
                      <div className="md:text-2xl">{item.name}</div>
                      <div className="self-center">{item.price} den</div>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
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
      <div
        className="h-full text-white flex flex-col w-5/6 md:w-5/6 mx-auto my-0"
        id="start"
      >
        <div className="md:pt-20 pt-5 flex flex-col justify-center items-center md:items-start pb-20">
          {renderItems()}
        </div>
      </div>
    </div>
  );
}

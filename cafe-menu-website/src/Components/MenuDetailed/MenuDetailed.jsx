import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { menu } from "../Menu/menuData";
import { ColorExtractor } from "react-color-extractor";
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";

export default function MenuDetailed() {
  const { category } = useParams();
  const [mainItemColor, setMainItemColor] = useState([]);

  useEffect(() => {
    console.log(mainItemColor);
  }, [mainItemColor]);

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
            <span
              className="text-5xl w-full flex justify-center items-center py-16"
              id="textFont"
            >
              {categoryItem.title}
            </span>
            <div
              key={categoryItem.id}
              className="w-full h-full flex flex-wrap justify-center gap-5 items-end"
              style={{
                display: category == categoryItem.category ? "hidden" : "",
              }}
            >
              {categoryItem.items.map((item) => (
                <div
                  className="flex flex-col justify-center items-center rounded-3xl"
                  key={item.id}
                  style={{
                    backgroundColor: mainItemColor[item.id] || "transparent",
                  }}
                >
                  <ColorExtractor
                    src={item.image}
                    getColors={(colors) => {
                      sortColors(colors);
                    }}
                  />
                  <div
                    key={item.id}
                    className="w-[150px] h-max md:w-[300px] md:h-max overflow-hidde flex items-start justify-start"
                  >
                    <img src={item.image} className="rounded-3xl" />
                  </div>
                  <div className="w-[130px] md:w-[280px] flex justify-center items-end">
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
      <div className="h-full text-white flex flex-col w-3/4 mx-auto my-0">
        <div className="md:pt-20 pt-5 flex flex-col justify-center items-center">
          {renderItems()}
        </div>
      </div>
    </div>
  );
}

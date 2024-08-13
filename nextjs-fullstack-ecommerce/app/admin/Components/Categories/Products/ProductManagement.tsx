import React, { useEffect, useRef, useState } from "react";
import { AiOutlineProduct, AiFillProduct } from "react-icons/ai";
import { IoIosList, IoIosListBox } from "react-icons/io";
import { IoMdList, IoMdListBox } from "react-icons/io";
import Categories from "./Categories";
import SubCategories from "./SubCategories";
import Products from "./Products";
import { supabase } from "@/app/lib/supabase";

export default function ProductManagement({ clicked, setClicked }: any) {
  const [isMouseOver, setIsMouseOver] = useState([false, false, false]);
  const [isMouseClicked, setIsMouseClicked] = useState([false, false, false]);
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    if (clicked == "Product Management") {
      setClicked("");
      setPageName("");
      setIsMouseClicked([false, false, false]);
      setIsMouseOver([false, false, false]);
    }
  });

  const buttons = [
    {
      name: "Products",
      color: {
        baseColor: "rgb(59 130 246)",
        hoverColor: "rgb(37 99 235)",
        clickColor: "rgb(29 78 216)",
        borderClickColor: "rgb(30 64 175)",
      },
      defaultIcon: <AiOutlineProduct />,
      hoverIcon: <AiFillProduct />,
    },
    {
      name: "Categories",
      color: {
        baseColor: "rgb(34 197 94)",
        hoverColor: "rgb(22 163 74)",
        clickColor: "rgb(21 128 61)",
        borderClickColor: "rgb(22 101 52)",
      },
      defaultIcon: <IoIosList />,
      hoverIcon: <IoIosListBox />,
    },
    {
      name: "Sub Categories",
      color: {
        baseColor: "rgb(168 85 247)",
        hoverColor: "rgb(147 51 234)",
        clickColor: "rgb(126 34 206)",
        borderClickColor: "rgb(107 33 168)",
      },
      defaultIcon: <IoMdList />,
      hoverIcon: <IoMdListBox />,
    },
  ];

  const handleIsMouseOver = (index: any, event: any) => {
    setIsMouseOver((prevIsMouseOver) => {
      const updatedState = [...prevIsMouseOver];
      updatedState[index] = event;
      return updatedState;
    });
  };

  const handleMouseClick = (index: any, event: any) => {
    setIsMouseClicked((prevIsMouseOver) => {
      const updatedState = [...prevIsMouseOver];
      updatedState[index] = event;
      return updatedState;
    });

    setPageName(buttons[index].name);
  };

  const handleRenderButtons = () => {
    return buttons.map((button, index) => (
      <button
        key={index}
        className="w-52 h-52 p-5 rounded-lg transition flex justify-evenly items-center flex-col text-3xl"
        style={{
          backgroundColor: isMouseOver[index]
            ? isMouseClicked[index]
              ? button.color.clickColor
              : button.color.hoverColor
            : isMouseClicked[index]
            ? button.color.clickColor
            : button.color.baseColor,

          borderColor: !isMouseOver[index]
            ? isMouseClicked[index]
              ? button.color.borderClickColor
              : button.color.hoverColor
            : isMouseClicked[index]
            ? button.color.borderClickColor
            : button.color.clickColor,
          borderWidth: isMouseClicked[index] ? "10px" : "15px",
        }}
        onMouseOver={() => handleIsMouseOver(index, true)}
        onMouseLeave={() => handleIsMouseOver(index, false)}
        onMouseDown={() => handleMouseClick(index, true)}
        onMouseUp={() => handleMouseClick(index, false)}
      >
        <div className="text-7xl">
          {isMouseOver[index] ? button.hoverIcon : button.defaultIcon}
        </div>
        <div className="text-2xl">{button.name}</div>
      </button>
    ));
  };

  return (
    <div className="h-full flex justify-center items-center">
      {pageName == "Products" ? (
        <Products />
      ) : pageName == "Categories" ? (
        <Categories setPageName={setPageName} />
      ) : pageName == "Sub Categories" ? (
        <SubCategories setPage={setPageName} pageName={pageName} />
      ) : (
        pageName == "" && (
          <div className="flex gap-5">{handleRenderButtons()}</div>
        )
      )}
    </div>
  );
}

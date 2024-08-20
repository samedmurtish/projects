"use client";
import { AiOutlineProduct, AiFillProduct } from "react-icons/ai";
import { IoIosList, IoIosListBox } from "react-icons/io";
import { IoMdList, IoMdListBox } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { FaAlignLeft, FaAlignJustify } from "react-icons/fa6";
import { MdOutlineManageAccounts, MdManageAccounts } from "react-icons/md";
import { RiShoppingCart2Line, RiShoppingCart2Fill } from "react-icons/ri";
import { MdOutlineSpaceDashboard, MdSpaceDashboard } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function SideBar({
  setCategory,
  setClicked,
  setIsSideBarOpened,
  setDirectMenu,
}: any) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const [categories, setCategories] = useState([
    {
      id: 0,
      name: "Dashboard",
      onMenu: true,
      node: {
        closed: <MdOutlineSpaceDashboard />,
        opened: <MdSpaceDashboard />,
      },
    },
    {
      id: 1,
      name: "User Management",
      onMenu: false,
      node: {
        closed: <MdOutlineManageAccounts />,
        opened: <MdManageAccounts />,
      },
    },
    {
      id: 2,
      name: "Product Management",
      onMenu: false,
      node: {
        closed: <RiShoppingCart2Line />,
        opened: <RiShoppingCart2Fill />,
      },
      subMenu: {
        menus: [
          { name: "Products", node: <AiOutlineProduct /> },
          { name: "Categories", node: <IoIosList /> },
          { name: "Sub Categories", node: <IoMdList /> },
        ],
      },
    },
  ]);
  const handleToggle = (id: number, category: string, subCategory: any) => {
    setDirectMenu(subCategory);
    setCategory(category);
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id
          ? { ...category, onMenu: true }
          : { ...category, onMenu: false }
      )
    );
  };

  useEffect(() => {
    setIsSideBarOpened(isOpen);
  }, [isOpen]);

  return (
    <div className={``}>
      {isOpen ? (
        <div className="text-xl text-white h-screen fixed left-0 bg-gradient-to-b from-indigo-500 to-transparent p-5 gap-10 flex-col flex z-50">
          <div className="flex items-center justify-between">
            <h1 className="text-white">Admin Panel</h1>
            <div
              className="p-2 flex justify-center items-center hover:bg-[rgba(255,255,255,0.2)] active:bg-[rgba(255,255,255,0.3	)] rounded-full transition cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <button className="text-white">
                <FaAlignJustify />
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`${
                    category.onMenu &&
                    category.subMenu &&
                    "bg-[rgba(255,255,255,0.1)] rounded-md"
                  }`}
                >
                  <div
                    className={`flex text-base items-center gap-2 cursor-pointer hover:bg-[rgba(255,255,255,0.2)] active:bg-[rgba(255,255,255,0.3)] transition p-2 rounded-md ${
                      category.onMenu &&
                      "bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)]"
                    }`}
                    onClick={() => {
                      handleToggle(category.id, category.name, "");
                      setClicked(category.name);
                    }}
                  >
                    <span className="text-2xl text-white">
                      {category.onMenu
                        ? category.node.opened
                        : category.node.closed}
                    </span>
                    {category.name}
                  </div>

                  {category.onMenu && category.subMenu && (
                    <div className="flex h-full py-2 pt-0">
                      <div
                        className={`pl-4 
													h-[${category.subMenu.menus.length * 32}px] flex justify-center items-center`}
                      >
                        <div className="w-1 h-full bg-[rgba(255,255,255,0.2)]"></div>
                      </div>
                      <div>
                        {category.subMenu.menus.map(
                          (subCategory: any, index: number) => (
                            <div
                              key={subCategory.name + index}
                              className="flex text-base items-center gap-2 cursor-pointer hover:bg-[rgba(255,255,255,0.2)] active:bg-[rgba(255,255,255,0.3)] transition p-1 px-3 rounded-md w-full pl-5 rounded-l-none"
                              onClick={() =>
                                handleToggle(
                                  category.id,
                                  category.name,
                                  subCategory.name
                                )
                              }
                            >
                              <span className="text-white">
                                {subCategory.node}
                              </span>
                              {subCategory.name}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div
              className="text-3xl flex items-center gap-2 cursor-pointer hover:bg-[rgba(255,255,255,0.2)] active:bg-[rgba(255,255,255,0.3)] transition p-2 rounded-md"
              onClick={() => router.push("/")}
            >
              <IoMdArrowRoundBack />
              <span className="text-base text-white">Back To Home</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white h-screen fixed left-0 bg-gradient-to-b from-indigo-500 to-transparent z-50">
          <div className="flex p-1 pt-3 pb-0 justify-center items-center text-xl flex-col gap-5 h-full z-50">
            <div className="flex flex-col gap-2">
              <button
                className="text-2xl hover:bg-[rgba(255,255,255,0.2)] active:bg-[rgba(255,255,255,0.3)] rounded-full transition p-3 pt-3"
                id="sidebar-category"
                onClick={() => setIsOpen(!isOpen)}
              >
                <FaAlignLeft />
                <div
                  className="absolute top-4 left-[-500px] bg-white text-black p-2 text-base rounded-lg border-2 shadow-lg opacity-0 transition z-[-1] text-nowrap"
                  id="sidebar-category-info"
                >
                  Toggle Side Bar
                </div>
              </button>
              <div className="w-full border-2  border-[rgba(255,255,255,0.2)]"></div>
            </div>

            <div className="flex flex-col justify-between h-full pb-5 z-50">
              <div className="flex flex-col">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center p-3 cursor-pointer hover:bg-[rgba(255,255,255,0.2)] active:bg-[rgba(255,255,255,0.3)] rounded-full transition z-50"
                    id="sidebar-category"
                    onClick={() => {
                      handleToggle(category.id, category.name, "");
                      setClicked(category.name);
                    }}
                  >
                    <span className="text-3xl text-white">
                      {category.onMenu
                        ? category.node.opened
                        : category.node.closed}
                    </span>
                    <div
                      className="absolute left-[-500px] bg-white text-black p-2 text-base rounded-lg border-2 shadow-lg opacity-0 transition z-[-1] text-nowrap"
                      id="sidebar-category-info"
                    >
                      {category.name}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="flex items-center p-3 cursor-pointer hover:bg-[rgba(255,255,255,0.2)] active:bg-[rgba(255,255,255,0.3)] rounded-full transition text-3xl"
                id="sidebar-category"
                onClick={() => router.push("/")}
              >
                <IoMdArrowRoundBack />
                <div
                  className="absolute left-[-500px] bg-white text-black p-2 text-base rounded-lg border-2 shadow-lg opacity-0 transition z-[-1] text-nowrap"
                  id="sidebar-category-info"
                >
                  Back To Home
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

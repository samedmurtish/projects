"use client";

import React, { useState } from "react";
import { FaAlignLeft, FaAlignJustify } from "react-icons/fa6";
import { MdOutlineManageAccounts, MdManageAccounts } from "react-icons/md";
import { RiShoppingCart2Line, RiShoppingCart2Fill } from "react-icons/ri";
import { MdOutlineSpaceDashboard, MdSpaceDashboard } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function SideBar({ setCategory }: any) {
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
    },
  ]);
  const handleToggle = (id: number, category: string) => {
    setCategory(category);
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id
          ? { ...category, onMenu: true }
          : { ...category, onMenu: false }
      )
    );
  };

  return (
    <div>
      {isOpen ? (
        <div className="w-64 text-xl text-black h-screen fixed left-0 bg-white 50 p-5 gap-10 flex-col flex z[999	]">
          <div className="flex items-center justify-between">
            <h1>Admin Panel</h1>
            <div className="p-2 flex justify-center items-center hover:bg-zinc-200 active:bg-zinc-300 rounded-full transition">
              <button onClick={() => setIsOpen(!isOpen)}>
                <FaAlignJustify />
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex text-base items-center gap-2 cursor-pointer hover:bg-zinc-200 active:bg-zinc-300 transition p-2 rounded-md
							"
                  onClick={() => handleToggle(category.id, category.name)}
                >
                  <span className="text-2xl ">
                    {category.onMenu
                      ? category.node.opened
                      : category.node.closed}
                  </span>
                  {category.name}
                </div>
              ))}
            </div>
            <div
              className="text-3xl flex items-center gap-2 cursor-pointer hover:bg-zinc-200 active:bg-zinc-300 transition p-2 rounded-md"
              onClick={() => router.push("/")}
            >
              <IoMdArrowRoundBack />
              <span className="text-base">Back To Home</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-20 text-black h-screen fixed left-0 bg-white z-[999]">
          <div className="flex p-5 pt-3 pb-0 justify-center items-center text-xl flex-col gap-5 h-full z-[999]">
            <div className="flex flex-col gap-2">
              <button
                className="text-2xl hover:bg-zinc-100 active:bg-zinc-200 rounded-full transition p-3 pt-3"
                id="sidebar-category"
                onClick={() => setIsOpen(!isOpen)}
              >
                <FaAlignLeft />
                <div
                  className="absolute top-4 left-[-500px] bg-white p-2 text-base rounded-lg border-2 shadow-lg opacity-0 transition z-[-1] text-nowrap"
                  id="sidebar-category-info"
                >
                  Toggle Side Bar
                </div>
              </button>
              <div className="w-full border-2  border-zinc-100"></div>
            </div>

            <div className="flex flex-col justify-between h-full pb-5 z-[999]">
              <div className="flex flex-col">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center p-3 cursor-pointer hover:bg-zinc-100 active:bg-zinc-200 rounded-full transition z-[999]"
                    id="sidebar-category"
                    onClick={() => handleToggle(category.id, category.name)}
                  >
                    <span className="text-3xl">
                      {category.onMenu
                        ? category.node.opened
                        : category.node.closed}
                    </span>
                    <div
                      className="absolute left-[-500px] bg-white p-2 text-base rounded-lg border-2 shadow-lg opacity-0 transition z-[-1] text-nowrap"
                      id="sidebar-category-info"
                    >
                      {category.name}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="flex items-center p-3 cursor-pointer hover:bg-zinc-100 active:bg-zinc-200 rounded-full transition text-3xl"
                id="sidebar-category"
                onClick={() => router.push("/")}
              >
                <IoMdArrowRoundBack />
                <div
                  className="absolute left-[-500px] bg-white p-2 text-base rounded-lg border-2 shadow-lg opacity-0 transition z-[-1] text-nowrap"
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

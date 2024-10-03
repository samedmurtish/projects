"use client";

import React, { useState, useRef, useEffect } from "react";
import { BsList } from "react-icons/bs";
import logo from "../../../../images/logo.png";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";

export default function NavigationBar() {
  const [categories, setCategories] = useState<any>([]);
  const [subCategories, setSubCategories] = useState<any>([]);
  useEffect(() => {
    getCategories();
    getSubCategories();
  }, []);

  const getCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) return console.log(error);
    setCategories(data);
  };
  const getSubCategories = async () => {
    const { data, error } = await supabase.from("sub_categories").select("*");
    if (error) return console.log(error);
    setSubCategories(data);
  };

  const [isCategoriesPopupVisible, setIsCategoriesPopupVisible] =
    useState(false);
  const [mouseOnPopup, setMouseOnPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsCategoriesPopupVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCategoriesPopupVisible(false);
    }, 300);
  };

  const renderCategories = () => {
    return (
      <div
        className="min-w-[500px] max-w-max min-h-[200px] max-h-[300px] bg-zinc-100 p-5 flex rounded-b-xl shadow-md z-50"
        onMouseEnter={() => {
          handleMouseEnter();
          setMouseOnPopup(true);
        }}
        onMouseLeave={() => {
          handleMouseLeave();
          setMouseOnPopup(false);
        }}
      >
        <div className="flex flex-col border-r-2 pr-5 w-max gap-1">
          {categories.map((category: any, index: any) => (
            <div key={category.name + category.id + index}>
              {category.is_public && (
                <div
                  key={category.name + category.id + index}
                  className={`hover:bg-sky-500 hover:text-white p-1 px-3 w-full cursor-pointer rounded-md transition text-nowrap ${
                    selectedCategory === category.id
                      ? "bg-sky-500 text-white"
                      : "bg-transparent text-black"
                  }`}
                  onMouseEnter={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="pl-5 flex-wrap w-full flex h-[300px]">
          {categories.map((category: any, index: any) => {
            if (category.id === selectedCategory) {
              return (
                <div
                  key={category.id + index}
                  className="flex flex-col flex-wrap max-h-[250px] gap-1 "
                >
                  {category.sub_categories.map((subCategory: any) => (
                    <div key={subCategory + category.id + index}>
                      {subCategories.map((item: any) => {
                        if (item.name === subCategory && item.is_public) {
                          return (
                            <button
                              key={subCategory + index}
                              className="bg-zinc-50 hover:bg-sky-500 hover:text-white p-1 px-3 max-w-[200px] h-max flex justify-start items-center rounded-md transition"
                            >
                              {subCategory}
                            </button>
                          );
                        }
                      })}
                    </div>
                  ))}
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="sticky top-0 z-[100]">
      <div className="w-full bg-white h-[7rem] select-none border-b-2 border-b-slate-100 z-50">
        <div className="text-black flex items-center h-full w-3/4 mx-auto my-0">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-10">
              <Link
                href="/"
                className="text-4xl font-extrabold my-5 text-zinc-700"
                onMouseOver={() => {
                  setIsCategoriesPopupVisible(false);
                  setMouseOnPopup(false);
                }}
              >
                <img src={logo.src} className="w-32" />
              </Link>
              <div className="relative">
                <button
                  className={`flex gap-2 justify-center items-center hover:text-white hover:bg-sky-500 p-2 px-4 rounded-lg border-b-2 border-b-transparent hover:border-b-sky-600 transition min-w-[150px] ${
                    mouseOnPopup || isCategoriesPopupVisible
                      ? "bg-sky-500 border-sky-600 text-white"
                      : "bg-transparent border-transparent text-black"
                  }`}
                  onMouseEnter={() => handleMouseEnter()}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  <span className="text-2xl">
                    <BsList />
                  </span>
                  Categories
                </button>
                {isCategoriesPopupVisible && (
                  <div className="absolute left-[10rem] top-[202px] mt-1 w-full justify-center items-center categories-popup flex h-full z-[100]">
                    {renderCategories()}
                  </div>
                )}
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search Products"
                className="w-full border-2 rounded-lg p-2 px-4 text-sm"
              />
            </div>
            <div className="hover:[&_button]:bg-sky-500 [&_button]:p-2 [&_button]:px-4 [&_button]:rounded-lg [&_button]:border-b-2 [&_button]:border-b-transparent hover:[&_button]:border-b-sky-600 hover:[&_button]:text-white [&_button]:transition [&_button]:min-w-[150px] flex gap-3">
              <button
                onMouseEnter={() => {
                  setIsCategoriesPopupVisible(false);
                  setMouseOnPopup(false);
                }}
              >
                Contact Us
              </button>
              <button
                onMouseEnter={() => {
                  setIsCategoriesPopupVisible(false);
                  setMouseOnPopup(false);
                }}
              >
                About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import { BsList } from "react-icons/bs";
import logo from "@/images/logo.png";
import { supabase } from "@/app/(pages)/lib/supabase";
import Link from "next/link";
import { FaHeart, FaRegUser, FaUser } from "react-icons/fa";
import { RiShoppingCart2Line, RiShoppingCart2Fill } from "react-icons/ri";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { logout } from "@/app/(pages)/lib/logout";

export default function NavigationBar() {
  const [categories, setCategories] = useState<any>([]);
  const [subCategories, setSubCategories] = useState<any>([]);

  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  const [isCategoriesPopupVisible, setIsCategoriesPopupVisible] =
    useState(false);
  const [isAuthPopupVisible, setIsAuthPopupVisible] = useState(false);
  const [mouseOnPopup, setMouseOnPopup] = useState(false);
  const [mouseOnAuthPopup, setMouseOnAuthPopup] = useState(false);
  const [mouseOnCartPopup, setMouseOnCartPopup] = useState(false);
  const [mouseOnWishlistPopup, setMouseOnWishlistPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRefAuth = useRef<NodeJS.Timeout | null>(null);
  const getUserInfo = async (id: string, username: string) => {
    const { data: user } = await supabase
      .from("user_data")
      .select("*")
      .eq("id", id);

    setLoggedInUser((prev: any) => {
      if (user == null) return;
      const data = { ...user[0], username };
      data.username = username;
      localStorage.setItem("user", JSON.stringify(data));
      console.log(data);
      return data;
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
    if (token) {
      getUserInfo(
        JSON.parse(token).user.id,
        JSON.parse(token).user.user_metadata.username
      );
    }
  }, []);

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

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsCategoriesPopupVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCategoriesPopupVisible(false);
    }, 200);
  };
  const handleMouseEnterOnAuth = () => {
    if (timeoutRefAuth.current) {
      clearTimeout(timeoutRefAuth.current);
    }
    setIsAuthPopupVisible(true);
  };

  const handleMouseLeaveOnAuth = () => {
    timeoutRefAuth.current = setTimeout(() => {
      setIsAuthPopupVisible(false);
    }, 100);
  };
  useEffect(() => {
    getSettings();
  }, []);
  const getSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 0);
    if (error) return console.log(error);
    localStorage.setItem("siteSettings", JSON.stringify(data[0]));
  };

  const renderAuthPopup = () => {
    return (
      <div
        className="w-[500px] h-max bg-white p-5 flex rounded-b-xl shadow-md z-50 cursor-auto"
        onMouseEnter={() => {
          handleMouseEnterOnAuth();
          setMouseOnAuthPopup(true);
        }}
        onMouseLeave={() => {
          handleMouseLeaveOnAuth();
          setMouseOnAuthPopup(false);
        }}
      >
        <div
          className={`flex flex-col w-full gap-1 text-slate-600 text-base text-nowrap`}
        >
          <div className={`mb-3 flex justify-center items-center`}>
            <p className="mr-1">Welcome{loggedInUser && " back"},</p>
            {loggedInUser ? (
              <p className="self-center font-extrabold">
                {loggedInUser.username}!
              </p>
            ) : (
              <p className="self-center font-extrabold">Guest!</p>
            )}
          </div>
          {!loggedInUser ? (
            <>
              <Link
                href="/login"
                className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white p-1 px-3 w-full rounded-md transition cursor-pointer text-nowrap text-center"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-green-400 hover:bg-green-500 active:bg-green-600 text-white p-1 px-3 w-full rounded-md transition cursor-pointer text-nowrap text-center"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/profile"
                onClick={() => {
                  handleMouseLeaveOnAuth();
                  setMouseOnAuthPopup(false);
                  setIsAuthPopupVisible(false);
                }}
                className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white p-1 px-3 w-full rounded-md transition cursor-pointer text-nowrap text-center"
              >
                Profile
              </Link>
              <button
                className="bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white p-1 px-3 w-full rounded-md transition cursor-pointer text-nowrap"
                onClick={() => logout()}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderCategories = () => {
    return (
      <div
        className="min-w-[500px] max-w-max min-h-[200px] max-h-[300px] bg-white p-5 flex rounded-b-xl shadow-md z-50"
        onMouseEnter={() => {
          handleMouseEnter();
          setMouseOnPopup(true);
        }}
        onMouseLeave={() => {
          handleMouseLeave();
          setMouseOnPopup(false);
        }}
      >
        <div className="flex flex-col border-r-2 pr-5 gap-2 w-max">
          {categories.map(
            (category: any, index: any) =>
              category.is_public && (
                <Link
                  href={`/categories/${category.name}`}
                  key={category.name + category.id + index}
                  className={`p-1 px-3 rounded-md transition cursor-pointer text-nowrap ${
                    selectedCategory === category.id
                      ? "bg-sky-500 text-white"
                      : "bg-transparent text-black"
                  }`}
                  onMouseEnter={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Link>
              )
          )}
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
                            <Link
                              href={`/categories/${category.name}/${subCategory}`}
                              key={subCategory + index}
                              onClick={() => {
                                handleMouseLeave();
                                setIsCategoriesPopupVisible(false);
                              }}
                              className="bg-zinc-50 hover:bg-sky-500 hover:text-white p-1 px-3 max-w-[200px] h-max flex justify-start items-center rounded-md transition"
                            >
                              {subCategory}
                            </Link>
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
        <div className="text-black flex items-center h-full lg:w-3/4 mx-auto my-0">
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
                <img src={logo.src} className="min-w-16 w-32 max-w-32" />
              </Link>
              <div className="relative">
                <Link
                  href="/categories"
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
                </Link>
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
            <div className="flex gap-2">
              <Link
                href="/wishlist"
                className="cursor-pointer flex justify-center items-center p-3 text-2xl rounded-full text-slate-700 hover:bg-rose-500 hover:text-white transition hover:border-b-rose-600 active:bg-rose-500 border-transparent border-b-2 relative duration-150 group/wishlist"
                onMouseEnter={() => setMouseOnWishlistPopup(true)}
                onMouseLeave={() => setMouseOnWishlistPopup(false)}
              >
                {!mouseOnWishlistPopup ? <IoMdHeartEmpty /> : <IoMdHeart />}

                <div className="absolute z-[1000] top-[4rem] p-1 px-3 justify-center items-center flex bg-transparent text-transparent text-base rounded-lg transition duration-150 pointer-events-none group-hover/wishlist:pointer-events-auto group-hover/wishlist:bg-slate-500 group-hover/wishlist:text-white">
                  <div className="transition w-5 h-5 rotate-45 bg-transparent absolute -top-1 z-[-1] self-center -translate-x-1/2 left-1/2 pointer-events-none group-hover/wishlist:bg-slate-500 duration-200" />

                  <span className="pointer-events-none">Wishlist</span>
                </div>
              </Link>

              <Link
                href="/cart"
                className="cursor-pointer flex justify-center items-center p-3 text-2xl rounded-full text-slate-700 hover:bg-sky-500 hover:text-white transition hover:border-b-sky-600 active:bg-sky-500 border-transparent border-b-2 relative duration-150 group/cart"
                onMouseEnter={() => setMouseOnCartPopup(true)}
                onMouseLeave={() => setMouseOnCartPopup(false)}
              >
                {!mouseOnCartPopup ? (
                  <RiShoppingCart2Line />
                ) : (
                  <RiShoppingCart2Fill />
                )}

                <div className="absolute z-[1000] top-[4rem] p-1 px-3 justify-center items-center flex bg-transparent text-transparent text-base rounded-lg transition duration-150 pointer-events-none group-hover/cart:pointer-events-auto group-hover/cart:bg-slate-500 group-hover/cart:text-white">
                  <div className="transition w-5 h-5 rotate-45 bg-transparent absolute -top-1 z-[-1] self-center -translate-x-1/2 left-1/2 pointer-events-none group-hover/cart:bg-slate-500 duration-20" />

                  <span className="pointer-events-none">Cart</span>
                </div>
              </Link>

              {loggedInUser && (
                <div className="h-6 w-[2px] bg-slate-100 self-center mx-3 mr-6" />
              )}
              <div
                className="flex gap-2 group/auth cursor-help"
                onMouseEnter={() => {
                  setIsCategoriesPopupVisible(false);
                  setMouseOnPopup(false);
                  handleMouseEnterOnAuth();
                  setMouseOnAuthPopup(true);
                }}
                onMouseOver={() => {
                  setMouseOnAuthPopup(true);
                  handleMouseEnterOnAuth();
                }}
                onMouseLeave={() => {
                  handleMouseLeaveOnAuth();
                  setMouseOnAuthPopup(false);
                }}
              >
                <span className="self-center">
                  {loggedInUser && loggedInUser.username}
                </span>
                <div className="cursor-pointer flex justify-center items-center p-3 text-2xl rounded-full text-slate-700 group-hover/auth:bg-sky-500 group-hover/auth:text-white transition group-hover/auth:border-b-sky-600 border-transparent border-b-2 relative duration-150">
                  {isAuthPopupVisible && (
                    <div className="absolute top-[100px] w-full justify-center items-center flex h-full z-[100]">
                      {renderAuthPopup()}
                    </div>
                  )}
                  {!mouseOnAuthPopup ? <FaRegUser /> : <FaUser />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

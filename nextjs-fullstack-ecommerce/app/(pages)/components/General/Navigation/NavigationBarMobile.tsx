"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import logo from "@/images/logo.png";
import { BsList } from "react-icons/bs";
import { supabase } from "@/app/(pages)/lib/supabase";
import { RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { logout } from "@/app/(pages)/lib/logout";
export default function NavigationBarMobile() {
  const [isCategoriesPopupVisible, setIsCategoriesPopupVisible] =
    useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leftMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [categories, setCategories] = useState<any>([]);
  const [subCategories, setSubCategories] = useState<any>([]);

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  const [mouseOnWishlistPopup, setMouseOnWishlistPopup] = useState(false);
  const [mouseOnCartPopup, setMouseOnCartPopup] = useState(false);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsCategoriesPopupVisible(true);
  };
  const leftMenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setMenuOpened(true);
  };
  const leftMenuMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setMenuOpened(false);
    }, 200);
  };
  const getUserInfo = async (id: string, username: string) => {
    const { data: user } = await supabase
      .from("user_data")
      .select("*")
      .eq("id", id);

    setLoggedInUser((prev: any) => {
      if (user == null) return;
      const data = { ...user[0], username };
      data.username = username;
      console.log(data);
      return data;
    });
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
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCategoriesPopupVisible(false);
    }, 200);
  };
  // document.title = "TrendM Fashion";
  const renderNav = () => {
    return (
      <div
        className={`flex flex-col w-full gap-1 text-slate-600 text-base text-nowrap px-3`}
      >
        <div className={`mb-3 flex justify-center items-center flex-col`}>
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
    );
  };
  const renderCategories = () => {
    return (
      <div className="w-full min-h-[200px] max-h-[300px] bg-white p-5 flex rounded-b-xl shadow-md z-50 text-lg">
        <div
          className={`flex flex-col ${
            selectedCategory ? "border-r-2" : ""
          } pr-5 gap-2 w-max`}
        >
          {categories.map(
            (category: any, index: any) =>
              category.is_public && (
                <div
                  key={category.name + category.id + index}
                  className={`p-1 px-3 rounded-md transition cursor-pointer text-nowrap ${
                    selectedCategory === category.id
                      ? "bg-sky-500 text-white"
                      : "bg-transparent text-black"
                  }`}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    handleMouseEnter();
                  }}
                  onMouseEnter={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </div>
              )
          )}
        </div>
        <div className="pl-5 flex-wrap w-full flex h-[250px] overflow-hidden overflow-y-auto">
          {categories.map((category: any, index: any) => {
            if (category.id === selectedCategory) {
              return (
                <div
                  key={category.id + index}
                  className="flex flex-col flex-wrap max-h-max overflow-y-auto gap-1 "
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

                                console.log("clicked");
                              }}
                              onMouseEnter={() => {
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
    <div className="bg-white w-full z-[10000] fixed top-0">
      <div className="flex justify-between items-center text-white font-semibold py-3 text-xl px-7 flex-col">
        <div className="flex w-full justify-between items-center">
          <Link
            href="/"
            className="text-4xl font-extrabold my-5 text-zinc-700"
            onClick={() => setMenuOpened(false)}
          >
            <img src={logo.src} className="w-32" />
          </Link>
          <div className="flex justify-end items-center">
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
            <div
              className="rounded-full bg-slate-100 text-slate-600 active:text-white transition hover:text-white hover:bg-sky-500 active:bg-sky-600 p-2 text-3xl cursor-pointer h-max w-max"
              onClick={() => {
                setMenuOpened(!menuOpened);
                handleMouseLeave();
              }}
              onMouseEnter={() => leftMenuMouseEnter()}
              onMouseLeave={() => leftMenuMouseLeave()}
            >
              <HiOutlineMenu />
            </div>
          </div>
        </div>

        <div
          className="relative text-slate-600 flex w-max self-start z-[100000]"
          onMouseEnter={() => handleMouseEnter()}
          onMouseLeave={() => handleMouseLeave()}
          onClick={() => {
            handleMouseEnter();
            setMenuOpened(false);
          }}
        >
          <div
            className={`flex gap-2 justify-center items-center hover:text-white hover:bg-sky-500 p-2 px-4 rounded-lg border-b-2 border-b-transparent hover:border-b-sky-600 transition min-w-[150px] bg-slate-100`}
          >
            <span className="text-2xl">
              <BsList />
            </span>
            Categories
          </div>
          {isCategoriesPopupVisible && (
            <div className="absolute -left-[0.5rem] top-[11rem] justify-center items-center flex h-full z-[100]">
              {renderCategories()}
            </div>
          )}
        </div>
      </div>

      {menuOpened && (
        <div className="h-screen w-2/5 bg-slate-100 fixed right-0 text-white">
          <div className="font-semibold py-3">{renderNav()}</div>
        </div>
      )}
    </div>
  );
}

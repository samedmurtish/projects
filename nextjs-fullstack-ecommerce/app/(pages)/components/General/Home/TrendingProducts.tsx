import { supabase } from "@/app/(pages)/lib/supabase";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import RenderStars from "../Products/RenderStars";
import { FaHeart } from "react-icons/fa";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

export default function TrendingProducts() {
  const [trendingProducts, setTrendingProducts] = React.useState<any>([]);
  const [userLoggedIn, setUserLoggedIn] = React.useState<any>(
    typeof window !== "undefined" && localStorage.getItem("token")
      ? true
      : false
  );

  const [productsPerPage, setProductsPerPage] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wishlist, setWishlist] = useState<any>([]);
  const [currency, setCurrency] = useState("MKD");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user && Array.isArray(user.wishlist)) {
      setWishlist(user.wishlist);
    } else {
      setWishlist([]);
    }

    const currencyData = JSON.parse(localStorage.getItem("siteSettings")!);
    if (currencyData) setCurrency(currencyData.currency);
  }, []);

  const updateProductsPerPage = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 920) setProductsPerPage(2);
    else if (screenWidth < 1024) {
      setProductsPerPage(3);
    } else if (screenWidth < 1280) {
      setProductsPerPage(4);
    } else {
      setProductsPerPage(5);
    }
  };

  useEffect(() => {
    updateProductsPerPage();
    window.addEventListener("resize", updateProductsPerPage);

    return () => {
      window.removeEventListener("resize", updateProductsPerPage);
    };
  }, []);

  const getTrendingProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) return console.log(error);
    setTrendingProducts((prev: any) => {
      const products = [...data];
      products.map((product: any) => {
        product.selectedImage = null;
      });
      return products;
    });
  };

  useEffect(() => {
    getTrendingProducts();
  }, []);

  useEffect(() => {
    console.log(Math.floor(trendingProducts.length / productsPerPage) + 1);
  }, [productsPerPage, trendingProducts.length]);

  const handleUpdateSelectedImage = (productId: any, image: any) => {
    setTrendingProducts((prev: any) => {
      return prev.map((product: any) => {
        if (product.id === productId) {
          product.selectedImage = image;
        }
        return product;
      });
    });
  };

  const stopPropagation = (e: any) => {
    e.preventDefault();
  };

  const handleNext = () => {
    if (currentIndex + productsPerPage < trendingProducts.length) {
      setCurrentIndex(currentIndex + productsPerPage);
    }
  };

  const handlePrevious = () => {
    console.log(currentIndex - productsPerPage);
    if (currentIndex - productsPerPage >= 0) {
      setCurrentIndex(currentIndex - productsPerPage);
    }
  };

  const handleAddToWishlist = async (productId: any) => {
    if (userLoggedIn) {
      const user = JSON.parse(localStorage.getItem("user")!);
      const userId = user?.id;
      if (!userId) {
        console.error("Invalid user ID. Please log in again.");
        return;
      }
      if (!wishlist.includes(productId)) {
        const updatedWishlist = [...wishlist, productId];
        setWishlist(updatedWishlist);
        const { data, error } = await supabase
          .from("user_data")
          .update({ wishlist: updatedWishlist })
          .eq("id", userId);
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          const { data: updatedUser } = await supabase
            .from("user_data")
            .select("*")
            .eq("id", userId);
          if (updatedUser) {
            localStorage.setItem("user", JSON.stringify(updatedUser[0]));
            setWishlist(updatedUser[0].wishlist);
          }
        }
      }
    }
  };

  const renderTrendingProducts = () => {
    return trendingProducts
      .slice(currentIndex, currentIndex + productsPerPage)
      .map(
        (product: any) =>
          product.is_public && (
            <Link
              href={`/product/${product.id}`}
              key={product.id + product.name}
              className="min-w-44 w-64 max-w-64 h-max bg-white flex justify-around items-center flex-col p-3 select-none rounded-xl"
              onMouseLeave={() =>
                handleUpdateSelectedImage(product.id, product.thumbnail)
              }
            >
              <div className="w-full h-52 relative group/thumbnail">
                <img
                  src={
                    product.selectedImage
                      ? product.selectedImage
                      : product.thumbnail
                  }
                  className={`w-full h-full object-contain ${
                    product.images.length > 0
                      ? "group-hover/thumbnail:blur-sm"
                      : ""
                  } transition-all`}
                />
                <div className="flex gap-2 absolute inset-0 justify-center rounded-xl group-hover/thumbnail:bg-black/20 py-3 h-full transition-all">
                  {product.images.map((image: any, index: any) => (
                    <div
                      className="w-16 h-16 hover:bg-black/50 hover:border-white/70 rounded-xl border-2 border-transparent bg-black/30 cursor-pointer object-contain flex justify-center items-center opacity-0 group-hover/thumbnail:opacity-100 transition-all"
                      key={image + index}
                      onMouseEnter={() =>
                        handleUpdateSelectedImage(product.id, image)
                      }
                    >
                      <img
                        key={image + index}
                        src={image}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
                {userLoggedIn && (
                  <div
                    className="absolute bottom-0 right-0 text-white p-3 rounded-xl cursor-pointer flex justify-center items-center group-hover/thumbnail:bg-black/30 hover:bg-black/50 active:text-rose-400 hover:text-rose-500 opacity-0 group-hover/thumbnail:opacity-100 transition duration-0 text-sm group-hover/thumbnail:text-4xl m-3"
                    onClick={(e: any) => {
                      stopPropagation(e);
                      handleAddToWishlist(product.id);
                    }}
                  >
                    <FaHeart className="stroke-black w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="py-2 text-xl">{product.name}</div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <div className="text-yellow-300">
                  <RenderStars stars={4} />
                </div>
                <div className="w-max">
                  <span className="text-sm">{currency}</span>
                  <span className="text-2xl font-extrabold">
                    {product.price}
                  </span>
                </div>
              </div>
              <Link href={`/product/${product.id}`} className="w-full">
                <div className="w-full h-14 flex justify-center items-center bg-white rounded-2xl border-2 hover:border-blue-500 border-blue-500/10 cursor-pointer mt-2 transition">
                  View Product
                </div>
              </Link>
            </Link>
          )
      );
  };

  return (
    <div className="text-black md:w-3/4 md:mx-auto md:my-0 w-screen py-10 flex flex-col gap-5">
      <h1 className="text-3xl font-semibold pl-3 md:pl-0">Trending Products</h1>

      <div className="flex gap-3 overflow-x-hidden w-screen md:w-full relative">
        {currentIndex > 0 && (
          <button
            onClick={handlePrevious}
            className="absolute top-0 left-1 bottom-0 m-auto flex justify-center items-center w-16 h-16 hover:w-[4.5rem] hover:h-[4.5rem] hover:left-[-0rem] transition-width ease-out transition-all rounded-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 active:w-[4rem] active:h-[4rem] hover:shadow-lg text-white text-5xl cursor-pointer z-[1000] shadow-xl"
            disabled={currentIndex === 0}
          >
            <MdNavigateBefore />
          </button>
        )}
        {currentIndex + productsPerPage < trendingProducts.length && (
          <button
            onClick={handleNext}
            className="absolute top-0 right-1 bottom-0 m-auto flex justify-center items-center w-16 h-16 hover:w-[4.5rem] hover:h-[4.5rem] hover:right-[-0rem] transition-width ease-out transition-all rounded-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 active:w-[4rem] active:h-[4rem] hover:shadow-lg text-white text-5xl cursor-pointer z-[5000] shadow-xl"
          >
            <MdNavigateNext />
          </button>
        )}
        {renderTrendingProducts()}
      </div>
    </div>
  );
}

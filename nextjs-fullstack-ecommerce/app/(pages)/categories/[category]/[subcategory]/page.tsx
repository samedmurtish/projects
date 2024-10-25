"use client";

import NavigationBar from "@/app/(pages)/components/General/Navigation/NavigationBar";
import NavigationBarMobile from "@/app/(pages)/components/General/Navigation/NavigationBarMobile";
import RenderStars from "@/app/(pages)/components/General/Products/RenderStars";
import { supabase } from "@/app/(pages)/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function SubCategory({
  params,
}: {
  params: { category: string; subcategory: string };
}) {
  const router = useRouter();

  const [category, setCategory] = useState<any>(null);
  const [subCategory, setSubCategory] = useState<any>(null);
  const [userLoggedIn, setUserLoggedIn] = React.useState<any>();

  const [products, setProducts] = useState<any>([]);

  const [currency, setCurrency] = useState("MKD");

  useEffect(() => {
    const currencyData = JSON.parse(localStorage.getItem("siteSettings")!);

    if (currencyData) setCurrency(currencyData.currency);
  }, []);

  const getProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) return console.log(error);
    setProducts((prev: any) => {
      const products = [...data];
      const newProducts: any = [];
      if (subCategory) {
        if (category) {
          products.map((product: any) => {
            if (product.sub_categories.includes(subCategory.name)) {
              if (product.category.includes(category.name)) {
                newProducts.push(product);
              }
            }
          });
        }
      }
      return newProducts;
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, [subCategory]);

  const getCategories = async () => {
    const { data, error }: any = await supabase
      .from("categories")
      .select("*")
      .eq("name", params.category.replace(/%20/, " "));
    if (error) return console.log(error);
    setCategory(data[0]);

    if (data[0] == undefined && error == null) {
      router.push("/");
    }
    await getSubCategories();
  };

  const getSubCategories = async () => {
    const { data, error }: any = await supabase
      .from("sub_categories")
      .select("*")
      .eq("name", params.subcategory);
    if (error) return console.log(error);

    setSubCategory(data[0]);
    console.log(data[0], error);
    if (data[0] == undefined && error == null) {
      router.push("/");
    }
  };
  const handleUpdateSelectedImage = (productId: any, image: any) => {
    setProducts((prev: any) => {
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
  const renderProducts = () => {
    return products.map(
      (product: any, index: any) =>
        product.is_public && (
          <Link
            href={`/product/${product.id}`}
            key={product.id + product.name}
            className="min-w-52 w-52 max-w-64 grow h-max bg-white flex justify-around items-center flex-col p-3 select-none rounded-xl"
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
                  className="absolute bottom-0 right-0 text-white p-3 rounded-xl cursor-pointer  flex justify-center items-center group-hover/thumbnail:bg-black/30 hover:bg-black/50 active:text-rose-400 hover:text-rose-500 opacity-0 group-hover/thumbnail:opacity-100 transition duration-0 text-sm group-hover/thumbnail:text-4xl m-3"
                  onClick={(e: any) => stopPropagation(e)}
                >
                  <FaHeart
                    style={{ stroke: "black", strokeWidth: "20px" }}
                    className="stroke-black w-8 h-8"
                  />
                </div>
              )}
            </div>
            <div className="py-2 text-xl">{product.name}</div>
            {/* <div className="px-2 pb-1 h-16 w-full flex mb-2 border-2 border-slate-100 rounded-2xl gap-1 justify-start items-center pt-2 overflow-x-auto flex-nowrap overflow-y-hidden">
    		{renderProductSubCategories(product)}
    	</div>
    	<div className="p-1 pl-3 bg-indigo-400 hover:bg-indigo-500 transition w-full rounded-2xl text-white text-base font-bold flex justify-center items-center">
    		<div className="flex justify-center items-center w-1/2 pr-3">
    			<div className="text-indigo-200">$</div> {product.price}
    		</div>
    		<button className="p-1 px-3 bg-white hover:bg-green-400 active:bg-green-500 transition w-full rounded-xl text-slate-600 hover:text-white text-base font-bold h-12 hover:shadow-2xl">
    			Add to cart
    		</button>
    	</div> */}
            <div className="flex flex-col gap-2 justify-center items-center">
              <div className="text-yellow-300">
                <RenderStars stars={4} />
              </div>
              <div className="w-max">
                <span className="text-sm">{currency}</span>
                <span className="text-2xl font-extrabold">{product.price}</span>
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
    <div className="h-full">
      {category && subCategory && (
        <div className="md:w-3/4 md:mx-auto md:my-0 pb-10 mt-[10rem]">
          <div className="pt-5 pb-10 pl-5">
            <Link
              href={`/categories/${category.name}`}
              className="hover:underline"
            >
              {category && category.name}
            </Link>
            <span className="px-1">/</span>
            <span className="font-bold">{subCategory && subCategory.name}</span>
          </div>
          <div className="md:flex md:flex-wrap gap-5 grid grid-cols-2">
            {renderProducts()}
          </div>
        </div>
      )}
    </div>
  );
}

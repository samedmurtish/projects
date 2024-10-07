"use client";
import React, { useEffect, useState } from "react";
import NavigationBar from "../components/General/Navigation/NavigationBar";
import Link from "next/link";
import { get } from "http";
import { supabase } from "../lib/supabase";
import NavigationBarMobile from "../components/General/Navigation/NavigationBarMobile";

export default function page() {
  const [categories, setCategories] = useState<any>(null);

  const getCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) return console.log(error);
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleRenderCategories = () => {
    return categories.map((category: any, index: number) => (
      <div key={category} className="flex flex-col">
        <Link
          href={`/categories/${category.name}`}
          className="hover:underline font-extrabold w-max"
        >
          {category.name}
        </Link>
        <div className="flex flex-wrap">
          {category.sub_categories.map((subCategory: any, index: number) => (
            <div key={subCategory}>
              <Link
                href={`/categories/${category.name}/${subCategory}`}
                key={subCategory}
                className="hover:underline"
              >
                {subCategory}{" "}
              </Link>
              <span
                className={`${
                  index !== category.sub_categories.length - 1 && "px-5"
                }`}
              >
                {index === category.sub_categories.length - 1 ? "" : " / "}
              </span>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="h-screen">
      {categories && (
        <div className="w-3/4 mx-auto my-0 h-full mt-[4.5rem]">
          <div className="flex items-center flex-col mt-52 gap-5 bg-white p-10 rounded-lg">
            <div className="text-2xl">Categories</div>
            <div className="flex flex-wrap gap-20">
              {handleRenderCategories()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

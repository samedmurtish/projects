"use client";
import NavigationBar from "@/app/components/General/Navigation/NavigationBar";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Category({ params }: { params: { category: string } }) {
  const [category, setCategory] = useState<any>(null);
  const router = useRouter();
  const getCategory = async () => {
    const { data, error }: any = await supabase
      .from("categories")
      .select("*")
      .eq("name", params.category.replace(/%20/, " "));
    if (error) return console.log(error);
    setCategory(data[0]);
    if (data[0] == undefined && error == null) {
      router.push("/");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="h-screen">
      <NavigationBar />
      {category && (
        <div className="w-3/4 mx-auto my-0 h-full">
          <div className="flex items-center flex-col mt-52 gap-5 bg-white p-10 rounded-lg">
            <div className="font-extrabold">{category.name}</div>
            <div className="flex flex-wrap">
              {category.sub_categories.map(
                (subCategory: any, index: number) => (
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
                      {index === category.sub_categories.length - 1
                        ? ""
                        : " / "}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

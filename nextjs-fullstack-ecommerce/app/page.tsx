"use client";
import { useEffect, useState } from "react";
import NavigationBar from "./components/General/Navigation/NavigationBar";
import { supabase } from "./lib/supabase";
import Banners from "./components/General/Home/Banners";

export default function Home() {
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

  return (
    <div className="w-full h-screen text-black">
      <NavigationBar categories={categories} subCategories={subCategories} />

      <Banners />
    </div>
  );
}

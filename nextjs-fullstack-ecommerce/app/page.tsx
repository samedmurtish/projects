"use client";
import { useEffect, useState } from "react";
import NavigationBar from "./components/General/Navigation/NavigationBar";
import { supabase } from "./lib/supabase";
import Banners from "./components/General/Home/Banners";
import TrendingProducts from "./components/General/Home/TrendingProducts";
import NavigationBarMobile from "./components/General/Navigation/NavigationBarMobile";

export default function Home() {
  return (
    <div className="w-screen md:w-full h-screen text-black relative">
      <div className="hidden md:block ">
        <NavigationBar />
      </div>
      <div className="block md:hidden z-[1000]">
        <NavigationBarMobile />
      </div>
      <Banners />
      <TrendingProducts />
    </div>
  );
}

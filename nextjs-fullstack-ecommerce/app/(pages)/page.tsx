"use client";
import { useEffect, useState } from "react";
import NavigationBar from "./components/General/Navigation/NavigationBar";
import { supabase } from "./lib/supabase";
import Banners from "./components/General/Home/Banners";
import TrendingProducts from "./components/General/Home/TrendingProducts";
import NavigationBarMobile from "./components/General/Navigation/NavigationBarMobile";

export default function Home() {
  return (
    <div className="w-screen md:w-full h-full text-black relative">
      <Banners />
      <TrendingProducts />
    </div>
  );
}

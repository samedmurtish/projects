"use client";
import { useEffect, useState } from "react";
import NavigationBar from "./components/General/Navigation/NavigationBar";
import { supabase } from "./lib/supabase";
import Banners from "./components/General/Home/Banners";
import TrendingProducts from "./components/General/Home/TrendingProducts";

export default function Home() {
  return (
    <div className="w-full h-screen text-black">
      <NavigationBar />
      <Banners />
      <TrendingProducts />
    </div>
  );
}

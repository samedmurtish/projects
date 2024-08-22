import { supabase } from "@/app/lib/supabase";
import React, { useEffect, useState } from "react";

export default function BannerManagement() {
  const [banners, setBanners] = useState<any>([]);

  const postBanner = async (e: any) => {
    const { data, error } = await supabase
      .from("banners")
      .insert({ image: e.target.image.files[0] });
    if (error) return console.log(error);
    console.log(data);
    getBanners();
  };
  const renderMainBanners = () => {
    return (
      <>
        {banners.map((banner: any) => (
          <div key={banner.id} className="w-64 h-32">
            <img src={banner.image} />
          </div>
        ))}
        <label className="w-64 h-32 bg-blue-500 text-white text-5xl flex justify-center items-center cursor-pointer">
          +
          <input
            type="file"
            onChange={(e: any) => console.log(e.target.files[0])}
            className="sr-only"
            accept="image/*"
          />
        </label>
      </>
    );
  };

  const getBanners = async () => {
    const { data, error } = await supabase.from("banners").select("*");
    if (error) return console.log(error);
    setBanners(data);
  };
  useEffect(() => {
    getBanners();
    console.log(banners);
  }, []);

  return (
    <div className="flex justify-center items-center h-full w-full">
      {renderMainBanners()}
    </div>
  );
}

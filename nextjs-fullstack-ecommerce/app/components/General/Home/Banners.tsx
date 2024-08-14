import React from "react";
import banner1 from "../../../../images/banner1.jpg";
import banner2 from "../../../../images/banner2.jpg";
import banner3 from "../../../../images/banner3.jpg";
export default function Banners() {
  return (
    <div>
      <div className="max-h-[600px] overflow-hidden flex justify-center items-center">
        <img src={banner2.src} className="w-full" />
      </div>
    </div>
  );
}

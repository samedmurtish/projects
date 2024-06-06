import React from "react";
import { BsLightningChargeFill } from "react-icons/bs";

export default function Copyright() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="shadow">
      <div className="w-11/12 mx-auto my-0 h-16 flex justify-between items-center text-xs text-gray-500">
        <p>Copyright © {year}, Snapdeal Limited. All Rights Reserved</p>
        <p className="flex justify-center items-center">
          Cloned by
          <span className="px-2 font-semibold">Samed Murtish</span>
          <span className="text-yellow-300 text-border">
            <BsLightningChargeFill />
          </span>
        </p>
      </div>
    </div>
  );
}

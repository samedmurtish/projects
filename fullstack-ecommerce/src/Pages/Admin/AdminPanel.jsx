import React from "react";
import MainProducts from "./Products/MainProducts";
import LeftMenu from "./LeftMenu/LeftMenu";

export default function AdminPanel() {
  return (
    <div className="flex h-screen w-screen">
      <LeftMenu />
      <div className="flex justify-center items-center w-full">
        <MainProducts />
      </div>
    </div>
  );
}

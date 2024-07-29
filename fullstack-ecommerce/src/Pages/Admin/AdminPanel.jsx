import React, { useEffect } from "react";
import MainProducts from "./Products/MainProducts";
import LeftMenu from "./LeftMenu/LeftMenu";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (
  //     JSON.parse(sessionStorage.getItem("token")).user.role != "supabase_admin"
  //   )
  //     navigate("/");
  // }, []);

  return (
    <div className="flex h-screen w-screen">
      <LeftMenu />
      <div className="flex justify-center items-center w-full">
        <MainProducts />
      </div>
    </div>
  );
}

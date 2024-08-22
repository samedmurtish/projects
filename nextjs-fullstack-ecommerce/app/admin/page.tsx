"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import SideBar from "./Components/SideBar";
import UserManagement from "./Components/UserManagement";
import Dashboard from "./Components/Dashboard";
import ProductManagement from "./Components/Product Management Components/Product Management/ProductManagement";
import BannerManagement from "./Components/BannerManagement";
const Panel = () => {
  const router = useRouter();
  const [userID, setUserID] = useState<string>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [users, setUsers] = useState<any>([]);
  const [category, setCategory] = useState("Dashboard");
  const [clicked, setClicked] = useState("");
  const [isSideBarOpened, setIsSideBarOpened] = useState(false);
  const [directMenu, setDirectMenu] = useState("");
  const getUsers = async () => {
    const { data: users, error } = await supabase.from("user_data").select("*");

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    setUsers(users);

    if (users) {
      users.forEach((user: any) => {
        if (user.id === userID) {
          if (user.role !== "admin") {
            router.push("/");
          } else {
            setIsAdmin(true);
          }
        }
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserID(JSON.parse(token).user.id);
    } else {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (userID) {
      getUsers();
    }
  }, [userID]);

  useEffect(() => {
    console.log(directMenu);
  }, [directMenu]);

  return (
    <>
      {isAdmin && (
        <div
          className="text-white w-full flex items-center flex-col h-screen bg-zinc-800"
          style={{ paddingLeft: !isSideBarOpened ? "4rem" : "16rem" }}
        >
          <SideBar
            setCategory={setCategory}
            setClicked={setClicked}
            setIsSideBarOpened={setIsSideBarOpened}
            setDirectMenu={setDirectMenu}
          />
          {category === "Dashboard" ? (
            <Dashboard />
          ) : category === "Product Management" ? (
            <ProductManagement
              clicked={clicked}
              setClicked={setClicked}
              directPage={directMenu}
            />
          ) : category === "User Management" ? (
            <UserManagement usersData={users} id={userID} getUsers={getUsers} />
          ) : category === "Banner Management" ? (
            <BannerManagement />
          ) : null}
        </div>
      )}
    </>
  );
};

export default Panel;

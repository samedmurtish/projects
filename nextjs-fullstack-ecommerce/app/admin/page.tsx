"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import SideBar from "./Components/SideBar";
import UserManagement from "./Components/UserManagement";
import Dashboard from "./Components/Dashboard";
import Categories from "./Components/Categories/Products/Categories";
const Panel = () => {
  const router = useRouter();
  const [userID, setUserID] = useState<string>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [users, setUsers] = useState<any>([]);
  const [category, setCategory] = useState("Dashboard");

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

  return (
    <>
      {isAdmin && (
        <div className="text-white w-full flex items-center flex-col h-screen">
          <SideBar setCategory={setCategory} />
          {category === "Dashboard" ? (
            <Dashboard />
          ) : category === "Product Management" ? (
            <Categories />
          ) : (
            <UserManagement usersData={users} id={userID} getUsers={getUsers} />
          )}
        </div>
      )}
    </>
  );
};

export default Panel;
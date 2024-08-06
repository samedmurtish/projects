"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import UsersTable from "./Components/UsersTable";

const Users = () => {
  const router = useRouter();
  const [userID, setUserID] = useState<string>();
  const [role, setRole] = useState("user");
  const [id, setId] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [users, setUsers] = useState<any>([]);

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

  const addUserRole = async () => {
    const { data, error } = await supabase
      .from("user_data")
      .insert({ id, role });

    if (error) console.log(error);
    if (data) console.log(data);
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
    getUsers();
  }, [userID]);

  return (
    <>
      {isAdmin && (
        <div className="text-white w-full flex justify-center items-center flex-col h-screen gap-10">
          <UsersTable usersData={users} id={userID} />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addUserRole();
            }}
          >
            <input
              type="text"
              className="border-2"
              placeholder="id"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <input
              type="text"
              className="border-2"
              placeholder="role"
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
            <button>Add</button>
          </form>
          <button
            onClick={() => {
              try {
                getUsers();
                console.log("updated users");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            update
          </button>
        </div>
      )}
    </>
  );
};

export default Users;

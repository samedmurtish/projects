import { supabase, supabaseAdmin } from "@/app/(pages)/lib/supabase";
import React, { useState } from "react";

export default function UserManagement({ usersData, id, getUsers }: any) {
  const [formRole, setFormRole] = useState("user");
  const [formId, setFormId] = useState("");

  const handleUserUpdate = async (id: string, role: string) => {
    const { data, error } = await supabaseAdmin
      .from("user_data")
      .update({ role })
      .eq("id", id);
    if (error) console.log(error);
    if (data) {
      console.log(data);
      getUsers();
    }
  };

  const handleUserDelete = async (id: string) => {
    const { data: deletedUser } = await supabaseAdmin.auth.admin.deleteUser(id);
    if (deletedUser) console.log(deletedUser);

    const { data, error } = await supabaseAdmin
      .from("user_data")
      .delete()
      .eq("id", id);

    if (error) return console.log(error);
    if (data) {
      console.log(data);
      getUsers();
    }
    getUsers();
  };

  const addUserRole = async () => {
    const { data, error } = await supabase
      .from("user_data")
      .insert({ id: formId, role: formRole });

    if (error) return console.log(error);
    if (data) {
      console.log(data);
      getUsers();
    }
    getUsers();
  };

  return (
    <>
      <table className="bg-zinc-900">
        <thead>
          <tr className="border-b-2 border-b-zinc-700 bg-zinc-800">
            <th className="p-5 font-normal">ID</th>
            <th className="p-5 font-normal">UUID</th>
            <th className="p-5 font-normal">Email</th>
            <th className="px-10 font-normal">Role</th>
            <th className="px-10 font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user: any, index: number) => (
            <tr key={user.id}>
              <th
                className="font-normal"
                style={{
                  paddingTop: index === 0 ? "20px" : "0px",
                  paddingBottom:
                    index === usersData.length - 1 ? "20px" : "8px",
                }}
              >
                {index}
              </th>
              <th
                className="px-10 font-normal"
                style={{
                  paddingTop: index === 0 ? "20px" : "0px",
                  paddingBottom:
                    index === usersData.length - 1 ? "20px" : "8px",
                }}
              >
                {user.id}
              </th>
              <th
                className="px-10 font-normal"
                style={{
                  paddingTop: index === 0 ? "20px" : "0px",
                  paddingBottom:
                    index === usersData.length - 1 ? "20px" : "8px",
                }}
              >
                {user.email}
              </th>
              <th
                className="px-10 font-normal"
                style={{
                  paddingTop: index === 0 ? "20px" : "0px",
                  paddingBottom:
                    index === usersData.length - 1 ? "20px" : "8px",
                }}
              >
                {id !== user.id ? (
                  <select
                    className="bg-zinc-800 p-2 w-full"
                    onChange={(e) => handleUserUpdate(user.id, e.target.value)}
                  >
                    <option value={user.role}>{user.role}</option>
                    <option value={user.role === "admin" ? "user" : "admin"}>
                      {user.role === "admin" ? "user" : "admin"}
                    </option>
                  </select>
                ) : (
                  <p className="p-2 w-full">{user.role}</p>
                )}
              </th>
              <th
                className="w-32 h-full gap-2 px-5 font-normal"
                style={{
                  paddingTop: index === 0 ? "20px" : "0px",
                  paddingBottom:
                    index === usersData.length - 1 ? "20px" : "8px",
                }}
              >
                {id !== user.id ? (
                  <button
                    className="w-full h-full bg-rose-500 py-2 rounded-md hover:rounded-lg hover:bg-rose-600 transition active:bg-rose-700"
                    onClick={() => {
                      handleUserDelete(user.id);
                      getUsers();
                    }}
                  >
                    Delete
                  </button>
                ) : (
                  <p className="bg-emerald-500 hover:bg-emerald-600 transition p-2 px-3 w-full rounded-md cursor-default text-base text-nowrap">
                    Current Session
                  </p>
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>

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
            setFormId(e.target.value);
          }}
        />
        <input
          type="text"
          className="border-2"
          placeholder="role"
          onChange={(e) => {
            setFormRole(e.target.value);
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
    </>
  );
}

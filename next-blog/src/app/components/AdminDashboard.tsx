"use client";

import React, { SetStateAction, useState } from "react";

import MyComponent from "./test";

export default function AdminDashboard() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
      } else {
        console.error("Server responded with status:", response.status);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <MyComponent />
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <p> Title </p>{" "}
          <textarea
            name="title"
            className="border-2 rounded-lg px-2"
            cols={90}
            rows={1}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>{" "}
          <p> Content </p>{" "}
          <textarea
            name="content"
            className="border-2 rounded-lg px-2"
            cols={90}
            rows={5}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>{" "}
        </div>{" "}
        <button className="bg-slate-500 h-max w-max px-3 py-1 rounded-lg text-white font-semibold">
          Add Post{" "}
        </button>{" "}
      </form>{" "}
    </div>
  );
}

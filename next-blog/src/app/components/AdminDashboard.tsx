"use client";

import React, { useState } from "react";
export default function AdminDashboard() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <p>Title</p>
          <textarea
            name="title"
            className="border-2 rounded-lg px-2"
            cols={90}
            rows={1}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
          <p>Content</p>
          <textarea
            name="content"
            className="border-2 rounded-lg px-2"
            cols={90}
            rows={5}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button className="bg-slate-500 h-max w-max px-3 py-1 rounded-lg text-white font-semibold">
          Add Post
        </button>
      </form>
    </div>
  );
}

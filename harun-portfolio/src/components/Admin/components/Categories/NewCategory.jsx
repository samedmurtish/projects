import React, { useState } from "react";
import { database } from "../../../../database/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function NewCategory({ setCategories, setPage }) {
  const [categoryName, setCategoryName] = useState("");
  const categoriesRef = collection(database, "categories");

  const handleAddCategory = async () => {
    const docRef = await addDoc(categoriesRef, { categoryName });

    setCategories((prevCategories) => [
      ...prevCategories,
      { id: docRef.id, categoryName },
    ]);
  };

  return (
    <form
      className="bg-[#242424] rounded-lg flex flex-col gap-10 p-5 h-full justify-between"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddCategory();
        setPage("Categories");
      }}
    >
      <div className="w-full cursor-pointer group transition flex justify-between flex-col gap-10">
        <div className="flex gap-5 justify-center items-center w-full">
          <div className="flex flex-col justify-center items-center">
            <h1 className="transition pl-3 text-2xl text-center w-full uppercase font-extrabold">
              New Category
            </h1>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <label className="text-xl">Category Name</label>
          <input
            type="text"
            placeholder="Category Name"
            className="p-3 px-5 rounded-lg text-slate-600"
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
            required
          />
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-3">
        <button
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 w-full p-2 px-5 transition rounded-lg"
          type="submit"
        >
          Add
        </button>
        <button
          className="bg-gray-600 hover:bg-gray-700 active:bg-gray-800 w-full p-2 px-5 transition rounded-lg"
          type="button"
          onClick={() => setPage("Categories")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

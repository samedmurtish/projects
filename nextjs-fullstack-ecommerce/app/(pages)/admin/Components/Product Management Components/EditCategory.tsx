import { supabase } from "@/app/(pages)/lib/supabase";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack, IoMdCloseCircle } from "react-icons/io";

export default function EditCategory({
  setPage,
  category,
  getCategories,
}: any) {
  const [name, setName] = useState(category.name);
  const [subCategories, setSubCategories] = useState([
    ...category.sub_categories,
  ]);
  const addSubCategoryText = "Add Sub Category";

  const [subCategoriesToSelect, setSubCategoriesToSelect] = useState<any>([]);
  const [newSubCategories, setNewSubCategories] = useState<any>([]);

  const [subCategoryName, setSubCategoryName] = useState<string>("");
  const [isPublic, setIsPublic] = React.useState<boolean>(true);

  useEffect(() => {
    getSubCategories();
  }, []);

  const getSubCategories = async () => {
    const { data, error } = await supabase.from("sub_categories").select("*");

    if (error) return console.log(error);

    const uniqueCategories = new Set(data.map((item: any) => item.name));
    setSubCategoriesToSelect(Array.from(uniqueCategories));
  };
  const handleUpdateCategory = async () => {
    const { data, error } = await supabase
      .from("categories")
      .update({
        name: name,
        sub_categories: subCategories,
        is_public: isPublic,
      })
      .eq("id", category.id);
    if (error) console.log(error);
    if (data) console.log(data);
  };
  const handleRemoveSubCategory = (category: string) => {
    setSubCategories(
      subCategories.filter((subCategory: any) => subCategory !== category)
    );
  };
  const handleRenderSubCategories = () => {
    return subCategories.map((subCategory: any) => (
      <div className="flex h-8" key={subCategory}>
        <div className="bg-blue-500 hover:bg-blue-600 p-1 px-3 pr-2 text-white w-max h-full rounded-lg rounded-r-none flex transition justify-center items-center">
          <div>{subCategory}</div>
        </div>
        <div className="h-full w-[2px] bg-blue-600"></div>
        <div
          className="bg-blue-500 hover:bg-rose-500 text-rose-500 active:bg-rose-600 h-full w-max p-1 px-1 rounded-r-lg transition flex justify-center items-center text-2xl relative"
          onClick={() => {
            handleRemoveSubCategory(subCategory);
          }}
        >
          <div className="z-[11]">
            <IoMdCloseCircle />
          </div>
          <div className="bg-white w-3 h-3 fixed z-[10]"></div>
        </div>
      </div>
    ));
  };
  const postSubCategory = async (name: any) => {
    const { data, error } = await supabase
      .from("sub_categories")
      .insert([{ name: name }]);

    if (error) return console.log(error);
    if (data) console.log(data);
  };
  const handleSubmitSubCategories = () => {
    newSubCategories.map((category: string) => {
      if (!subCategoriesToSelect.includes(category) && category !== "") {
        postSubCategory(category);
      }
    });

    getCategories();
  };
  const handleAddSubCategory = (category: string) => {
    if (!subCategories.includes(category)) {
      setSubCategories((prev: any) => [...prev, category]);
      setNewSubCategories((prev: any) => [...prev, category]);
    } else {
      console.log("Category already exists");
    }
  };
  const handleAddSubCategoryValues = () => {
    return subCategoriesToSelect.map((subCategory: any) => (
      <option key={subCategory} value={subCategory}>
        {subCategory}
      </option>
    ));
  };
  return (
    <div className="flex gap-2">
      <div
        className="rounded-full p-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition flex justify-center items-center h-16 w-16 text-3xl cursor-pointer"
        onClick={() => setPage("Categories")}
      >
        <IoMdArrowRoundBack />
      </div>

      <div className="flex flex-col gap-2">
        <input
          type="text"
          className="rounded-md p-3 text-black w-full"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex">
          <input
            type="text"
            placeholder="Create Sub Category"
            className="p-3 px-5 rounded-md w-full text-black"
            onChange={(e) => setSubCategoryName(e.target.value)}
            value={subCategoryName}
            onKeyDown={(e) => {
              if (e.key === "Enter" && subCategoryName !== "") {
                setSubCategoryName("");
                handleAddSubCategory(subCategoryName);
              }
            }}
          />
          <span className="text-white px-5 flex h-full justify-center items-center">
            OR
          </span>
          <select
            className="p-3 px-5 rounded-md text-black w-full"
            onChange={(e: any) => {
              if (e.target.value !== addSubCategoryText) {
                handleAddSubCategory(e.target.value);
              }
            }}
          >
            <option>{addSubCategoryText}</option>
            {handleAddSubCategoryValues()}
          </select>
        </div>{" "}
        <select
          className="p-3 px-5 rounded-md text-black w-full"
          onChange={(e: any) => {
            if (e.target.value !== addSubCategoryText) {
              e.target.value === "Public"
                ? setIsPublic(true)
                : setIsPublic(false);
            }
          }}
        >
          <option>Public</option>
          <option>Private</option>
        </select>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 h-16 disabled:bg-zinc-700 rounded-md transition"
          onClick={() => {
            handleUpdateCategory();
            handleSubmitSubCategories();
            setPage("Categories");
            getCategories();
          }}
        >
          Save Changes
        </button>
      </div>
      <div className="w-64 h-max">
        <div className="text-white flex justify-center items-center bg-blue-600 p-3 rounded-lg rounded-b-none font-extrabold">
          Sub Categories
        </div>
        <div className="bg-white p-3 rounded-b-lg cursor-default flex flex-wrap gap-1">
          {subCategories.length === 0 && (
            <div className="text-center w-full">No sub categories.</div>
          )}
          {handleRenderSubCategories()}
        </div>
      </div>
    </div>
  );
}

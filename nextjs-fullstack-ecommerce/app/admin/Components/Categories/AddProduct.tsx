import { supabase } from "@/app/lib/supabase";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack, IoMdCloseCircle } from "react-icons/io";

export default function AddProduct({ setPage, getProducts }: any) {
  const [isPublic, setIsPublic] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const addSubCategoryText = "Add Sub Category";
  const [subCategoriesToSelect, setSubCategoriesToSelect] = useState<any>([]);
  const [newSubCategories, setNewSubCategories] = useState<any>([]);
  const [subCategories, setSubCategories] = useState<any>([]);
  const [subCategoryName, setSubCategoryName] = useState<string>("");

  const getSubCategories = async () => {
    const { data, error } = await supabase.from("sub_categories").select("*");

    if (error) return console.log(error);

    const uniqueCategories = new Set(data.map((item: any) => item.name));
    setSubCategoriesToSelect(Array.from(uniqueCategories));
  };
  const postSubCategory = async (name: any) => {
    const { data, error } = await supabase
      .from("sub_categories")
      .insert([{ name: name }]);

    if (error) return console.log(error);
    if (data) console.log(data);
  };
  const postProduct = async () => {
    const { data, error } = await supabase.from("products").insert([
      {
        name: productName,
        price,
        is_public: isPublic,
        sub_categories: subCategories,
      },
    ]);

    if (error) return console.log(error);
    if (data) console.log(data);
  };
  const preventFormSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const handleAddSubCategoryValues = () => {
    return subCategoriesToSelect.map((subCategory: any) => (
      <option key={subCategory} value={subCategory}>
        {subCategory}
      </option>
    ));
  };
  const handleAddSubCategory = (category: string) => {
    if (!subCategories.includes(category)) {
      setSubCategories((prev: any) => [...prev, category]);
      setNewSubCategories((prev: any) => [...prev, category]);
    } else {
      console.log("Category already exists");
    }
  };
  const handleSubmitSubCategories = () => {
    console.log(subCategories, newSubCategories);

    newSubCategories.map((category: string) => {
      if (!subCategoriesToSelect.includes(category) && category !== "") {
        postSubCategory(category);
      }
    });
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
  useEffect(() => {
    getSubCategories();
  }, []);
  return (
    <div className="flex flex-col gap-3 text-black">
      <div className="text-3xl text-white font-extrabold flex items-center gap-3">
        <div
          className="rounded-full p-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition flex justify-center items-center cursor-pointer"
          onClick={() => setPage("")}
        >
          <IoMdArrowRoundBack />
        </div>
        <div>Create Product</div>
      </div>
      <div className="flex gap-3">
        <form
          className="flex gap-3 w-full"
          onSubmit={(e: any) => {
            e.preventDefault();
            postProduct();
            handleSubmitSubCategories();
            setPage("");
            getProducts();
          }}
        >
          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              placeholder="Product Name"
              className="p-3 px-5 rounded-md"
              required
              onChange={(e: any) => setProductName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              className="p-3 px-5 rounded-md"
              min={0}
              required
              onChange={(e: any) => setPrice(e.target.value)}
            />
            <div className="flex">
              <input
                type="text"
                placeholder="Create Sub Category"
                className="p-3 px-5 rounded-md w-full"
                onChange={(e) => setSubCategoryName(e.target.value)}
                value={subCategoryName}
                onKeyDown={(e) => {
                  preventFormSubmit(e);
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
            </div>
            <select
              className="p-3 px-5 rounded-md text-black w-full"
              onChange={(e: any) => {
                e.target.value === "Public"
                  ? setIsPublic(true)
                  : setIsPublic(false);
              }}
            >
              <option>Public</option>
              <option>Private</option>
            </select>
            <button
              className="text-white bg-green-500 p-3 w-full h-12 rounded-lg border-b-[3px] border-b-green-600 active:border-b-0 active:bg-green-700 hover:bg-green-600 hover:border-green-700 transition"
              onClick={() => {}}
            >
              Create
            </button>
          </div>
          <div className="w-96 h-max">
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
        </form>
      </div>
    </div>
  );
}

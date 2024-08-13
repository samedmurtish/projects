import { supabase } from "@/app/lib/supabase";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack, IoMdCloseCircle } from "react-icons/io";

export default function EditProduct({
  product,
  setPage,
  getProducts,
  getValidSubCategories,
}: any) {
  const [isPublic, setIsPublic] = useState(true);
  const [productName, setProductName] = useState(product.name);
  const [price, setPrice] = useState(product.price);

  const [subCategories, setSubCategories] = useState(
    Array.isArray(product.sub_categories) ? [...product.sub_categories] : []
  );
  const addSubCategoryText = "Add Sub Category";

  const [subCategoriesToSelect, setSubCategoriesToSelect] = useState<any>([]);
  const [newSubCategories, setNewSubCategories] = useState<any>([]);

  const [subCategoryName, setSubCategoryName] = useState<string>("");
  useEffect(() => {
    getSubCategories();
  }, []);

  const getSubCategories = async () => {
    const { data, error } = await supabase.from("sub_categories").select("*");

    if (error) return console.log(error);

    const uniqueCategories = new Set(data.map((item: any) => item.name));
    setSubCategoriesToSelect(Array.from(uniqueCategories));
  };
  const handleUpdateProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .update({
        name: productName,
        price,
        sub_categories: subCategories,
        is_public: isPublic,
      })
      .eq("id", product.id);
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
  const preventFormSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="text-3xl text-white font-extrabold flex items-center gap-3">
        <div
          className="rounded-full p-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition flex justify-center items-center cursor-pointer"
          onClick={() => setPage("")}
        >
          <IoMdArrowRoundBack />
        </div>
        <div>Edit Product</div>
      </div>
      <form
        className="flex gap-3 text-black"
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateProduct();
          handleSubmitSubCategories();
          setPage("");

          getValidSubCategories();
          getProducts();
        }}
      >
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder={product.name}
            onChange={(e) => setProductName(e.target.value)}
            className="p-3 px-5 rounded-lg"
          />
          <input
            type="number"
            min={0}
            placeholder={product.price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 px-5 rounded-lg"
          />
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="Create Sub Category"
              className="p-3 px-5 rounded-md w-full text-black"
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
            className="p-3 px-5 rounded-lg"
            onChange={(e) =>
              setIsPublic(e.target.value == "Public" ? true : false)
            }
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>{" "}
          <button className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 h-16 disabled:bg-zinc-700 rounded-md transition text-white">
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
      </form>
    </div>
  );
}

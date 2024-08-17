import { supabase } from "@/app/lib/supabase";

import React, { useEffect, useState } from "react";

import { IoMdArrowRoundBack, IoMdCloseCircle } from "react-icons/io";

export default function EditSubCategory({ product, setPage, update }: any) {
  const [name, setName] = useState(product.name);

  const [subCategoryProducts, setSubCategoryProducts] = useState<any[]>([]);

  const [productsToSelect, setProductsToSelect] = useState<any[]>([]);

  const [newSubCategories, setNewSubCategories] = useState<any[]>([]);

  const [isPublic, setIsPublic] = useState<boolean>(true);

  useEffect(() => {
    getSubCategories(product.id);
    getProducts();
  }, []);

  const getSubCategories = async (id: any) => {
    const { data, error } = await supabase
      .from("sub_categories")
      .select("*")
      .eq("id", id);
    if (error) return console.log(error);
    if (data && data[0]) {
      setSubCategoryProducts(data[0].products || []);
    }
  };

  const getProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) return console.log(error);
    const uniqueCategories = new Set(data.map((item: any) => item.name));
    setProductsToSelect(Array.from(uniqueCategories));
  };

  const handleUpdateCategory = async () => {
    const { error } = await supabase
      .from("sub_categories")
      .update({
        name,
        products: subCategoryProducts,
        is_public: isPublic,
      })
      .eq("id", product.id);

    if (error) {
      console.log(error);
    } else {
      update();
      setPage("");
    }
  };

  const handleRemoveProduct = (category: string) => {
    setSubCategoryProducts(
      subCategoryProducts.filter((subCategory: any) => subCategory !== category)
    );
  };

  const handleRenderProducts = () => {
    return subCategoryProducts.length > 0 ? (
      subCategoryProducts.map((product: any) => (
        <div className="flex h-8" key={product}>
          <div className="bg-blue-500 hover:bg-blue-600 p-1 px-3 pr-2 text-white w-max h-full rounded-lg rounded-r-none flex transition justify-center items-center">
            <div>{product}</div>
          </div>

          <div className="h-full w-[2px] bg-blue-600"></div>

          <div
            className="bg-blue-500 hover:bg-rose-500 text-rose-500 active:bg-rose-600 h-full w-max p-1 px-1 rounded-r-lg transition flex justify-center items-center text-2xl relative"
            onClick={() => {
              handleRemoveProduct(product);
            }}
          >
            <div className="z-[11]">
              <IoMdCloseCircle />
            </div>

            <div className="bg-white w-3 h-3 fixed z-[10]"></div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center w-full">No products.</div>
    );
  };

  const postSubCategory = async (name: any) => {
    const { error } = await supabase

      .from("sub_categories")

      .insert([{ name: name }]);

    if (error) console.log(error);
  };

  const handleSubmitSubCategories = async () => {
    for (const category of newSubCategories) {
      if (!productsToSelect.includes(category) && category !== "") {
        await postSubCategory(category);
      }
    }
  };

  const handleAddSubCategory = (category: string) => {
    if (!subCategoryProducts.includes(category)) {
      setSubCategoryProducts((prev: any) => [...prev, category]);
      setNewSubCategories((prev: any) => [...prev, category]);
    } else {
      console.log("Category already exists");
    }
  };

  const handleAddSubCategoryValues = () => {
    return productsToSelect.map((subCategory: any) => (
      <option key={subCategory} value={subCategory}>
        {subCategory}
      </option>
    ));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-3xl text-white font-extrabold flex items-center gap-3">
        <div
          className="rounded-full p-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition flex justify-center items-center cursor-pointer"
          onClick={() => setPage("")}
        >
          <IoMdArrowRoundBack />
        </div>
        <div>Edit Sub Category</div>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            className="rounded-md p-3 text-black w-full"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="p-3 px-5 rounded-md text-black w-full"
            onChange={(e: any) => {
              if (e.target.value !== "Add Products") {
                handleAddSubCategory(e.target.value);
              }
            }}
          >
            <option>Add Products</option>
            {handleAddSubCategoryValues()}
          </select>
          <select
            className="p-3 px-5 rounded-md text-black w-full"
            onChange={(e: any) => {
              setIsPublic(e.target.value === "Public");
            }}
          >
            <option>Public</option>
            <option>Private</option>
          </select>
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 h-16 disabled:bg-zinc-700 rounded-md transition"
            onClick={() => {
              update();
              handleUpdateCategory();
              handleSubmitSubCategories();
              setPage("");
            }}
          >
            Save Changes
          </button>
        </div>
        <div className="w-96 h-max">
          <div className="text-white flex justify-center items-center bg-blue-600 p-3 rounded-lg rounded-b-none font-extrabold">
            Products
          </div>
          <div className="bg-white p-3 rounded-b-lg cursor-default flex flex-wrap gap-1">
            {handleRenderProducts()}
          </div>
        </div>
      </div>
    </div>
  );
}

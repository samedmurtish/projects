import { supabase } from "@/app/lib/supabase";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import EditSubCategory from "../EditSubCategory";

export default function SubCategories({ setPage, pageName }: any) {
  const [subCategories, setSubCategories] = useState<any>([]);

  const [defaultData, setDefaultData] = useState<any>([]);

  const [newSubCategoryName, setNewSubCategoryName] = useState<string>("");

  const [canSave, setCanSave] = useState<boolean>(false);

  const [subCategoryProducts, setSubCategoryProducts] = useState<any>([]);

  const [newProducts, setNewProducts] = useState<any>([]);

  const addProductText = "Add Product";

  const [subCategoriesPageName, setSubCategoriesPageName] =
    useState<string>("");

  const [selectedProduct, setSelectedProduct] = useState<any>({});

  const getSubCategories = async () => {
    const { data, error } = await supabase
      .from("sub_categories")
      .select("*")
      .order("created_at");
    if (error) return console.log(error);
    const uniqueCategories = new Set(data.map((item: any) => item.name));

    setSubCategories(Array.from(uniqueCategories));
    setDefaultData(Array.from(uniqueCategories));
    setSubCategoryProducts(data);
  };

  useEffect(() => {
    getSubCategories();
  }, []);

  const handleRemoveSubCategory = async (category: any) => {
    const filteredList = subCategoryProducts.filter(
      (prev: any) => prev.id !== category.id
    );
    setSubCategoryProducts(filteredList);

    const { data, error } = await supabase
      .from("sub_categories")
      .delete()
      .eq("name", category.name);
    if (error) return console.log(error);
    if (data) console.log(data);
  };

  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement>,
    oldCategory: string
  ) => {
    const newCategory = event.target.value;
    const updatedArray = subCategories.map((item: string) =>
      item === oldCategory ? newCategory : item
    );
    setSubCategories(updatedArray);
  };

  const updateSubCategories = async (name: any, prevName: any) => {
    console.log(name, prevName);
    const { data, error } = await supabase
      .from("sub_categories")
      .update([{ name: name, products: newProducts }])
      .eq("name", prevName);

    if (error) return console.log(error);
    if (data) console.log(data);
    getSubCategories();
  };

  const handleRenderProducts = (productIndex: any) => {
    if (subCategoryProducts[productIndex].products === null) return;
    console.log(subCategoryProducts);
    return subCategoryProducts.map((category: any, categoryIndex: number) => {
      return (
        categoryIndex == productIndex &&
        category.products.map((product: any) => <div>{product}</div>)
      );
    });
  };

  const handleSubmitSubCategories = () => {
    subCategories.map((category: string, index: number) => {
      if (!defaultData.includes(category) && category !== "") {
        updateSubCategories(category, defaultData[index]);
      }
    });
  };

  const handleRenderTable = () => {
    return (
      <table className="bg-zinc-900">
        <thead>
          <tr className="border-b-2 border-b-zinc-700 bg-zinc-800">
            <th className="p-5 font-normal">ID</th>
            <th className="p-5 font-normal">Name</th>
            <th className="p-5 font-normal">Products</th>
            <th className="px-10 font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subCategoryProducts.map((category: any, index: number) => (
            <tr key={index}>
              <th
                className="font-normal"
                style={{
                  paddingTop: index === 0 ? "20px" : "0px",
                  paddingBottom:
                    index === subCategories.length - 1 ? "20px" : "8px",
                }}
              >
                {index}
              </th>
              <th
                className="px-10 font-normal"
                style={{
                  paddingTop: index === 0 ? "20px" : "0px",
                  paddingBottom:
                    index === subCategories.length - 1 ? "20px" : "8px",
                }}
              >
                <div className="w-[150px] overflow-hidden overflow-y-auto flex flex-col resize border-b-2 border-b-zinc-700 justify-center max-w-[300px] max-h-[100px] text-wrap flex-wrap text-ellipsis overflow-x-auto min-h-12">
                  {category.name}
                </div>
              </th>
              <th>
                <div className="flex gap-3">
                  <div className="w-[200px] h-10 overflow-hidden overflow-y-auto flex flex-col resize border-b-2 border-b-zinc-700 justify-center max-w-[300px] max-h-[200px] min-h-12 text-white">
                    {category.products !== null &&
                      category.products &&
                      category.products.map((data: any, index: number) => (
                        <div
                          key={index}
                          className="w-32 h-5 text-nowrap text-ellipsis flex"
                        >
                          {data}
                          {index >= category.products.length - 1 ? "" : ", "}
                        </div>
                      ))}
                  </div>
                </div>
              </th>
              <th
                className="w-64 h-full gap-2 px-5 font-normal"
                style={{
                  paddingTop: index === 0 ? "20px" : "0px",
                  paddingBottom:
                    index === subCategories.length - 1 ? "20px" : "8px",
                }}
              >
                <div className="flex gap-2">
                  <button
                    className="w-full h-full bg-blue-500 py-2 rounded-md hover:rounded-lg hover:bg-blue-600 transition px-2 active:bg-blue-700"
                    onClick={() => {
                      setSelectedProduct(category);
                      setSubCategoriesPageName("Edit Category");
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="w-full h-full bg-rose-500 py-2 rounded-md hover:rounded-lg hover:bg-rose-600 transition px-2 active:bg-rose-700"
                    onClick={() => {
                      handleRemoveSubCategory(category);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  const handleCreateSubCategory = async (name: string) => {
    const { data, error } = await supabase.from("sub_categories").insert({
      name,
    });
    if (error) return console.log(error);
    if (data) console.log(data);
    getSubCategories();
  };

  return (
    <>
      {subCategoriesPageName == "" ? (
        <div className="flex flex-col gap-5 h-full justify-center items-center">
          <div className="flex justify-start items-center w-full">
            {!pageName ? (
              <div className="text-3xl text-white font-extrabold flex items-center gap-3">
                <div
                  className="rounded-full p-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition flex justify-center items-center cursor-pointer"
                  onClick={() => setPage("Categories")}
                >
                  <IoMdArrowRoundBack />
                </div>
                <div>Sub Categories</div>
              </div>
            ) : (
              <div className="text-3xl text-white font-extrabold flex items-center gap-3">
                <div>Sub Categories</div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {subCategories.length === 0 ? (
              <div className="flex flex-col gap-5 justify-center items-center">
                <p>No Sub Categories to display do you want to create one?</p>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Sub Category Name"
                    className="p-3 px-5 rounded-md bg-zinc-800 text-white w-full"
                    onChange={(e) => setNewSubCategoryName(e.target.value)}
                  />
                  <button
                    className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 h-12 disabled:bg-zinc-700 rounded-md transition"
                    onClick={() => handleCreateSubCategory(newSubCategoryName)}
                  >
                    Create
                  </button>
                </div>
              </div>
            ) : (
              <>{handleRenderTable()}</>
            )}
          </div>
        </div>
      ) : (
        subCategoriesPageName == "Edit Category" && (
          <EditSubCategory
            product={selectedProduct}
            setPage={setSubCategoriesPageName}
          />
        )
      )}
    </>
  );
}

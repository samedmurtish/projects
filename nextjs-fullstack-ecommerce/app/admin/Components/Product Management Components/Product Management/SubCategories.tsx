import { supabase } from "@/app/lib/supabase";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import EditSubCategory from "../EditSubCategory";

export default function SubCategories({ setPage, pageName }: any) {
  const [subCategories, setSubCategories] = useState<any>([]);

  const [newSubCategoryName, setNewSubCategoryName] = useState<string>("");

  const [subCategoryProducts, setSubCategoryProducts] = useState<any>([]);

  const [subCategoriesPageName, setSubCategoriesPageName] =
    useState<string>("");

  const [selectedProduct, setSelectedProduct] = useState<any>({});

  const getSubCategories = async () => {
    const { data, error } = await supabase
      .from("sub_categories")
      .select("*")
      .order("products");
    if (error) return console.log(error);
    const uniqueCategories = new Set(data.map((item: any) => item.name));

    console.log("updated");

    setSubCategories(Array.from(uniqueCategories));
    setSubCategoryProducts(data);
  };

  useEffect(() => {
    getSubCategories();
  }, []);

  useEffect(() => {
    getSubCategories();
  }, [pageName]);

  const handleRemoveSubCategory = async (category: any) => {
    const filteredList = subCategoryProducts.filter(
      (prev: any) => prev.id !== category.id
    );
    setSubCategoryProducts(filteredList);

    const { data, error } = await supabase
      .from("sub_categories")
      .delete()
      .eq("id", category.id);
    if (error) return console.log(error);
    if (data) console.log(data);

    getSubCategories();
  };

  const handleRenderTable = () => {
    return (
      <div className="table-container overflow-y-auto max-h-96">
        <table className="bg-zinc-900">
          <thead>
            <tr className="border-b-2 border-b-zinc-700 bg-zinc-800">
              <th className="p-5 font-normal">Visibility</th>
              <th className="p-5 font-normal">ID</th>
              <th className="p-5 font-normal">Name</th>
              <th className="p-5 font-normal">Products</th>
              <th className="px-10 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subCategoryProducts.map((category: any, index: number) => (
              <tr key={index}>
                <th>
                  <div
                    className="w-full h-full flex justify-center items-center"
                    title={category.is_public ? "Public" : "Private"}
                    style={{
                      paddingTop: index === 0 ? "20px" : "0px",
                      paddingBottom:
                        index === subCategories.length - 1 ? "20px" : "8px",
                    }}
                  >
                    <div
                      className="w-3 h-3 bg-green-500 rounded-full flex justify-center items-center"
                      style={{
                        backgroundColor: category.is_public
                          ? "rgb(74 222 128)"
                          : "rgb(244 63 94)",
                      }}
                    />
                  </div>
                </th>
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
                  <div className="w-[150px] overflow-hidden overflow-y-auto flex flex-col resize border-b-2 border-b-zinc-700 justify-center max-w-[300px] max-h-[100px] text-wrap flex-wrap text-ellipsis overflow-x-auto min-h-12 h-12">
                    {category.name}
                  </div>
                </th>
                <th>
                  <div className="flex gap-3">
                    <div className="w-[200px] h-12 overflow-hidden overflow-y-auto flex flex-col resize border-b-2 border-b-zinc-700 justify-center max-w-[300px] max-h-[200px] min-h-12 text-white">
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
      </div>
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
              <div className="flex flex-col gap-5 justify-center items-center bg-zinc-900 p-10 rounded-lg">
                <p>No Sub Categories to display. Do you want to create one?</p>
              </div>
            ) : (
              <>{handleRenderTable()}</>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newSubCategoryName) return;
                handleCreateSubCategory(newSubCategoryName);
                setNewSubCategoryName("");
              }}
              className="flex flex-col gap-2"
            >
              <input
                type="text"
                placeholder="Sub Category Name"
                className="p-3 px-5 rounded-md bg-zinc-800 text-white w-full"
                value={newSubCategoryName}
                onChange={(e) => setNewSubCategoryName(e.target.value)}
                required
              />
              <button className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 h-12 disabled:bg-zinc-700 rounded-md transition">
                Create
              </button>
            </form>
          </div>
        </div>
      ) : (
        subCategoriesPageName == "Edit Category" && (
          <EditSubCategory
            product={selectedProduct}
            setPage={setSubCategoriesPageName}
            update={getSubCategories}
          />
        )
      )}
    </>
  );
}

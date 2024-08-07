import { supabase } from "@/app/lib/supabase";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function EditSubCategories({ setPage }: any) {
  const [subCategories, setSubCategories] = useState<any>([]);

  const [defaultData, setDefaultData] = useState<any>([]);

  const [newSubCategoryName, setNewSubCategoryName] = useState<string>("");

  const [canSave, setCanSave] = useState<boolean>(false);

  const getSubCategories = async () => {
    const { data, error } = await supabase
      .from("sub_categories")
      .select("*")
      .order("created_at");
    if (error) return console.log(error);
    const uniqueCategories = new Set(data.map((item: any) => item.name));
    setSubCategories(Array.from(uniqueCategories));
    setDefaultData(Array.from(uniqueCategories));
  };

  useEffect(() => {
    getSubCategories();
  }, []);

  const handleRemoveSubCategory = async (category: string) => {
    setSubCategories(
      subCategories.filter((subCategory: any) => subCategory !== category)
    );

    const { data, error } = await supabase
      .from("sub_categories")
      .delete()
      .eq("name", category);
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
      .update([{ name: name }])
      .eq("name", prevName);
    if (error) return console.log(error);
    if (data) console.log(data);
    getSubCategories();
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
            <th className="px-10 font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subCategories.map((category: any, index: number) => (
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
                <input
                  type="text"
                  name={category}
                  placeholder={defaultData[index]}
                  className="p-3 rounded-md bg-zinc-800 text-white"
                  onChange={(e) => {
                    handleChangeName(e, category);
                    setCanSave(true);
                  }}
                />
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
                    className="w-full h-full bg-rose-500 py-2 rounded-md hover:rounded-lg hover:bg-rose-600 transition px-2 active:bg-rose-700"
                    onClick={() => handleRemoveSubCategory(category)}
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
    <div className="flex gap-5">
      <div
        className="rounded-full p-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition flex justify-center items-center h-16 w-16 text-3xl"
        onClick={() => setPage("Categories")}
      >
        <IoMdArrowRoundBack />
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
          <>
            {handleRenderTable()}
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 h-16 disabled:bg-zinc-700 rounded-md transition"
              onClick={() => handleSubmitSubCategories()}
              disabled={!canSave}
            >
              Save Changes
            </button>
          </>
        )}
      </div>
    </div>
  );
}

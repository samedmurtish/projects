import { supabase } from "@/app/lib/supabase";
import React, { useEffect, useState } from "react";
import { DiJava } from "react-icons/di";
import AddCategory from "../AddCategory";
import EditSubCategories from "../EditSubCategories";
import EditCategory from "../EditCategory";

export default function Categories() {
  const [categories, setCategories] = React.useState<any>([]);
  const [page, setPage] = useState("Categories");
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const deleteCategory = async (id: string) => {
    const { data, error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);
    if (error) return console.log(error);

    const filteredList = categories.filter(
      (category: any) => category.id !== id
    );
    setCategories(filteredList);
    if (data) console.log(data);
  };

  const getCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) return console.log(error);
    setCategories(data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleUpdateCategories = () => {
    return (
      <table className="bg-zinc-900">
        <thead>
          <tr className="border-b-2 border-b-zinc-700 bg-zinc-800">
            <th className="p-5 font-normal">Visibility</th>
            <th className="p-5 font-normal">ID</th>
            <th className="p-5 font-normal">Name</th>
            <th className="p-5 font-normal">Sub Categories</th>
            <th className="px-10 font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: any, index: number) => (
            <tr key={category.id}>
              <th>
                <div
                  className="w-full h-full flex justify-center items-center"
                  title={category.is_public ? "Public" : "Private"}
                  style={{
                    paddingTop: index === 0 ? "20px" : "0px",
                    paddingBottom:
                      index === categories.length - 1 ? "20px" : "8px",
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
                    index === categories.length - 1 ? "20px" : "8px",
                }}
              >
                {index}
              </th>
              <th
                className="px-10 font-normal"
                style={{
                  paddingTop: index === 0 ? "20px" : "0px",
                  paddingBottom:
                    index === categories.length - 1 ? "20px" : "8px",
                }}
              >
                {category.name}
              </th>
              <th
                className="gap-1 "
                style={{
                  paddingTop: index === 0 ? "20px" : "0px",
                  paddingBottom:
                    index === categories.length - 1 ? "20px" : "8px",
                }}
              >
                <div className="h-10 overflow-hidden overflow-y-auto flex flex-col resize border-b-2 border-b-zinc-700 justify-center max-w-[300px] max-h-[200px]">
                  {category.sub_categories &&
                    category.sub_categories.map((data: any, index: number) => (
                      <div
                        key={index}
                        className="w-32 h-5 text-nowrap text-ellipsis flex"
                      >
                        {data}
                        {index >= category.sub_categories.length - 1
                          ? ""
                          : ", "}
                      </div>
                    ))}
                </div>
              </th>
              <th
                className="w-64 h-full gap-2 px-5 font-normal"
                style={{
                  paddingTop: index === 0 ? "20px" : "0px",
                  paddingBottom:
                    index === categories.length - 1 ? "20px" : "8px",
                }}
              >
                <div className="flex gap-2">
                  <button
                    className="w-full h-full bg-blue-500 py-2 rounded-md hover:rounded-lg hover:bg-blue-600 transition px-2 active:bg-blue-700"
                    onClick={() => {
                      setPage("Edit Category");
                      setSelectedCategory(category);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="w-full h-full bg-rose-500 py-2 rounded-md hover:rounded-lg hover:bg-rose-600 transition px-2 active:bg-rose-700"
                    onClick={() => deleteCategory(category.id)}
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

  const handleButtons = (isEmpty: any) => {
    return (
      <div
        className="flex gap-3	"
        style={{ flexDirection: !isEmpty ? "column" : "row" }}
      >
        <button
          className="w-40 h-16 p-5 rounded-lg bg-blue-500 flex justify-center items-center cursor-pointer hover:bg-blue-600 transition active:bg-blue-700 text-white"
          onClick={() => setPage("Add Category")}
        >
          Create <br />
          Category
        </button>
        <button
          className="w-40 h-16 p-5 rounded-lg bg-purple-500 flex justify-center items-center cursor-pointer hover:bg-purple-600 transition active:bg-purple-700 text-white"
          onClick={() => {
            setPage("Edit Sub Categories");
          }}
        >
          Edit <br />
          Sub Categories
        </button>
        <button
          className="w-40 h-16 p-5 rounded-lg bg-green-500 flex justify-center items-center cursor-pointer hover:bg-green-600 transition active:bg-green-700 text-white"
          onClick={() => {
            getCategories();
          }}
        >
          Update
        </button>
      </div>
    );
  };
  return (
    <div className="h-screen flex justify-center items-center">
      {page == "Categories" ? (
        <div
          className="flex justify-center items-center flex-col gap-10"
          style={{ flexDirection: categories.length != 0 ? "row" : "column" }}
        >
          {categories.length != 0 ? (
            <>
              {handleButtons(false)}
              {handleUpdateCategories()}
            </>
          ) : (
            <>
              <div>It seems like there is not any categories !.</div>
              {handleButtons(true)}
            </>
          )}
        </div>
      ) : (
        (page == "Add Category" && (
          <AddCategory setPage={setPage} updateCategories={getCategories} />
        )) ||
        (page == "Edit Sub Categories" && (
          <EditSubCategories setPage={setPage} />
        )) ||
        (page == "Edit Category" && (
          <EditCategory setPage={setPage} category={selectedCategory} />
        ))
      )}
    </div>
  );
}

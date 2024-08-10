import { supabase } from "@/app/lib/supabase";
import React, { useEffect, useState } from "react";
import { DiJava } from "react-icons/di";
import AddCategory from "../AddCategory";
import SubCategories from "./SubCategories";
import EditCategory from "../EditCategory";

export default function Categories({
  setPageName,
  updatedSubCategoryList,
}: any) {
  const [categories, setCategories] = React.useState<any>([]);
  const [page, setPage] = useState("Categories");
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const [subCategories, setSubCategories] = useState<any>([{}]);

  useEffect(() => {
    // console.log(updatedSubCategoryList);
    // console.log(subCategories);
    //updateSubCategories();
  }, []);
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
  useEffect(() => {
    getCategories();
  }, [page]);
  useEffect(() => {
    updateSubCategories();
  }, []);

  const updateSubCategories = () => {
    const filteredList = categories.map((category: any) => {
      console.log(category);
      category.sub_categories.filter((name: any) =>
        updatedSubCategoryList.includes(name)
      );
    });

    console.log(filteredList);

    // const { data, error } = await supabase
    //   .from("categories")
    //   .update([{ sub_categories: subCategories.list }])
    //   .eq("id", subCategories.id);

    // if (error) console.log(error);
    // if (data) console.log(data);
  };

  const handleRenderSubCategories = (subCategories: any, id: any) => {
    const filteredList = subCategories.filter((name: any) =>
      updatedSubCategoryList.includes(name)
    );
    //setSubCategories((prev: any) => [...prev, { id: id, list: filteredList }]);

    return (
      <div className="w-32 h-5 text-nowrap text-ellipsis flex">
        {filteredList.map((data: any, index: number) => (
          <span key={index}>
            {data}
            {index >= filteredList.length - 1 ? (
              ""
            ) : (
              <>
                , <span className="ml-1" />
              </>
            )}
          </span>
        ))}
      </div>
    );
  };
  const handleRenderCategories = () => {
    return (
      <div className="table-container overflow-y-auto max-h-96">
        <table className="bg-zinc-900 w-full">
          <thead className="sticky top-0">
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
                  <div className="w-[150px] overflow-hidden overflow-y-auto flex flex-col resize border-b-2 border-b-zinc-700 justify-center max-w-[300px] max-h-[100px] text-wrap flex-wrap text-ellipsis overflow-x-auto min-h-12">
                    {category.name}
                  </div>
                </th>
                <th
                  className="gap-1"
                  style={{
                    paddingTop: index === 0 ? "20px" : "0px",
                    paddingBottom:
                      index === categories.length - 1 ? "20px" : "8px",
                  }}
                >
                  <div className="w-[200px] h-10 overflow-hidden overflow-y-auto flex flex-col resize border-b-2 border-b-zinc-700 justify-center max-w-[300px] max-h-[200px] min-h-12">
                    {category.sub_categories &&
                      handleRenderSubCategories(
                        category.sub_categories,
                        category.id
                      )}
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
      </div>
    );
  };

  const handleButtons = (isEmpty: any) => {
    return (
      <div className="flex gap-3	">
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
            setPage("Sub Categories");
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
        <div className="flex justify-center items-center flex-col gap-10">
          {categories.length != 0 ? (
            <>
              {handleRenderCategories()}
              {handleButtons(false)}
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
        (page == "Sub Categories" && <SubCategories setPage={setPage} />) ||
        (page == "Edit Category" && (
          <EditCategory
            setPage={setPage}
            category={selectedCategory}
            getCategories={getCategories}
          />
        ))
      )}
    </div>
  );
}

import { supabase } from "@/app/lib/supabase";
import React, { useEffect } from "react";
import { DiJava } from "react-icons/di";

export default function Categories() {
  const [categories, setCategories] = React.useState<any>([]);
  const getCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) return console.log(error);
    setCategories(data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleUpdateCategories = () => {
    return categories.map((category: any) => (
      <div key={category.id}>
        <table className="bg-zinc-900">
          <thead>
            <tr className="border-b-2 border-b-zinc-700 bg-zinc-800">
              <th className="p-5 font-normal">ID</th>
              <th className="p-5 font-normal">Name</th>
              <th className="px-10 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: any, index: number) => (
              <tr key={category.id}>
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
                  className="w-64 h-full gap-2 px-5 font-normal flex"
                  style={{
                    paddingTop: index === 0 ? "20px" : "0px",
                    paddingBottom:
                      index === categories.length - 1 ? "20px" : "8px",
                  }}
                >
                  <button className="w-full h-full bg-blue-500 py-2 rounded-md hover:rounded-lg hover:bg-blue-600 transition active:bg-blue-700">
                    Edit
                  </button>{" "}
                  <button className="w-full h-full bg-rose-500 py-2 rounded-md hover:rounded-lg hover:bg-rose-600 transition active:bg-rose-700">
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ));
  };

  const handleAddCategory = () => {
    return (
      <div className="w-40 h-16 p-5 rounded-lg bg-blue-500 flex justify-center items-center cursor-pointer hover:bg-blue-600 transition active:bg-blue-700 text-white">
        Add Category
      </div>
    );
  };
  return (
    <div
      className="flex h-screen justify-center items-center flex-col gap-10"
      style={{ flexDirection: categories.length != 0 ? "row" : "column" }}
    >
      {categories.length != 0 ? (
        <>
          {handleAddCategory()}
          {handleUpdateCategories()}
        </>
      ) : (
        <>
          <div>It seems like there is not any categories !.</div>
          {handleAddCategory()}
        </>
      )}
    </div>
  );
}

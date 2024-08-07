import { supabase } from "@/app/lib/supabase";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function EditCategory({ setPage, category }: any) {
  const [name, setName] = React.useState(category.name);
  const [subCategories, setSubCategories] = React.useState([
    ...category.sub_categories,
  ]);

  console.log(name, subCategories);

  const handleUpdateCategory = async () => {
    const { data, error } = await supabase
      .from("categories")
      .update({ name: category.name })
      .eq("id", category.id);
    if (error) console.log(error);
    if (data) console.log(data);
  };
  return (
    <div>
      <div
        className="rounded-full p-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition flex justify-center items-center h-16 w-16 text-3xl"
        onClick={() => setPage("Categories")}
      >
        <IoMdArrowRoundBack />
      </div>
    </div>
  );
}

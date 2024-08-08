import { supabase } from "@/app/lib/supabase";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function AddProduct({ setPage }: any) {
  const [isPublic, setIsPublic] = React.useState(false);
  const [productName, setProductName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const postProduct = async () => {
    const { data, error } = await supabase.from("products").insert([
      {
        name: productName,
        price,
        is_public: isPublic,
      },
    ]);
    if (error) return console.log(error);
    if (data) console.log(data);
  };

  return (
    <div className="flex flex-col gap-3 text-black">
      <div className="text-3xl text-white font-extrabold flex items-center gap-3">
        <div
          className="rounded-full p-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition flex justify-center items-center cursor-pointer"
          onClick={() => setPage("Categories")}
        >
          <IoMdArrowRoundBack />
        </div>
        <div>Create Product</div>
      </div>
      <div className="flex gap-3">
        <form
          className="flex flex-col gap-3 w-full"
          onSubmit={(e: any) => {
            e.preventDefault();
            postProduct();
            setPage("");
          }}
        >
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
            required
            onChange={(e: any) => setPrice(e.target.value)}
          />

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
        </form>
      </div>
    </div>
  );
}

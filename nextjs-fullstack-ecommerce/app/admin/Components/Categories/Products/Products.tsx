import { supabase } from "@/app/lib/supabase";
import React, { useEffect, useState } from "react";
import image from "../../../../../images/register.jpg";
import AddProduct from "../AddProduct";
export default function Products() {
  const [products, setProducts] = useState<any>([]);
  const [page, setPage] = useState<string>("");

  const getProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) return console.log(error);
    setProducts(data);
    console.log(data);
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleRenderProducts = () => {
    return products.map((product: any) => (
      <div key={product.id} className="flex select-none w-full">
        <div className="relative w-52 h-64 bg-white rounded-lg text-white font-bold text-3xl overflow-hidden rounded-br-none select-none">
          <div className="relative z-10 flex justify-center items-center w-full h-full bg-opacity-50 hover:bg-opacity-30 bg-black flex-col transition "></div>
          <div className="absolute inset-0 z-0">
            <img
              src={image.src}
              className="w-full h-full object-cover"
              alt="Product Image"
            />
          </div>
        </div>{" "}
        <div className="flex justify-between items-center w-full h-full flex-col gap-2 bg-white rounded-tr-lg text-slate-500 rounded-b-lg pt-5 relative">
          <div
            className="absolute right-3 top-3 z-20 bg-rose-500 rounded-full w-3 h-3"
            title={product.is_public ? "Public" : "Private"}
            style={{
              backgroundColor: product.is_public
                ? "rgb(74 222 128)"
                : "rgb(244 63 94)",
            }}
          ></div>
          <div className="text-2xl flex flex-col ">
            <div className="w-52 text-ellipsis text-nowrap overflow-hidden">
              <div className="w-full"></div>
              <span className="">{product.name}</span>
            </div>
            <span className="p-1 px-3 bg-slate-500 hover:bg-slate-600 transition w-max rounded-full text-white text-base font-bold">
              <span className="text-slate-300">$</span> {product.price}
            </span>
          </div>
          <div className="flex w-full text-white">
            <button className="w-full p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition">
              Edit
            </button>
            <button className="w-full p-3 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 transition rounded-br-lg">
              Delete
            </button>
          </div>
        </div>
      </div>
    ));
  };

  const renderAddProduct = () => {
    return (
      <button
        className="w-52 h-64 bg-blue-500 rounded-lg border-[15px] text-white border-blue-600 font-bold text-3xl"
        onClick={() => setPage("Add Product")}
      >
        Add
        <br />
        Product
      </button>
    );
  };

  return (
    <>
      {page == "Add Product" ? (
        <AddProduct setPage={setPage} />
      ) : (
        <div className="flex gap-3 w-full">
          {renderAddProduct()}
          <div className="flex flex-wrap max-w-[900px] max-h-[500px] overflow-hidden overflow-y-auto gap-3">
            {handleRenderProducts()}
          </div>
        </div>
      )}
    </>
  );
}

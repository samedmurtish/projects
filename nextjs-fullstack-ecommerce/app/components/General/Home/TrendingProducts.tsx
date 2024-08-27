import { supabase } from "@/app/lib/supabase";
import React, { useEffect } from "react";

export default function TrendingProducts() {
  const [trendingProducts, setTrendingProducts] = React.useState<any>([]);
  const getTrendingProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) return console.log(error);
    setTrendingProducts(data);
  };

  useEffect(() => {
    getTrendingProducts();
  }, []);
  const renderProductSubCategories = (product: any) => {
    if (product.sub_categories.length <= 0)
      return (
        <div className="text-black w-full h-full flex justify-center items-center">
          No sub categories
        </div>
      );

    return product.sub_categories.map((subCategory: any, index: any) => (
      <span
        className="p-1 px-3 bg-slate-500 hover:bg-slate-600 transition w-max text-nowrap h-max rounded-full text-white text-sm font-bold justify-self-start self-start flex-nowrap flex flex-row"
        key={subCategory + index}
      >
        <span className="text-slate-300">#</span> {subCategory}
      </span>
    ));
  };
  const renderTrendingProducts = () => {
    return trendingProducts.map((product: any) => (
      <div
        key={product.id + product.name}
        className="w-64 h-max bg-white flex justify-around items-center flex-col p-3 select-none rounded-xl"
      >
        <img src={product.thumbnail} className="w-full h-52 object-contain" />
        <div className="py-2 text-2xl">{product.name}</div>
        <div className="px-2 pb-1 h-16 w-full flex mb-2 border-2 border-slate-100 rounded-2xl gap-1 justify-start items-center pt-2 overflow-x-auto flex-nowrap overflow-y-hidden">
          {renderProductSubCategories(product)}
        </div>
        <div className="p-1 pl-3 bg-indigo-400 hover:bg-indigo-500 transition w-full rounded-2xl text-white text-base font-bold flex justify-center items-center">
          <div className="flex justify-center items-center w-1/2 pr-3">
            <div className="text-indigo-200">$</div> {product.price}
          </div>
          <button className="p-1 px-3 bg-white hover:bg-green-400 active:bg-green-500 transition w-full rounded-xl text-slate-600 hover:text-white text-base font-bold h-12 hover:shadow-2xl">
            Add to cart
          </button>
        </div>
        <div className="w-full h-14 flex justify-center items-center bg-white rounded-2xl border-transparent border-2 hover:border-blue-500 cursor-pointer mt-2">
          View Product
        </div>
      </div>
    ));
  };

  return (
    <div className="text-black w-3/4 mx-auto my-0 py-10 flex  flex-col gap-5">
      <h1 className="text-3xl font-semibold ">Trending Products</h1>

      <div className="flex gap-3 overflow-x-auto">
        {renderTrendingProducts()}
      </div>
    </div>
  );
}

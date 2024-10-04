import { supabase, supabaseAdmin } from "@/app/lib/supabase";
import React, { useEffect, useState } from "react";
import image from "../../../../../images/register.jpg";
import AddProduct from "../AddProduct";
import EditProduct from "../EditProduct";

export default function Products() {
  const [products, setProducts] = useState<any>([]);
  const [page, setPage] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<any>({});

  const [productIds, setProductIds] = useState<any>([]);
  const [highestId, setHighestId] = useState<any>(0);

  useEffect(() => {
    getValidSubCategories();
  }, []);

  useEffect(() => {
    setHighestId(Math.max(...productIds));
  }, [productIds]);
  useEffect(() => {
    console.log("highestId", highestId);
  }, [highestId]);
  const getValidSubCategories = async () => {
    const { data, error } = await supabase
      .from("sub_categories")
      .select("name");
    if (error) {
      console.log(error);
      return [];
    }
    return data.map((subCategory: any) => subCategory.name);
  };

  const getProducts = async () => {
    const validSubProducts = await getValidSubCategories();

    const { data, error } = await supabaseAdmin.from("products").select("*");
    if (error) return console.log(error);

    data.map((product: any) => {
      setProductIds((prev: any) => [...prev, product.id]);
    });

    const updatedProducts = data.map((product: any) => {
      const filteredSubProducts = product.sub_categories.filter(
        (subProduct: any) => validSubProducts.includes(subProduct)
      );
      return { ...product, sub_categories: filteredSubProducts };
    });

    updatedProducts.forEach(async (product: any) => {
      const { error } = await supabase
        .from("products")
        .update({ sub_categories: product.sub_categories })
        .eq("id", product.id);

      if (error) return console.log(error);
    });

    setProducts(updatedProducts);
  };
  useEffect(() => {
    getValidSubCategories();
    getProducts();
  }, []);

  useEffect(() => {
    getValidSubCategories();
    getProducts();
  }, [page]);

  const renderProductSubCategories = (product: any) => {
    return product.sub_categories.map((subCategory: any, index: any) => (
      <span
        className="p-1 px-3 bg-slate-500 hover:bg-slate-600 transition w-max rounded-full text-white text-base font-bold justify-self-start self-start"
        key={subCategory + index}
      >
        <span className="text-slate-300">#</span> {subCategory}
      </span>
    ));
  };

  const handleRenderProducts = () => {
    return products.map((product: any) => (
      <div key={product.id} className="flex select-none w-[30rem]">
        <div className="relative min-w-52 w-52 hover:w-64 h-64 bg-white rounded-lg text-white font-bold text-3xl overflow-hidden rounded-r-none select-none transition-width duration-300 ease-out">
          <div className="relative z-10 flex justify-center items-center w-full h-full bg-opacity-50 hover:bg-opacity-30 bg-black flex-col transition duration-300 ease-out"></div>
          <div className="absolute inset-0 z-0">
            <img
              src={product.thumbnail}
              className="w-full h-full object-cover"
              alt="Product Image"
            />
          </div>
        </div>
        <div key={product.id} className="flex select-none max-w-[25rem]">
          <div className="flex justify-between items-center w-full h-full flex-col gap-3 bg-white rounded-tr-lg text-slate-500 rounded-b-lg pt-5 relative">
            <div
              className="absolute right-3 top-3 z-20 bg-rose-500 rounded-full w-3 h-3"
              title={product.is_public ? "Public" : "Private"}
              style={{
                backgroundColor: product.is_public
                  ? "rgb(74 222 128)"
                  : "rgb(244 63 94)",
              }}
            ></div>
            <div className="px-5">
              <div className="text-2xl flex flex-col gap-2">
                <div className="w-52 text-ellipsis text-nowrap overflow-hidden">
                  <div className="w-full"></div>
                  <span>
                    {product.name} #{product.id}
                  </span>
                </div>
                <span className="p-1 px-3 bg-green-400 hover:bg-green-500 transition w-max rounded-full text-white text-base font-bold">
                  <span className="text-green-100">$</span> {product.price}
                </span>
                <div className="flex flex-wrap h-24 overflow-y-auto border-2 border-slate-200 rounded-lg bg-slate-100 justify-start items-center">
                  <div className="text-base sticky top-0 bg-slate-300 h-max w-full p-1 px-3 rounded-lg rounded-t-none text-slate-500 self-start">
                    Sub Categories
                  </div>
                  <div
                    className="p-1 flex flex-wrap gap-1 w-full"
                    style={{ justifySelf: "start", alignSelf: "start" }}
                  >
                    {product.sub_categories != null &&
                    product.sub_categories.length > 0 ? (
                      renderProductSubCategories(product)
                    ) : (
                      <span className="text-base self-center justify-self-center text-center w-full">
                        No Sub Categories found.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full text-white">
              <button
                className="w-full p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition"
                onClick={() => {
                  setSelectedProduct(product);
                  setPage("Edit Product");
                }}
              >
                Edit
              </button>
              <button
                className="w-full p-3 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 transition rounded-br-lg"
                onClick={() => handleDeleteProduct(product.id, product)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const renderAddProduct = () => {
    return (
      <button
        className="p-5 px-7 bg-blue-500 hover:bg-blue-600 active:bg-blue-800  transition rounded-lg text-white font-bold text-xl"
        onClick={() => setPage("Add Product")}
      >
        Add Product
      </button>
    );
  };

  const handleDeleteProduct = async (id: any, product: any) => {
    const fileName = `images/thumbnail_${product.now}`;

    const { error: errorMessage } = await supabase.storage
      .from("product.images")
      .remove([fileName]);

    if (errorMessage) {
      console.log("Error deleting thumbnail:", errorMessage);
    }

    for (let i = 0; i < product.images.length; i++) {
      const fileName = `images/image_${i + 1}_${product.now}`;
      const { data, error } = await supabase.storage
        .from("product.images")
        .remove([fileName]);
      if (error) {
        console.log("Error deleting image ", i + 1, ":", error);
      } else {
        console.log("Image ", i + 1, "deleted successfully");
      }
    }

    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);
    if (error) return console.log(error);
    if (data) console.log(data);

    const filteredList = products.filter((product: any) => product.id !== id);
    setProducts(filteredList);
  };

  return (
    <>
      {page == "Add Product" ? (
        <AddProduct
          setPage={setPage}
          getProducts={getProducts}
          highestId={highestId}
        />
      ) : page == "" ? (
        <div
          className="flex flex-col w-full gap-5"
          style={{ gap: products.length == 0 ? "20px" : "12px" }}
        >
          <div>{renderAddProduct()}</div>
          <div className="flex flex-wrap max-w-[1270px] overflow-hidden overflow-y-auto gap-3 bg-zinc-200 p-5 rounded-lg">
            {products.length > 0 ? (
              <>{handleRenderProducts()}</>
            ) : (
              <div className="w-full h-full flex justify-center items-center text-4xl p-20 text-slate-500 font-bold">
                No products found.
              </div>
            )}
          </div>
        </div>
      ) : (
        page == "Edit Product" && (
          <EditProduct
            product={selectedProduct}
            setPage={setPage}
            getProducts={getProducts}
            getValidSubCategories={getValidSubCategories}
          />
        )
      )}
    </>
  );
}

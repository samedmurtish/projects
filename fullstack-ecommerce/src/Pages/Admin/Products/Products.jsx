import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../../../Database/connection";

function Products({ page, id, name, price }) {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const tempProducts = await getProducts();
      setProducts(tempProducts);
    }

    fetchProducts();
  }, []);

  const handleDelete = async (ProductId) => {
    await deleteProduct(ProductId);
    setProducts(Products.filter((Product) => Product.id !== ProductId));
  };

  const renderProducts = () => {
    return Products.map((value) => (
      <div
        className="w-full bg-slate-300 px-3 py-4 flex justify-between rounded-lg items-center shadow-md items-center text-slate-600"
        key={value.id}
      >
        <div>
          ${value.price} - {value.name}
        </div>
        <div className="flex gap-3">
          <button
            className="bg-blue-400 hover:bg-blue-500 transition text-white font-bold p-2 px-3 rounded-lg hover:shadow-md"
            onClick={() => {
              id(value.id);
              name(value.name);
              price(value.price);
              page("editProduct");
            }}
          >
            Edit
          </button>
          <button
            className="bg-rose-400 hover:bg-rose-500 transition text-white font-bold p-2 px-3 rounded-lg hover:shadow-md"
            onClick={() => {
              handleDelete(value.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="bg-slate-300 rounded-lg p-3 items-center flex justify-between w-full">
          <div>
            <p className="text-xl text-slate-700">Products:</p>
          </div>
          <div>
            <button
              className="bg-green-400 hover:bg-green-500 transition text-white font-bold p-2 px-3 rounded-lg hover:shadow-md"
              onClick={() => page("addProduct")}
            >
              Add Product
            </button>
          </div>
        </div>
        <div className="w-full h-[25rem] rounded-lg gap-2 flex flex-col overflow-hidden overflow-y-auto">
          {Products.length != 0 ? (
            renderProducts()
          ) : (
            <div className="w-full text-center">No Products found.</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;

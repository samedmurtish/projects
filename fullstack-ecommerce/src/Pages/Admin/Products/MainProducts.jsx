import { useEffect, useState } from "react";
import { getProducts } from "../../../Database/connection";
import Products from "./Products";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
function MainProducts() {
  const [currentPage, setCurrentPage] = useState("Products");

  const [selectedProductId, setSelectedProductId] = useState(0);
  const [selectedProductName, setSelectedProductName] = useState(0);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);

  const handleCurrentPage = (page) => {
    setCurrentPage(page == "" ? "Products" : page);
  };

  const selectedProductsId = (id) => {
    setSelectedProductId(id);
  };
  const selectedProductsName = (name) => {
    setSelectedProductName(name);
  };
  const selectedProductsPrice = (price) => {
    setSelectedProductPrice(price);
  };

  return (
    <div className="w-3/4 h-full mx-auto my-0 flex justify-center items-center">
      <div className="w-full h-max max-h-[75%] bg-slate-200 rounded-2xl p-5 ">
        {currentPage == "Products" && (
          <Products
            page={handleCurrentPage}
            id={selectedProductsId}
            name={selectedProductsName}
            price={selectedProductsPrice}
          />
        )}
        {currentPage == "addProduct" && <AddProduct page={handleCurrentPage} />}
        {currentPage == "editProduct" && (
          <EditProduct
            page={handleCurrentPage}
            productId={selectedProductId}
            productName={selectedProductName}
            productPrice={selectedProductPrice}
          />
        )}
      </div>
    </div>
  );
}

export default MainProducts;

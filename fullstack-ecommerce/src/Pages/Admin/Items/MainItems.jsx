import { useEffect, useState } from "react";
import { getItems } from "../../../Database/connection";
import Items from "./Items";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
function MainItems() {
  const [currentPage, setCurrentPage] = useState("items");

  const [selectedProductId, setSelectedProductId] = useState(0);
  const [selectedProductName, setSelectedProductName] = useState(0);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);

  const handleCurrentPage = (page) => {
    setCurrentPage(page == "" ? "items" : page);
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
        {currentPage == "items" && (
          <Items
            page={handleCurrentPage}
            id={selectedProductsId}
            name={selectedProductsName}
            price={selectedProductsPrice}
          />
        )}
        {currentPage == "addItem" && <AddItem page={handleCurrentPage} />}
        {currentPage == "editItem" && (
          <EditItem
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

export default MainItems;

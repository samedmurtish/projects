import React, { useState, useEffect } from "react";
import { getList, updateCart } from "../data/cart";
import SnackbarShow from "../MuiElements/SnackbarShow";
import RedirectIcons from "./NavigationBar/RedirectIcons";

// Define the Cart component
export default function Cart() {
  const [showBar, setShowBar] = useState({
    clicked: false,
    message: "Product added to cart successfully!",
  });

  // Initialize cart state using getList to get the current cart from localStorage
  const [cart, setCart] = useState(getList);
  // Initialize wishlistLength state based on localStorage
  const [wishlistLength, setWishlistLength] = useState(
    localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist")).length
      : 0
  );
  const [total, setTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Calculate total whenever the cart changes
  useEffect(() => {
    const totalValue = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalValue);
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalQuantity(totalQuantity);
  }, [cart]);

  // Function to remove an item from the cart
  const removeFromList = (itemId) => {
    const updatedList = cart.filter((item) => item.id !== itemId);
    setCart(updatedList);
    updateCart(updatedList);
  };

  const handleQuantityChange = (valueIndex, newQuantity) => {
    const updatedCart = cart.map((item, index) =>
      index === valueIndex ? { ...item, quantity: parseInt(newQuantity) } : item
    );
    setCart(updatedCart);
    updateCart(updatedCart);
  };

  const renderCheckoutItems = () => {
    return cart.map((value, valueIndex) => (
      <li
        key={valueIndex}
        className="w-full h-full bg-slate-100 p-1 px-2 flex items-center text-slate-600 font-normal rounded-xl justify-between flex-row shadow-md my-1"
      >
        <div className="w-full h-full flex-row flex items-center justify-between">
          <div className="flex">
            <span className="font-semibold border-r-2 w-10 pl-1">
              {value.quantity}x
            </span>
            <div className="px-1 pl-2" id="product-name">
              {value.title}
            </div>
          </div>
          <div className="font-semibold">
            ${(value.price * value.quantity).toFixed(2)}
          </div>
        </div>
      </li>
    ));
  };

  const handleInput = (e, valueIndex) => {
    const inputValue = parseInt(e.target.value);

    if (isNaN(inputValue)) {
      return handleQuantityChange(valueIndex, 1);
    }
    if (inputValue <= 0) {
      return handleQuantityChange(valueIndex, 1);
    }
    if (inputValue > 99) return handleQuantityChange(valueIndex, 99);
    return handleQuantityChange(valueIndex, inputValue);
  };

  const renderList = () => {
    return cart.map((value, valueIndex) => (
      <li
        key={valueIndex}
        className="w-full h-[80px] bg-slate-100 mb-1 p-3 flex items-center text-slate-600 font-bold rounded-xl justify-between flex-row shadow-md"
      >
        <div className="flex justify-center items-center">
          <div className="pr-3 h-full w-16 flex justify-center items-center">
            <input
              type="number"
              name={"quantity-" + value.id}
              min={1}
              max={99}
              value={value.quantity}
              className="w-full flex justify-center items-center text-center font-normal"
              onChange={(e) => handleInput(e, valueIndex)}
            />
          </div>
          <span className="font-normal">X</span>
          <img src={value.thumbnail} alt={value.title} className="h-12 w-20" />
        </div>
        <div className="flex w-full h-full justify-between items-center text-ellipsis truncate">
          <p className="w-max text-ellipsis font-normal truncate pr-2">
            <span className="font-semibold">${value.price.toFixed(2)}</span> -{" "}
            {value.title}
          </p>

          <div
            className="h-full w-max bg-slate-500 text-white px-3 rounded-lg cursor-pointer hover:bg-rose-500 transition flex items-center justify-center"
            onClick={() => {
              setShowBar({
                clicked: true,
                message: "Product removed from cart successfully!",
              });
              removeFromList(value.id);
            }} // Handle click to remove item from cart
          >
            <p className="px-2">Remove</p> {/* Remove button */}
          </div>
        </div>
      </li>
    ));
  };

  return (
    <>
      <SnackbarShow get={showBar} set={setShowBar} />
      <div className="mx-auto my-0 w-[70%] h-max pt-10 select-none">
        <div className="flex justify-center items-start h-full w-full flex-col">
          <div className="py-5 h-full w-full">
            <RedirectIcons
              cartLength={cart.length}
              wishlistLength={wishlistLength}
              cart={false}
              home={true}
              wishlist={true}
            />
          </div>
          <div className="h-full w-full flex flex-row justify-center">
            <div className="h-[80%] w-full flex justify-start items-center flex-col">
              <div className="bg-slate-600 flex justify-center items-center h-[75px] w-full font-semibold text-white text-2xl shadow-xl z-50 rounded-md">
                CART
              </div>
              <div className="bg-slate-200 h-max max-h-[500px] min-h-[500px] w-[97%] rounded-b-xl overflow-y-auto shadow-xl overflow-x-hidden">
                <ul className="flex flex-col px-1 pt-1 w-full h-full">
                  {cart.length === 0 ? ( // Check if cart is empty
                    <p className="mx-auto my-auto text-xl">
                      Cart is
                      <span className="font-semibold pl-1">empty</span>.
                    </p>
                  ) : (
                    renderList() // Render cart items if not empty
                  )}
                </ul>
              </div>
            </div>{" "}
            <div className="h-max w-[50%] flex justify-start items-center flex-col ml-5">
              <div className="bg-slate-600 flex justify-center items-center h-[75px] w-full font-semibold text-white text-2xl shadow-xl z-50 rounded-md">
                CHECKOUT
              </div>
              <div className="bg-slate-200 h-full w-[97%] rounded-b-xl overflow-y-auto shadow-xl overflow-x-hidden flex justify-between flex-col">
                <div className="p-3">
                  <div>
                    <p className="rounded-full bg-slate-500 hover:bg-slate-600 w-max h-max px-3 py-1 text-white font-semibold">
                      Items:
                    </p>
                    <div className="max-h-32 h-full overflow-hidden overflow-y-auto my-2 border-2 border-slate-300 rounded-xl">
                      <ul className="flex flex-col justify-center items-center bg-slate-200 w-full h-full">
                        {cart.length == 0 ? (
                          <p className="flex justify-center text-sm h-full py-2 bg-slate-100 w-full self-center justify-self-center">
                            Cart is empty.
                          </p>
                        ) : (
                          renderCheckoutItems()
                        )}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <p className="rounded-full bg-slate-500 hover:bg-slate-600 w-max h-max px-3 text-white font-semibold py-1">
                      Tax
                    </p>{" "}
                    <div className="w-full h-full bg-slate-100 mb-1 p-1 px-2 flex items-center text-slate-600 font-normal rounded-xl justify-between flex-row shadow-md my-2">
                      <div className="w-full h-full flex-row flex items-center justify-between px-2">
                        <div className="flex">
                          <span className="font-semibold">
                            {totalQuantity} x
                          </span>
                        </div>
                        <div className="font-semibold">
                          ${total.toFixed(2)} + %15
                        </div>
                      </div>
                    </div>{" "}
                  </div>
                  <div className="mt-3">
                    <p className="rounded-full bg-slate-500 hover:bg-slate-600 w-max h-max px-3 text-white font-semibold py-1">
                      Total
                    </p>
                    <div className="w-full h-full bg-slate-100 mb-1 p-1 px-2 flex items-center text-slate-600 font-normal rounded-xl justify-between flex-row shadow-md mt-2">
                      <div className="w-full h-full flex-row flex items-center justify-between px-2">
                        <div className="flex">
                          <span className="font-semibold">
                            {totalQuantity} x
                          </span>
                        </div>
                        <div className="font-semibold">
                          ${(total + (total / 100) * 15).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="rounded-full bg-slate-500 hover:bg-slate-600 w-max h-max px-3 text-white font-semibold py-1">
                      Promotion Code
                    </p>
                    <input
                      className="w-full h-full bg-slate-50 mb-1 p-1 px-3 py-2 flex items-center text-slate-600 font-normal rounded-xl justify-between flex-row shadow-md mt-2"
                      placeholder="Enter promotion code.."
                    ></input>
                  </div>
                </div>
                <div className="flex justify-center items-center pb-3">
                  <button className="flex justify-center items-center w-[95%] h-14 bg-slate-600 hover:bg-slate-700 active:bg-slate-800 text-white font-semibold text-xl rounded-md transition">
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

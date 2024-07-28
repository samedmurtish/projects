import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";

import { addItem } from "../../../Database/connection";
import { MdSettingsRemote } from "react-icons/md";

export default function AddItem({ page }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  return (
    <div className="flex flex-col gap-5 min-h-max">
      <div className="flex-col flex gap-5 min-h-max">
        <div className="flex-row flex gap-2">
          <button
            className="h-16 rounded-lg bg-blue-400 hover:bg-blue-500 flex justify-center items-center w-20 text-4xl text-white transition"
            onClick={() => {
              page("");
            }}
          >
            <IoArrowBack />
          </button>
          <div className="w-full h-16 bg-slate-300 rounded-lg p-3 items-center flex">
            <p className="text-xl text-slate-700">Add Item</p>
          </div>
        </div>
        <div
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col gap-10 justify-between h-full w-full"
        >
          <div className="flex flex-col gap-3">
            <div>
              <p className="pl-3 text-lg font-semibold text-slate-500">
                Product Name:
              </p>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter product name..."
                className="p-3 w-full rounded-lg"
              />
            </div>
            <div>
              <p className="pl-3 text-lg font-semibold text-slate-500">
                Product Price:
              </p>
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                placeholder="Enter product price..."
                className="p-3 w-full rounded-lg"
              />
            </div>
          </div>
          <div>
            <button
              className="w-full h-16 bg-green-400 hover:bg-green-500 hover:green-500 text-2xl text-white font-semibold rounded-lg"
              onClick={(e) => {
                addItem(name, price);
                page("");
              }}
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

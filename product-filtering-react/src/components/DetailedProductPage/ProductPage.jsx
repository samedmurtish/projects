import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ErrorPage from "../Error/ErrorPage";
import ImageShowcase from "./ImageShowcase";

export default function ProductPage() {
  const location = useLocation();
  let product;
  location.state != null ? ({ product } = location.state) : null;

  return (
    <div>
      {product == null ? (
        <ErrorPage />
      ) : (
        <>
          <div className="mx-auto my-0 w-11/12 h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center items-center h-max w-max">
              <div className="bg-gray-100 h-3/4 w-full rounded-b-xl overflow-y-auto shadow-xl overflow-x-hidden">
                <div className="flex flex-row">
                  <ImageShowcase product={product} />
                  <div className="text-2xl font-semibold p-10">
                    {product.title}
                    {}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Outlet />
    </div>
  );
}

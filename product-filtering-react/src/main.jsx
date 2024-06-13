import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./styles/loader.css";
import Wishlist from "./components/Wishlist.jsx";
import Cart from "./components/Cart.jsx";
import ProductPage from "./components/DetailedProductPage/ProductPage.jsx";
import ErrorPage from "./components/Error/ErrorPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "wishlist",
    element: <Wishlist />,
    errorElement: <ErrorPage />,
  },
  {
    path: "cart",
    element: <Cart />,
    errorElement: <ErrorPage />,
  },
  {
    path: "product/:id",
    element: <ProductPage />,
    errorElement: <ErrorPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

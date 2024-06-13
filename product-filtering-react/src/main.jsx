import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./styles/loader.css";
import Wishlist from "./components/Wishlist.jsx";
import Cart from "./components/Cart.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: "wishlist",
    element: <Wishlist />,
  },

  {
    path: "cart",
    element: <Cart />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

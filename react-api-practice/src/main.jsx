import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import NavigationBar from "./components/Public/NavigationBar.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import UserProfile from "./components/ProfilePage/UserProfile.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationBar />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

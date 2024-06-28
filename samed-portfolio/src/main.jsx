import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./Components/Error/ErrorPage.jsx";
import ContactMe from "./Components/Contact/ContactMe.jsx";
import Projects from "./Components/Projects/Projects.jsx";
import About from "./Components/About/About.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/projects",
    element: <Projects />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/project/:id/",
    //element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact",
    element: <ContactMe />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

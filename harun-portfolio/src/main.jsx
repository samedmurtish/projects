import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./components/AboutPage/About.jsx";
import CV from "./components/CvPage/CV.jsx";
import Projects from "./components/ProjectsPage/Projects.jsx";
import ProjectDetailedPage from "./components/ProjectDetailedPage/ProjectDetailedPage.jsx";
import ErrorPage from "./components/Error/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/projects",
    element: <Projects />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cv",
    element: <CV />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/project/:id",
    element: <ProjectDetailedPage />,
    errorElement: <ErrorPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

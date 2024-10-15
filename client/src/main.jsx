import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ApiLinksPage from "./ApiLinksPage";

import App from "./App.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SideBar from "./components/Sidebar/Sidebar.jsx";
import CourseGrid from "./components/Course/CourseGrid.jsx";
import ClassesTable from "./components/Table/ClassesTable.jsx";
import DynamicTable from "./components/Table/DynamicTable.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/api-links",
        element: <ApiLinksPage />,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/course",
        element: <CourseGrid />,
      },
      {
        path: "/contact",
        element: <div>Contact</div>,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/test",
        element: <DynamicTable />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

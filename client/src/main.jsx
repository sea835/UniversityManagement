import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ApiLinksPage from "./ApiLinksPage";
import { useState } from "react";

import App from "./App.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import CourseGrid from "./components/Course/CourseGrid.jsx";
import TestPage from "./pages/TestPage.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import CourseContent from "./components/Course/CourseContent.jsx";
import DynamicTable from "./components/Table/DynamicTable.jsx";
import StudentClasses from "./services/StudentClasses.jsx";

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
        element: <TestPage />,
      },
      {
        path: "/dashboard",
        element: <StudentPage />,
        children: [
          {
            path: "/dashboard/account",
            element: <div>Account Setting</div>,
          },
          {
            path: "/dashboard/courses",
            element: <CourseGrid />,
          },
          {
            path: "/dashboard/courses/:id",
            element: <CourseContent />,
          },
          {
            path: "/dashboard/classes",
            element: <div>Classes</div>,
          },
          {
            path: "/dashboard/schedule",
            element: (
              <>
                <StudentClasses />
              </>
            ),
          },
          {
            path: "/dashboard/tuition",
            element: <div>Tuition fee</div>,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

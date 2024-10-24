import React from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./components/AppRouter.jsx";
import AuthProvider from "./components/Auth/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
);

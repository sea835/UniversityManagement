import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import StudentPage from "../../pages/StudentPage";
import AdminPage from "../../pages/AdminPage";

export const AuthProtect = () => {
  const { user } = useAuth();

  console.log("user", user);

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  if (user.role === "administrator") {
    return <AdminPage />;
  }

  if (user.role === "student") {
    return <StudentPage />;
  }

  // Optionally, handle other roles or default case
  return <></>;
};

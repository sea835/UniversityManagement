import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const AuthProtect = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

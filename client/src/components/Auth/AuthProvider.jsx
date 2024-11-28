import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("token") || null
  ); // Initialize with token from localStorage if available

  const login = async (username, password, navigate) => {
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        username,
        password,
      });
      const { user, accessToken } = response.data;
      setUser(user); // Set the user state
      localStorage.setItem("user", JSON.stringify(user)); // Persist the user in
      setAccessToken(accessToken); // Set the token state
      localStorage.setItem("token", accessToken); // Persist the token in localStorage
      console.log("Login success: ", response.data);
      if (response.data.user.role === "administrator") {
        navigate("/dashboard/listTeacher");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const logOut = (navigate) => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, user, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Usage example
export const useAuth = () => {
  return useContext(AuthContext);
};

// const [accessToken, setAccessToken] = useState(null);

// const login = async (username, password) => {
//   const result = await login(username, password);
//   if (result) {
//     setAccessToken(result.accessToken); // Store in memory
//   }
// };

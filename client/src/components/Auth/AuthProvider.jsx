import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("token") || null
  ); // Initialize with token from localStorage if available
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") || null
  );

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        username,
        password,
      });

      const { user, accessToken, refreshToken } = response.data;

      setUser(user); // Set the user state
      localStorage.setItem("user", JSON.stringify(user)); // Persist the user in localStorage
      setAccessToken(accessToken); // Set the token state
      localStorage.setItem("token", accessToken); // Persist the token in localStorage
      setRefreshToken(refreshToken); // Set the refresh token state
      localStorage.setItem("refreshToken", refreshToken); // Persist the refresh token in localStorage
      navigate("/dashboard/");
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/refreshToken",
        {
          token: refreshToken,
        }
      );

      const { accessToken } = response.data;
      setAccessToken(accessToken);
      localStorage.setItem("token", accessToken);
    } catch (error) {
      console.log(error);
      logOut();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (refreshToken) {
        refreshAccessToken();
      }
    }, 4 * 60 * 1000); // Refresh token every 4 minutes

    return () => clearInterval(interval);
  }, [refreshToken]);

  const logOut = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, login, user, logOut, refreshAccessToken }}
    >
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

import axios from "axios";

// Updated login function (Client-side)
export const login = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:4000/api/login", {
      username: username,
      password: password,
    });

    const { accessToken, user } = response.data;
    // Store the access token in memory (in state, context, or a global store like Redux)
    localStorage.setItem("accessToken", accessToken); // Temporarily using localStorage, but it should ideally be in memory.
    return { accessToken, user };
  } catch (error) {
    console.log(error.response.data);
    return null;
  }
};

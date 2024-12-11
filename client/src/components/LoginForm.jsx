import React, { useState } from "react";
import { useAuth } from "../components/Auth/AuthProvider";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Add state for error message
  const [showModal, setShowModal] = useState(false); // Add state for modal visibility

  const handleOnUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleOnPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const auth = useAuth();
  const handleOnLogin = async () => {
    try {
      const login = await auth.login(username, password);
      if (!login.login) {
        setError(login.error); // Set error message on failure
        setShowModal(true); // Show modal on failure
      }
    } catch (err) {
      setError("Login failed. Please check your username and password."); // Set error message on failure
      setShowModal(true); // Show modal on failure
    }
  };

  return (
    <>
      <form className="flex flex-col mt-10 max-w-full w-[250px]">
        <h2 className="text-2xl text-slate-700">Login</h2>
        <div className="flex flex-col mt-6 w-full text-sm font-medium">
          <div className="flex flex-col w-full whitespace-nowrap">
            <label htmlFor="username" className="text-slate-700">
              Username
            </label>
            <input
              onChange={(e) => handleOnUsernameChange(e)}
              type="text"
              id="Username"
              placeholder="username"
              className="overflow-hidden gap-2.5 self-stretch px-4 py-2 mt-2 w-full bg-white rounded-md border border-solid border-stone-300 min-h-[32px] text-slate-700"
            />
          </div>
          <div className="flex flex-col mt-4 w-full whitespace-nowrap">
            <label htmlFor="password" className="text-slate-700">
              Password
            </label>
            <div className="flex overflow-hidden gap-10 justify-between items-center px-4 py-2 mt-2 w-full bg-white rounded-md border border-solid border-stone-300 min-h-[32px] text-slate-700">
              <input
                onChange={(e) => handleOnPasswordChange(e)}
                type="password"
                id="password"
                placeholder="Password"
                className="self-stretch my-auto border-none bg-transparent outline-none"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/768a42f457d27cb4dcedb7843cac5083e3438f44c5e12213c7c64d56712a57f3?placeholderIfAbsent=true&apiKey=6691d1e2e6994f86a4ee60b22c84bff6"
                className="object-contain shrink-0 self-stretch my-auto w-3 rounded-3xl aspect-square"
                alt=""
              />
            </div>
          </div>
        </div>
        <span
          onClick={() => handleOnLogin()}
          className="overflow-hidden gap-2.5 self-stretch py-2.5 pr-24 pl-24 mt-6 w-full text-base text-white rounded-lg bg-stone-400 min-h-[40px] max-md:px-5 hover:bg-stone-500"
        >
          Log in
        </span>
        <p className="self-start mt-6 text-xs text-center text-slate-700">
          Don't have an account yet?{" "}
          <a href="/register" className="text-slate-700">
            Register now.
          </a>
        </p>
      </form>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Login Failed</h2>
            <p>{error}</p>
            <button
              onClick={() => {
                setShowModal(false);
                // setLoginFailed(false);
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;

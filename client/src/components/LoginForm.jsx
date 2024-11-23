import { useState } from "react";
import { useAuth } from "../components/Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleOnUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleOnPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const auth = useAuth();
  const handleOnLogin = () => {
    auth.login(username, password, navigate);
  };

  return (
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
        <a href="#forgot-password" className="self-start mt-3 text-slate-700">
          Forgot Password?
        </a>
      </div>
      <span
        onClick={() => handleOnLogin()}
        // type="submit"
        className="overflow-hidden gap-2.5 self-stretch py-2.5 pr-24 pl-24 mt-6 w-full text-base text-white rounded-lg bg-stone-400 min-h-[40px] max-md:px-5 hover:bg-stone-500"
      >
        Log in
      </span>

      <p className="self-start mt-6 text-xs text-center text-slate-700">
        Dont have an account yet?{" "}
        <a href="/register" className="text-slate-700">
          Register now.
        </a>
      </p>
    </form>
  );
};

export default LoginForm;

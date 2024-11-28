import React, { useEffect, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Auth/AuthProvider";
import axios from "axios";

const RegisterPage = () => {
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    if (user || accessToken) {
      navigate("/dashboard");
    }
  }, [user, accessToken, navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/departments", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDepartments(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex relative flex-col justify-center items-center px-20 py-32 w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/040ac4abd25d4c19a668b96f2e4dc2567ff6eefc32d6b0003911050413e36da1?placeholderIfAbsent=true&apiKey=6691d1e2e6994f86a4ee60b22c84bff6"
        className="object-cover absolute inset-0 size-full"
        alt="Background"
      />
      <section className="flex overflow-hidden relative flex-col items-center px-20 pt-10 pb-32 mb-0 max-w-full rounded-3xl bg-stone-200 bg-opacity-80 min-h-[539px] w-[800px] max-md:px-5 max-md:pb-24 max-md:mb-2.5">
        <div className="text-2xl text-slate-700">Your logo</div>
        <RegisterForm departments={departments} />
      </section>
    </div>
  );
};

export default RegisterPage;

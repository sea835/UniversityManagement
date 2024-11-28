import React, { useState } from "react";
import axios from "axios";

const RegisterForm = ({ departments }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    full_name: "",
    phone_number: "",
    image: "",
    address: "",
    gender: "Male",
    date_of_birth: "",
    department_id: "",
  });

  const generateStudentId = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `Sv${randomNumber}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnRegister = () => {
    const studentData = { ...formData, student_id: generateStudentId() };
    axios
      .post("http://localhost:4000/api/students", studentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="flex flex-col mt-10 w-[700px] space-y-4">
      <h2 className="text-2xl text-slate-700">Register</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="username" className="text-slate-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-slate-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-slate-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="full_name" className="text-slate-700">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="phone_number" className="text-slate-700">
            Phone Number
          </label>
          <input
            type="text"
            name="phone_number"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="image" className="text-slate-700">
            Image
          </label>
          <input
            type="text"
            name="image"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="address" className="text-slate-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="gender" className="text-slate-700">
            Gender
          </label>
          <select
            name="gender"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="date_of_birth" className="text-slate-700">
            Date of Birth
          </label>
          <input
            type="date"
            name="date_of_birth"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="department_id" className="text-slate-700">
            Department
          </label>
          <select
            name="department_id"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.department_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="button"
        onClick={handleOnRegister}
        className="bg-stone-400 hover:bg-stone-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Register
      </button>
      <p className="self-start mt-6 text-xs text-center text-slate-700">
        Already have an account?{" "}
        <a href="/login" className="text-slate-700">
          Login now.
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;

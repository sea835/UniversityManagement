import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import { Link } from "react-router-dom";

const studentSidebarItems = [
  { icon: "courses", text: "My Courses", path: "/dashboard/courses" },
  { icon: "account", text: "Account Setting", path: "/dashboard/account" },
  { icon: "classes", text: "Classes", path: "/dashboard/classes" },
  { icon: "schedule", text: "Schedule", path: "/dashboard/schedule" },
  { icon: "tuition", text: "Tuition fee", path: "/dashboard/tuition" },
  { icon: "help", text: "Help", path: "/help" },
];

const teacherSidebarItems = [
  { icon: "account", text: "Account Setting", path: "/account" },
  { icon: "classes", text: "Classes", path: "/classes" },
  { icon: "schedule", text: "Schedule", path: "/schedule" },
  { icon: "tuition", text: "Tuition fee", path: "/tuition" },
  { icon: "help", text: "Help", path: "/help" },
];

const adminSidebarItems = [
  { icon: "account", text: "Teacher's Accounts", path: "/teachers" },
  { icon: "student", text: "Student's Accounts", path: "/students" },
  { icon: "courses", text: "Courses", path: "/courses" },
  { icon: "payment", text: "Payment History", path: "/payment" },
  { icon: "help", text: "Help", path: "/help" },
];

function SideBar({ type }) {
  let sidebarItems = [];
  if (type === "student") {
    sidebarItems = studentSidebarItems;
  } else if (type === "teacher") {
    sidebarItems = teacherSidebarItems;
  } else if (type === "admin") {
    sidebarItems = adminSidebarItems;
  }

  // State to track the active item
  const [activeItem, setActiveItem] = useState(sidebarItems[0].text);

  return (
    <nav className="flex flex-col py-11 max-w-full bg-white rounded-3xl shadow-[0px_10px_60px_rgba(226,236,249,0.5)] w-[306px] h-[850px]">
      <div className="flex flex-col items-end px-7">
        <div className="flex flex-col self-stretch w-full">
          <div className="flex gap-2 self-start text-2xl font-semibold tracking-wide text-black whitespace-nowrap mb-10">
            <h1 className="capitalize">{type}</h1>
          </div>
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              path={item.path}
              active={item.text === activeItem}
              onClick={() => setActiveItem(item.text)} // Set active item on click
            />
          ))}
        </div>
      </div>
      <button className="self-center px-8 pb-2 mt-[250px] max-w-full text-red-600 bg-red-200 rounded border border-red-600 border-solid w-[130px] max-md:px-5 max-md:mt-10">
        Log out
      </button>
    </nav>
  );
}

export default SideBar;

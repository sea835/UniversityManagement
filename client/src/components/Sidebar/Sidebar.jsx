import React from "react";
import SidebarItem from "./SidebarItem";
// import LogoutButton from "./LogoutButton";

const studentSidebarItems = [
  { icon: "account", text: "Account Setting", active: true },
  { icon: "courses", text: "Courses Registration" },
  { icon: "classes", text: "Classes" },
  { icon: "schedule", text: "Schedule" },
  { icon: "tuition", text: "Tuition fee" },
  { icon: "help", text: "Help" },
];

const teacherSidebarItems = [
  { icon: "account", text: "Account Setting", active: true },
  { icon: "classes", text: "Classes" },
  { icon: "schedule", text: "Schedule" },
  { icon: "tuition", text: "Tuition fee" },
  { icon: "help", text: "Help" },
];

const adminSidebarItems = [
  { icon: "account", text: "Teacher's Accounts", active: true },
  { icon: "student", text: "Student's Accounts" },
  { icon: "courses", text: "Courses" },
  { icon: "payment", text: "Payment History" },
  { icon: "help", text: "Help" },
];

function SideBar() {
  return (
    <nav className="flex flex-col py-11 max-w-full bg-white rounded-3xl shadow-[0px_10px_60px_rgba(226,236,249,0.5)] w-[306px] h-[850px]">
      <div className="flex flex-col items-end px-7">
        <div className="flex flex-col self-stretch w-full">
          <div className="flex gap-2 self-start text-2xl font-semibold tracking-wide text-black whitespace-nowrap mb-10">
            <h1 className="">Student</h1>
          </div>
          {studentSidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              active={item.active}
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

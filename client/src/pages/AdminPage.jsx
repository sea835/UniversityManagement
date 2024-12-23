import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../components/Auth/AuthProvider";
import SideBar from "../components/Sidebar/Sidebar";

const AdminPage = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <div className="flex bg-gradient-to-br from-[#E7E7E7] to-[#E6DAC4] items-start justify-center py-8 gap-2">
        <div className="w-[300px]">
          <SideBar type={`${user.role}`} />
        </div>
        <div className="w-[1040px]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminPage;

import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/Sidebar/Sidebar';

const AdminPage = () => {
  return (
    <>
      <div className="flex bg-gradient-to-br from-[#E7E7E7] to-[#E6DAC4] items-start justify-center py-8 gap-2">
        <div className="w-[300px]">
          <SideBar type="Administrator" />
        </div>
        <div className="w-[1040px]">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminPage
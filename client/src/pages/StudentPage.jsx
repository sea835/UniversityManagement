import React, { act } from "react";
import DynamicTable from "../components/Table/DynamicTable";
import axios from "axios";
import { useEffect, useState } from "react";
import CourseContent from "../components/Course/CourseContent";
import SideBar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const TestPage = () => {
  return (
    <>
      <div className="flex bg-gradient-to-br from-[#E7E7E7] to-[#E6DAC4] items-start justify-center py-14 gap-4">
        <div className="w-[300px]">
          <SideBar type="Student" />
        </div>
        <div className="w-[1040px]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default TestPage;

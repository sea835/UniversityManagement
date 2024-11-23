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
      <div className="flex max-w-[unset] items-start justify-center py-14 gap-4">
        <div className="w-[250px]">
          <SideBar type="student" />
        </div>
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default TestPage;

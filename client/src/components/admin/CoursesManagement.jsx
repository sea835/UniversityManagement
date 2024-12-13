import React from "react";
import axios from "axios";
import DynamicTable from "../Table/DynamicTable";
import { useAuth } from "../Auth/AuthProvider";
import { useEffect, useState } from "react";

const CoursesManagement = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get(`http://localhost:4000/api/subjects`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dataset = {
    Courses: {
      data: data,
      action: true,
      apiLink: "http://localhost:4000/api/subjects",
    },
  };
  return (
    <div className="bg-white rounded-[30px] h-[900px]">
      <DynamicTable
        dataset={dataset}
        addButton={true}
        onEditComplete={fetchData}
      />
    </div>
  );
};

export default CoursesManagement;

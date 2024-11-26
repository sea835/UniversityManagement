import axios from "axios";
import { useEffect, useState } from "react";
import DynamicTable from "../Table/DynamicTable";
import { useAuth } from "../Auth/AuthProvider";

const TeacherAccounts = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/lecturers`, {
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
  }, []);

  const dataset = {
    TeacherAccounts: {
      data: data,
      action: true,
    },
  };
  return (
    <>
      <div className="bg-white rounded-[30px] h-[900px]">
        <DynamicTable dataset={dataset} addButton={true}/>
      </div>
    </>
  );
};

export default TeacherAccounts;
import axios from "axios";
import { useEffect, useState } from "react";
import DynamicTable from "../components/Table/DynamicTable";
import { useAuth } from "../components/Auth/AuthProvider";

const Students = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/classes/student/${user.student_id}`, {
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
    Schedule: {
      data: data,
      action: true,
    },
  };
  return (
    <>
      <div className="bg-white rounded-[30px] h-[900px]">
        <DynamicTable dataset={dataset} />
      </div>
    </>
  );
};

export default Students;

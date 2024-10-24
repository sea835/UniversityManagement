import axios from "axios";
import { useEffect, useState } from "react";
import DynamicTable from "../components/Table/DynamicTable";

const Students = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/classes")
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
      action: false,
    },
  };
  return (
    <>
      <div className="bg-white rounded-[30px]">
        <DynamicTable dataset={dataset} />
      </div>
    </>
  );
};

export default Students;

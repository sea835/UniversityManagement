import React, { act } from "react";
import DynamicTable from "../components/Table/DynamicTable";
import axios from "axios";
import { useEffect, useState } from "react";

const TestPage = () => {
  const tableTypes = {
    teachers: {
      data: [
        {
          studentId: "220B88",
          studentName: "Jane Cooper",
          username: "Microsoft",
          phoneNumber: "(225) 555-0118",
          email: "jane@microsoft.com",
        },
        {
          studentId: "220B89",
          studentName: "John Doe",
          username: "Google",
          phoneNumber: "(225) 555-0119",
          email: "john@google.com",
        },
      ],
      action: true,
    },
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/students")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const dataset = {
    subjects: {
      data: data,
      action: true,
    },
  };

  return (
    <>
      <DynamicTable dataset={tableTypes} />
    </>
  );
};

export default TestPage;

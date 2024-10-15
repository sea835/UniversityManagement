import React, { useState } from "react";
import Search from "./Search";
import Sort from "./Sort";

function DynamicTable() {
  // Define multiple datasets with headers
  const tableTypes = {
    courses: {
      headers: [
        "Course ID",
        "Course Name",
        "Credits",
        "Class ID",
        "Day of Week",
        "Lesson",
        "Campus",
        "Learning Weeks",
      ],
      data: [
        {
          courseId: "SP1035",
          courseName: "Scientific Socialism",
          credits: "2",
          classId: "L01",
          dayOfWeek: "2",
          lesson: "2 3",
          campus: "1",
          learningWeeks: "1-2-3-4-6-7",
        },
        {
          courseId: "CO3093",
          courseName: "Computer Networks",
          credits: "3",
          classId: "L01",
          dayOfWeek: "3",
          lesson: "2 3 4",
          campus: "2",
          learningWeeks: "1-2-3-4-6-7",
        },
      ],
    },
    teachers: {
      headers: [
        "Student ID",
        "Student Name",
        "Username",
        "Phone Number",
        "Email",
        "Actions",
      ],
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
        // Add more teacher data as needed
      ],
    },
  };

  // State for the selected table type
  const [selectedTable, setSelectedTable] = useState("teachers");

  // Handler to change table type
  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };

  // Get current table data and headers
  const { headers, data } = tableTypes[selectedTable];

  return (
    <div className="flex flex-col px-8 w-full max-w-full">
      <div className="flex flex-wrap gap-5 justify-between w-full">
        <h2 className="self-start text-2xl font-semibold text-black">
          {selectedTable === "teachers" ? "Teacher Accounts" : "Classes"}
        </h2>
        <div className="flex gap-4">
          <Search />
          <Sort />
        </div>
      </div>

      {/* Dropdown to switch between tables */}
      <div className="mt-5">
        <label htmlFor="table-selector" className="font-medium text-gray-700">
          Select Table Type:
        </label>
        <select
          id="table-selector"
          value={selectedTable}
          onChange={handleTableChange}
          className="ml-3 p-2 border rounded-md bg-gray-100"
        >
          <option value="courses">Courses</option>
          <option value="teachers">Teachers</option>
        </select>
      </div>

      {/* Table Structure */}
      <div className="mt-8 overflow-auto border border-gray-300 rounded-md shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.studentId || item.courseId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.studentName || item.courseName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.username || item.credits}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.phoneNumber || item.classId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.email || item.dayOfWeek}
                </td>
                {selectedTable === "teachers" && (
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-3">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-md">
                      Edit
                    </button>
                    <button className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded-md">
                      View
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md">
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DynamicTable;

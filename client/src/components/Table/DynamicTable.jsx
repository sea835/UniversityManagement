import React, { useState } from "react";
import Search from "./Search";
import Sort from "./Sort";

function DynamicTable({ dataset, addButton = false }) {
  // State for the selected table type
  const [selectedTable, setSelectedTable] = useState(Object.keys(dataset)[0]);

  // Handler to change table type
  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };

  // Get current table data
  const tableData = dataset[selectedTable].data;

  // Auto-generate headers from the keys of the first object in the data array
  const headers = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  return (
    <div className="flex flex-col px-8 w-full max-w-full pb-20 pt-10">
      <div className="flex flex-wrap gap-5 justify-between w-full">
        <h2 className="self-start text-2xl font-semibold text-black">
          {selectedTable.charAt(0).toUpperCase() + selectedTable.slice(1)}
        </h2>
        <div className="flex gap-4">
          <Search />
          <Sort />
        </div>
      </div>

      {/* Dropdown to switch between tables */}
      {/* <div className="mt-5">
        <label htmlFor="table-selector" className="font-medium text-gray-700">
          Select Table Type:
        </label>
        <select
          id="table-selector"
          value={selectedTable}
          onChange={handleTableChange}
          className="ml-3 p-2 border rounded-md bg-gray-100"
        >
          {Object.keys(dataset).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
      </div> */}

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
                  {header.charAt(0).toUpperCase() +
                    header.slice(1).replace(/([A-Z])/g, " $1")}
                </th>
              ))}
              {dataset[selectedTable].action === true && (
                <th className="px-6 py-2 flex flex-row justify-between items-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span>Action</span>
                  <button className="bg-green-200 text-green-800 hover:bg-green-400 px-4 py-2 rounded-sm">ADD NEW</button>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((item, index) => (
              <tr key={index}>
                {headers.map((header, idx) => (
                  <td key={idx} className="px-6 py-4 whitespace-nowrap">
                    {item[header]}
                  </td>
                ))}
                {dataset[selectedTable].action === true && (
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

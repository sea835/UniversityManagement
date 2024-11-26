import React, { useState } from "react";
import Search from "./Search";
import Sort from "./Sort";
import axios from "axios";
import Modal from "../Modal/Modal";

function DynamicTable({ dataset, addButton = false, onEditComplete }) {
  const [selectedTable, setSelectedTable] = useState(Object.keys(dataset)[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({});

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };

  const tableData = dataset[selectedTable].data;

  const apiLink = dataset[selectedTable].apiLink;

  const getIdKey = () => {
    const sampleItem = dataset[selectedTable].data[0];
    return Object.keys(sampleItem).find((key) => key.endsWith("_id"));
  };

  const handleAddNew = () => {
    setFormData({}); // Reset formData for new item
    setShowAddModal(true);
  };

  const handleDelete = (item) => {
    setCurrentItem(item);
    setShowDeleteModal(true);
  };

  const handleView = (item) => {
    setCurrentItem(item);
    setShowViewModal(true);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData(item); // Ensure formData includes all existing data
    setShowEditModal(true);
  };

  const handleConfirmDelete = async () => {
    const idKey = getIdKey();
    try {
      await axios
        .delete(`${apiLink}/${currentItem[idKey]}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      setShowDeleteModal(false);
      // Refresh data or handle state update
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSubmit = async () => {
    try {
      console.log(formData);
      const formattedData = { ...formData };
      if (formData.date_of_birth) {
        formattedData.date_of_birth = new Date(formData.date_of_birth)
          .toISOString()
          .split("T")[0];
      }
      await axios
        .post(apiLink, formattedData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      setShowAddModal(false);
      // Refresh data or handle state update
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleEditSubmit = async () => {
    const idKey = getIdKey();
    try {
      const formattedData = { ...formData };
      if (formData.date_of_birth) {
        formattedData.date_of_birth = new Date(formData.date_of_birth)
          .toISOString()
          .split("T")[0];
      }
      await axios
        .put(`${apiLink}/${currentItem[idKey]}`, formattedData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      setShowEditModal(false);
      if (onEditComplete) onEditComplete(); // Call the function to refresh data
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const addCondition = () => {
    if (addButton)
      return (
        <div className="content-center">
          <button
            className="bg-green-200 text-green-800 hover:bg-green-400 px-4 py-1 rounded-sm font-medium"
            onClick={handleAddNew}
          >
            ADD NEW
          </button>
        </div>
      );
  };

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
          {addCondition()}
        </div>
      </div>

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
                <th className="px-6 py-3 flex justify-between items-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span>Action</span>
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
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
                      onClick={() => handleView(item)}
                    >
                      View
                    </button>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded-md"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showAddModal} onClose={() => setShowAddModal(false)}>
        <div className="max-h-96 overflow-y-auto">
          {headers.map((header) => (
            <div key={header} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </label>
              <input
                type={header === "date_of_birth" ? "date" : "text"}
                name={header}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => handleAddSubmit()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </Modal>

      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <p className="text-gray-700">
          Are you sure you want to delete this item?
        </p>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => handleConfirmDelete()}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            No
          </button>
        </div>
      </Modal>

      <Modal show={showViewModal} onClose={() => setShowViewModal(false)}>
        <div className="max-h-96 overflow-y-auto">
          <ul className="list-disc pl-5">
            {headers.map((header) => (
              <li key={header} className="mb-2">
                <strong>
                  {header.charAt(0).toUpperCase() + header.slice(1)}:
                </strong>{" "}
                {currentItem ? currentItem[header] : ""}
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
        <div className="max-h-96 overflow-y-auto">
          {headers.map((header) => (
            <div key={header} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </label>
              <input
                type={header === "date_of_birth" ? "date" : "text"}
                name={header}
                defaultValue={currentItem ? currentItem[header] : ""}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => handleEditSubmit()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default DynamicTable;

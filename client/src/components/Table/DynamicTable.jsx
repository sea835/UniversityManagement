import React, { useState } from "react";
import Search from "./Search";
import Sort from "./Sort";
import axios from "axios";
import Modal from "../Modal/Modal";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import ActionButtons from "./ActionButtons";
import Modals from "./Modals";

function DynamicTable({ columns, data, addButton = false, onChangeData }) {
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
    setFormData({});
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
    setFormData(item);
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
      if (onChangeData) onChangeData();
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
      if (onChangeData) onChangeData();
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
      if (onChangeData) onChangeData();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const headers = columns.map((column) => column.Header);

  return (
    <div className="flex flex-col px-8 w-full max-w-full pb-20 pt-10">
      <div className="flex flex-wrap gap-5 justify-between w-full">
        <h2 className="self-start text-2xl font-semibold text-black">
          Dynamic Table
        </h2>
        <div className="flex gap-4">
          <Search />
          <Sort />
          {addButton && (
            <div className="content-center">
              <button
                className="bg-green-200 text-green-800 hover:bg-green-400 px-4 py-1 rounded-sm font-medium"
                onClick={handleAddNew}
              >
                ADD NEW
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 overflow-auto border border-gray-300 rounded-md shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader headers={headers} action={true} />
          <TableBody
            tableData={data}
            headers={headers}
            action={true}
            handleView={handleView}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </table>
      </div>

      <Modals
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        showViewModal={showViewModal}
        setShowViewModal={setShowViewModal}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        headers={headers}
        currentItem={currentItem}
        handleInputChange={handleInputChange}
        handleAddSubmit={handleAddSubmit}
        handleConfirmDelete={handleConfirmDelete}
        handleEditSubmit={handleEditSubmit}
      />
    </div>
  );
}

export default DynamicTable;

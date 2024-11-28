import React from "react";
import Modal from "../Modal/Modal";

function Modals({
  showAddModal,
  setShowAddModal,
  showDeleteModal,
  setShowDeleteModal,
  showViewModal,
  setShowViewModal,
  showEditModal,
  setShowEditModal,
  headers,
  currentItem,
  handleInputChange,
  handleAddSubmit,
  handleConfirmDelete,
  handleEditSubmit,
}) {
  return (
    <>
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
    </>
  );
}

export default Modals;

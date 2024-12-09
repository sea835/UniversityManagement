import React from "react";

function ActionButtons({ item, handleView, handleEdit, handleDelete }) {
  return (
    <>
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
    </>
  );
}

export default ActionButtons;

import React from "react";

function Modal({ show, onClose, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Modal Title</h3>
          <button
            className="text-gray-600 hover:text-gray-900 text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default Modal;

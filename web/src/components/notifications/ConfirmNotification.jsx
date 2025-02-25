// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const ConfirmNotification = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-4"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 "
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmNotification;

import React, { useState } from 'react';

const DeleteConfirm = ({ visible, setVisible, message, func }) => {
  
  const handleCancel = () => {
    setVisible(!visible);
  };

  const onClick = () => {
    func();
  }

  return (
    <>
      {visible && (
        <div
          className={"fixed inset-0 z-999999 flex items-center justify-center bg-slate-700 bg-opacity-65  transition-opacity duration-300 ease-in-out"}
          dir="rtl"
        >
          <div className="rounded-lg shadow-lg bg-white max-w-sm mx-auto p-4 md:p-6 xl:p-9 flex flex-col items-center gap-4">
            {message && (
              <p className="text-lg text-red-500 font-semibold">{message}</p>
            )}
            <div className="flex flex-row gap-4 w-full justify-center">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                نەخێر
              </button>
              <button
                type="button"
                onClick={onClick}
                className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                بەڵێ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteConfirm;

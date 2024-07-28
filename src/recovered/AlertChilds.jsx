import React, { useState } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';

const AlertChilds = ({ visible, setVisible, message, children }) => {
  
  const handleCancel = () => {
    setVisible(!visible);
  };

  return (
    <>
      {visible && ( // Only render alert when visible is true
        <div
          className={"fixed inset-0 z-999999 flex items-center justify-center bg-slate-700 bg-opacity-65  transition-opacity duration-300 ease-in-out"}
          dir="rtl"
        >
          <div className="rounded-lg shadow-lg bg-white p-4 md:p-6 xl:p-9 flex flex-row items-center justify-between gap-6" dir='ltr'> 
              <button
                    onClick={handleCancel}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >          
              <XCircleIcon className="h-16 w-16 text-red-500" aria-hidden="true" />

              </button>
            <div className="flex flex-col items-center justify-between mb-4">
              {message && ( // Display message if provided
                <p className="text-lg text-red-500 font-semibold">{message}</p>
              )}
              {children && ( // Display children content if provided
                <div className="text-danger">{children}</div>
              )}
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertChilds;

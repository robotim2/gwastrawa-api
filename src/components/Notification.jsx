import React, { useState } from 'react';

const Notification = ({  message, variant = 'danger' }) => {

  const alertClasses = {
    danger: 'bg-red-100 border border-red-400 text-red-700',
    success: 'bg-green-100 border border-green-400 text-green-700',
    warning: 'bg-yellow-100 border border-yellow-400 text-yellow-700',
  };

  return (
      <div className={`px-4 py-3 rounded relative ${alertClasses[variant]}`}>
        <span className="block font-bold sm:inline">{message}</span>
      </div>
    
  );
};

export default Notification;

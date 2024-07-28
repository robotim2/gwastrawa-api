import React, { useState } from 'react';

const HallAccordion = ({ hall }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border p-4 rounded shadow-lg mb-4 bg-white dark:bg-gray-800">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        <h2 className="text-2xl font-bold mb-2">{hall.name}</h2>
        <p>Capacity: {hall.capacity}</p>
      </div>
      {isOpen && (
        <div className="mt-4">
          <p>Admin Teachers Required: {hall.admin_teachers_required}</p>
          <p>Teachers Required: {hall.teachers_required}</p>
          <h3 className="text-xl mt-4 mb-2">Assigned Teachers:</h3>
          <div>
            <h4 className="font-semibold">Admin Teachers</h4>
            <ul>
              {hall.teachers
                .filter((teacher) => teacher.pivot.is_admin)
                .map((teacher) => (
                  <li key={teacher.id}>{teacher.name} ({teacher.degree})</li>
                ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Observer Teachers</h4>
            <ul>
              {hall.teachers
                .filter((teacher) => !teacher.pivot.is_admin)
                .map((teacher) => (
                  <li key={teacher.id}>{teacher.name} ({teacher.degree})</li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HallAccordion;

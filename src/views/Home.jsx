import React from 'react';
import { Link } from 'react-router-dom';
import {  UserGroupIcon, ReceiptRefundIcon, Cog8ToothIcon} from '@heroicons/react/24/solid';

const Cards = () => {

  const cardLinks = [
    { path: '/parents', title: 'گواستراوەکان', icon: <ReceiptRefundIcon className="h-50 w-50 text-center mr-2 text-black-2 dark:text-white" /> },
    { path: '/settings', title: 'ڕێکخستنەکان', icon: <Cog8ToothIcon className="h-50 w-50 text-center mr-2 text-black-2 dark:text-white" /> },
  ];

  return (
      <div className="w-full flex flex-col items-center justify-center h-[90vh]">
        <div className="flex flex-row gap-8">
          {cardLinks.map((cardLink) => (

            <Link
            key={cardLink.path}
              to={cardLink.path}
            className="w-70 h-70 rounded overflow-hidden dark:bg-darkmode2 bg-whitemode3 shadow-lg flex flex-col justify-center items-center justify-content-center text-center"
            >
              {cardLink.icon}
              <div className="px-6 py-4 flex justify-center">
                <div className="font-bold text-xl mb-2">{cardLink.title}</div>
              </div>
            </Link>
          ))}
        </div>
    </div>

  );
};

export default Cards;

import ThemeToggle from '../components/ThemeToggle';
import React, { useState } from 'react';
import { UserIcon,Bars3Icon,Bars3BottomRightIcon } from '@heroicons/react/24/solid';

function Header({ sidebarOpen, setSidebarOpen }) {

  return (
    <header className="sticky top-0 flex items-center justify-between h-16 bg-whitemode4 dark:bg-darkmode2 border-b border-whitemode6 
    dark:border-darkmode5 z-30 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8" dir='rtl'>
      {/* Header: Left side */}
      <div className="flex">
        <button
          className="btn"
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(!sidebarOpen);
          }}
        >
          {
            sidebarOpen ? 
              <Bars3BottomRightIcon className='w-10 h-10 text-black dark:text-white' />
            :
              <Bars3Icon className='w-10 h-10 text-black dark:text-white' />
          }
        </button>
      </div>

      {/* Header: Right side */}
        <div className="flex justify-between gap-4 items-center " dir='ltr'> 

          <UserIcon className='w-8 h-8 text-black dark:text-white'/>
          <h2 className="text-gray-900 dark:text-gray-100">
          بەرێوبەر
          </h2>
          <ThemeToggle />

      </div>
    </header>
  );
}

export default Header;

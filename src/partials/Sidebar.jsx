import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../assets/back.png';
import { ArrowRightIcon, UserGroupIcon,ReceiptRefundIcon } from '@heroicons/react/20/solid';
import { DocumentPlusIcon, PlusIcon, RectangleStackIcon, StarIcon } from '@heroicons/react/24/solid';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-full top-0 overflow-y-hidden z-9999 flex h-screen w-72.5 flex-col
      bg-whitemode6 dark:bg-darkmode2 border-b border-whitemode6
      dark:border-darkmode5
      duration-300 ease-linear  ${
        sidebarOpen ? '-translate-x-full' : 'translate-x-0'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block"
        >
          <ArrowRightIcon className='w-10 h-10 fixed left-2 top-2
          text-black-2 dark:text-white'/>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div dir='rtl'>
            <h3 className="mb-3 mr-4 text-lg font-semibold text-black dark:text-white">
              بەشەکان
            </h3>

            <ul className="mb-6 flex flex-col gap-0.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/parents' || pathname.includes('parents/add')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 font-medium text-black-2 dark:text-bodydark1
                         duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/parents' ||
                            pathname.includes('parent')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >

                        <ReceiptRefundIcon className='w-6 h-6' />
                        گواستراوەکان
                        <svg
                          className={`absolute right-48 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 flex flex-col gap-1 pl-4">
                          <li>
                              <NavLink
                                to="/parents/add"
                                className={`group relative flex items-center justify-between w-full  gap-1 rounded-sm py-1 px-5
                                font-medium text-black-2 dark:text-bodydark1  duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                  pathname.includes('parents/add') && 'bg-graydark dark:bg-meta-4'
                                }`}
                              >
                              زیادکردنی گواستراوە
                              <DocumentPlusIcon class="h-6 w-6" />

                            </NavLink>
                          </li>
                          <li>
                              <NavLink
                                to="/parents"
                                className={`group relative flex items-center justify-between w-full  gap-1 rounded-sm py-1 px-5
                                font-medium text-black-2 dark:text-bodydark1  duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                  pathname === '/parents' && 'bg-graydark dark:bg-meta-4'
                                }`}
                              >

                              هەموو گواستراوەکان
                                <RectangleStackIcon className='w-6 h-6'  />
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

                {/* <!-- Teacher Menu group --> */}

                    {/*

                    <SidebarLinkGroup
                  activeCondition={
                  pathname === '/' || pathname.includes('teacher')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative w-full flex items-center gap-2.5 rounded-sm px-2 py-2 font-medium
                        text-black-2 dark:text-bodydark1  duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/' ||
                            pathname.includes('dashboard')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >

                        <UserGroupIcon className='w-6 h-6' />
                        مامۆستاکان
                        <svg
                          className={`absolute right-54 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                     {/* <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-2 flex flex-col gap-1 pl-4">
                          <li>
                            <NavLink
                                to="/tables"
                                className={`group relative flex items-center justify-between w-full  gap-1 rounded-sm py-1 px-5
                                font-medium text-black-2 dark:text-bodydark1  duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                  pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                                }`}
                              >
                              زیادکردنی مامۆستا
                              <PlusIcon className="w-6 h-6 mr-2" />

                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/teachers"
                              className={`group relative flex items-center justify-between w-full  gap-1 rounded-sm py-1 px-5
                              font-medium text-black-2 dark:text-bodydark1  duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                              }`}
                            >

                              هەموو مامۆستاکان
                              <UserGroupIcon className="w-6 h-6" />

                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/tables"
                              className={`group relative flex items-center justify-between w-full gap-1 rounded-sm py-1 px-5
                              font-medium text-black-2 dark:text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                              }`}
                            >

                              هەڵسەنگاندنی مامۆستا
                              <StarIcon className={`w-6 h-6 `} />

                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End -->
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              </nav> */}


              </ul>
          </div>

        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

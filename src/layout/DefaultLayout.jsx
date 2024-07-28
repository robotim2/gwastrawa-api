import React, { useState, ReactNode } from 'react';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import {Outlet} from 'react-router-dom'
import { useStateContext } from '../utils/ContextProvider';
import Notification from '../components/Notification';

const DefaultLayout= () => {
  const {danger,warning,notification} = useStateContext();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto p-4 md:p-6 2xl:p-10">
              {
                danger && <div className='fixed top-20 left-20 z-99999'>
                    <Notification message={danger} variant='danger'/>
                </div>
              }
              {
                 warning && <div className='fixed top-20 left-20  z-99999'>
                    <Notification message={warning} variant='warning'/>
                </div>
              }
              {
                 notification && <div className='fixed top-20 left-20  z-99999'>
                    <Notification message={notification} variant='success'/>
                </div>
              }
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;

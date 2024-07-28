import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ title,pageName,to }) => {

  return (
    <div className="w-full mb-6 flex flex-Row gap-3 items-center justify-between" dir='rtl'>
      <h2 className="text-title-md2 font-semibold text-black dark:text-whiten">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium dark:text-whiten" to={to}>
              {title} /
            </Link>
          </li>
          <li className="font-medium text-blue-800">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;

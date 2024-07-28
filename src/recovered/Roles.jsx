import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import Loader from '../../../components/Loader';

export default function Roles() {

  const [loading, setLoading] = useState(true)
  const [Roles, setRoles] = useState([]);

  useEffect(() => {
    setLoading(true)
    axiosClient.get('/get-roles')
      .then(({ data }) => {
        console.log(data);
        setRoles(data.roles);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);



  return (
    <div className="overflow-x-auto rounded-xl bg-slate-500/25 shadow-lg ring-1 ring-black/5 p-8" dir='rtl'>
    <div className="flex align-items-center justify-between">
      <h2 className='h1 mb-6 text-title-xl dark:text-white text-black'>ڕۆڵەکان</h2>
    </div>
    <table className="min-w-full bg-blue-400/70 dark:bg-slate-300 shadow-md rounded-lg overflow-hidden text-black text-right" >
      <thead className="bg-gray-200 text-gray-600 border-b border-slate-600 uppercase text-sm leading-normal">
        <tr>
          <th className="py-3 px-6 text-right">#</th>
          <th className="py-3 px-6 text-right">ڕۆڵ</th>
          <th className="py-3 px-6 text-right">کردارەکان</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-lg ">

        {loading && (
          <td colSpan={3} className="container-fluid position-absolute left-52 p-5">
            <Loader />
          </td>
        )}
        {!loading &&
            Roles.map((roles) => (
                <tr key={roles.id} className="border-b border-slate-600 hover:bg-slate-100 ">
                    <td className="py-3 px-6 text-right whitespace-nowrap">{roles.id}</td>
                    <td className="py-3 px-6 text-right text-base">{roles.title}</td>
                    <td className="py-3 px-6 text-right ">
                               <Link to={`edit/${roles.id}`} className=" text-sm bg-blue-900 dark:bg-blue-600 ml-2 hover:bg-blue-700 dark:hover:bg-blue-400 text-white font-semibold py-2 px-5 rounded shadow" >
                                    دەستکاری
                                </Link>
                    </td>
                </tr>
            ))
        }
        {
          Roles.length === 0 && !loading && (
            <tr>
              <td colSpan={3} className="container-fluid position-absolute left-52 p-5 text-center">
                هیچ ڕۆڵێکت نیە
              </td>
            </tr>
          )
        }
      </tbody>
    </table>
  </div>
  )
}

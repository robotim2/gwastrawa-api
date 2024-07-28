import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import DeleteConfirmation from '../../../components/DeleteConfirm';
import Loader from '../../../components/Loader';
import { useStateContext } from '../../../contexts/ContextProvider';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { FolderIcon } from '@heroicons/react/24/solid';


const Teachers = () => {
  
  const {  setNotification } = useStateContext();
  const navigate = useNavigate();
  let count = 0;
  const [ teachers,setTeachers ] = useState([]);
  const [loading, setLoading] = useState(true)
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [ratingToDelete, setRatingToDelete] = useState(null);
  useEffect(()=>{
    axiosClient.get('/teachers')
    .then(({data})=>{
      console.log(data);
      setTeachers(data.teacher)
      setLoading(false);
    })
    .catch((error)=>{
      setLoading(false);
      console.error(error);
    })
  }, [])

  const handleDeleteConfirm = () => {
    if (ratingToDelete) {
      axiosClient.delete(`/teachers/${ratingToDelete}`)
        .then(({ data }) => {
          if (data.message) {
            setLoading(true);

           
            axiosClient.get('/teachers')
              .then(({ data }) => {
                setNotification('‌هەڵسایت بە ڕەشکردنەوەی مامۆستایەک')
                setTeachers(data.teacher.map(teacher => ({
                  ...teacher,
                })));
                setLoading(false);
              })
              .catch((error) => {
                console.error(error);
                setLoading(false);
              });
          } else {
            alert(data.error);
          }
        })
        .catch((error) => {
          console.error(error);
          alert('Failed to delete the rating.');
        });
    }

    // Hide the delete confirmation dialog
    setShowConfirmation(false);
    setRatingToDelete(null);
  };
  const onDeleteClick = (id) => {
    // Show the delete confirmation dialog
    setRatingToDelete(id);
    setShowConfirmation(true);
  };

  return (
    <div className="overflow-x-auto rounded-xl bg-slate-500/25 shadow-lg ring-1 ring-black/5 p-8"  dir='rtl'>
      <div className="flex align-items-center justify-between">      
          <h2 className='h1 mb-6 text-title-xl dark:text-white text-black'>مامۆستاکان</h2>
          <div className="flex">
          <Link to='File' className="flex items-center bg-blue-500 mr-2 hover:bg-blue-700 text-white font-semibold py-2 px-4 m-3 rounded shadow" dir='ltr'>
              <FolderIcon className='w-6 h-6 mr-2'/>  زیادکردن بە کۆمەڵ
          </Link>
          <Link to='add' className="flex items-center bg-blue-500 mr-2 hover:bg-blue-700 text-white font-semibold py-2 px-4 m-3 rounded shadow" dir='ltr'>
          <PlusCircleIcon className='w-6 h-6 mr-2'/> زیادکرنی مامۆستا
          </Link>
          </div>
      </div>
      <DeleteConfirmation show={showConfirmation} setShow={setShowConfirmation} onDeleteConfirm={handleDeleteConfirm} />

      
      <table className="min-w-full bg-blue-400/70 dark:bg-slate-300 shadow-md rounded-lg overflow-hidden text-black text-right" >
        <thead className="bg-gray-200 text-gray-600 border-b border-slate-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-right">#</th>
            <th className="py-3 px-6 text-right">ناو</th>
            <th className="py-3 px-6 text-right">ئیمەیڵ</th>
            <th className="py-3 px-6 text-right">پاسوۆرد</th>
            <th className="py-3 px-6 text-right">بابەت</th>
            <th className="py-3 px-6 text-right">کردارەکان</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-lg ">
        {loading && (
            <td colSpan={6} className="container-fluid position-absolute left-52 p-5">
              <Loader />
            </td>
          )}
          {!loading && teachers.map((teacher) =>{
            count++;
            return(
            <tr key={teacher.id} className="border-b border-slate-600 hover:bg-slate-100 ">
              <td className="py-3 px-6 text-right whitespace-nowrap">{count}</td>
              <td className="py-3 px-6 text-right"><Link to={'/teachers/'+teacher.id} className='text-blue-600'>{teacher.name}</Link></td>
              <td className="py-3 px-6 text-right">{teacher.email}</td>
              <td className="py-3 px-6 text-right">{teacher.password}</td>
              <td className="py-3 px-6 text-right">{teacher.subject}</td>
              <td className="py-3 px-6 text-right flex lg:flex-row flex-col gap-1 lg:gap-0">
              <button
                  className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded  ml-2"
                  onClick={() => navigate(`/teachers/special/${teacher.id}`)}
              >
                  هەڵسەنگاندنی تایبەت
              </button>
              
              <button
                  className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded  ml-2"
                  onClick={() => navigate(`/teachers/Rate/${teacher.id}`)}
              >
                  هەڵسەنگاندن
              </button>
              <Link to={`edit/${teacher.id}`} className="bg-blue-500 ml-2 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow" >
                  دەستکاری
              </Link>

              <button onClick={() => onDeleteClick(teacher.id)} className=" text-sm bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded shadow">
                    سڕینەوە
              </button>  



              </td>
            </tr>
          )}
          
          )}
          {!loading && teachers.length == 0 && (
              <tr key={teachers.id} className="border-b border-slate-600 hover:bg-slate-100 ">
                <td colSpan={6} className="py-3 px-6 whitespace-nowrap text-center">هیچ مامۆستایەکت نیە</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};

export default Teachers;

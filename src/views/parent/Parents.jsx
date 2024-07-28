import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { Link,useNavigate } from 'react-router-dom';
import axiosClient from '../../axios-client';
import DeleteConfirm from '../../components/DeleteConfirm';
import { useStateContext } from '../../utils/ContextProvider';
import Loader from '../../components/Loader';

export default function Parents() {

  const navigate = useNavigate();
  const [student,setStudent] = useState([])
  const [showDelete,setShowDelete] = useState(false);
  const [message,setMessage] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [loading, setLoading] = useState(true)
   const { setDanger } = useStateContext();
    let count = 0;
   useEffect(()=>{
    axiosClient.get('/students', {
            headers: {
              'Content-Type': 'application/json',
            }
        })
        .then(( {data} ) => {
            console.log(data);
            setLoading(false)
            setStudent(data.students);

        })
        .catch((errors) =>
          {
            setLoading(false)
          console.error(errors.response.data.error.code);
        });

  }, [])

  const handleDownloadExcel = async() => {
    axiosClient.get('/students/excel/export', {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(async ({ data }) =>  {
      if (data.success) {
      await axiosClient({
          url: '/download',
          method: 'get',
          responseType: 'blob',
        })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'students.xlsx');
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        })
        .catch(downloadError => {
          console.error('There was an error downloading the file:', downloadError);
        });
      } else {
          console.data(data);
      }
    })
    .catch((errors) => {
      console.error(errors.response.status);
      console.error(errors.response.data.error);
      if (errors.response.status === 404) {
        setDanger(errors.response.data.error)
      }
    });
  }


  const handleEdit = (id) => {
    navigate('edit/'+id)
  };

  const handleDownload = (id) => {
    axiosClient.get(`/students/word/export/${id}`, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `student_${id}.docx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch(error => {
      console.error('There was an error downloading the file:', error);
      if (error.response && error.response.status === 404) {
        setDanger(error.response.data.error); // Adjust this line to match your error handling logic
      }
    });
  };

  const handleDelete = () => {
    if (studentToDelete) {
        setStudent([])
        setLoading(true)
      axiosClient.delete(`/students/${studentToDelete}`)
        .then(({ data }) => {
          setLoading(true);
          if (data.message) {
            axiosClient.get('/students')
              .then(({ data }) => {
                setDanger('‌هەڵسایت بە ڕەشکردنەوەی گواستراوەیەک')
                setStudent(data.students);
                // setStudent(data.map(data => ({
                //   ...data,
                // })));
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
    setShowDelete(false);
    setStudentToDelete(null);
  };
  const onDeleteClick = (name,id) => {
    // Show the delete confirmation dialog
    setStudentToDelete(id);
    setMessage("ئایا دڵنیایت بە رەشکردنەوەی " + name + '؟')
    setShowDelete(true);
  };

  return (
    // <div className="container-fluid px-40 h-[90vh] bg-whitemode6 dark:bg-darkmode4 flex flex-col items-center py-5" dir='rtl'>
    <div className="overflow-x-auto rounded-xl bg-whitemode4/75 dark:bg-darkmode6/55  shadow-lg ring-1 ring-black/50 p-4 h-full "  dir='rtl'>
      {
        showDelete && <DeleteConfirm visible={showDelete} setVisible={setShowDelete} message={message} func={handleDelete}/>
      }
      <div className=' p-5 rounded-lg'>
        <div className="container-fluid flex flex-row justify-between mb-3">
          <h2 className='text-black  text-bold text-title-lg'>گواستراوەکان</h2>
          <div className="flex flex-row gap-3">
            <Link to='add' className='text-whitemode1 bg-darkmode5 dark:bg-darkmode2 hover:bg-darkmode6 dark:hover:bg-darkmode1
            dark:text-white p-2 font-medium rounded-sm' >زیادکردن</Link>
            <button className='text-whitemode1 bg-lime-400 dark:bg-darkmode2 hover:bg-darkmode6 dark:hover:bg-darkmode1
            dark:text-white p-2 font-medium rounded-sm' onClick={handleDownloadExcel}>
               داتاکان بە ئێکسڵ
            </button>
          </div>


        </div>
        <table className="table-auto bg-white rounded-lg shadow-md overflow-x-auto w-full">
          <thead className="text-xs font-medium text-center text-white  bg-whitemode2 dark:bg-darkmode3">
            <tr>
              <th className="py-2 px-6">ژمارە</th>
              <th className="py-2 px-6">ناوی قوتابی</th>
              <th className="py-2 px-6">ناوی بەخێوکاری قوتابی</th>
              <th className="py-2 px-6">پۆل</th>
              <th className="py-2 px-6">ژمارە مۆبایل</th>
              <th className="py-2 px-6">بەروار</th>
              <th className="py-2 px-6">کردارەکان</th>
            </tr>
          </thead>
          <tbody className="text-xs font-normal text-center text-black">
              {
                loading ? <tr>
                    <td colSpan={6} className="text-center py-1">
                    <Loader />
                    </td>
                  </tr> :
              student.map((item) => {
                count++
                return (<tr key={item.id} className="border-b border-whitemode5 dark:border-darkmode2">
                <td className="py-4 px-6">{count}</td>
                <td className="py-4 px-6">{item.studentName}</td>
                <td className="py-4 px-6">{item.fatherName}</td>
                <td className="py-4 px-6">{item.class}</td>
                <td className="py-4 px-6">{item.phoneNumber}</td>
                <td className="py-4 px-6">{item.date}</td>
                <td className="py-4 px-6 flex justify-center space-x-2" dir='ltr'>

                  <button
                    type="button"
                    className="btn bg-red-600 hover:bg-red-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-whitemode1 dark:focus:ring-darkmode3 font-medium rounded-lg text-sm px-3 py-2 "
                    onClick={() => onDeleteClick(item.studentName,item.id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="text-whitemode1 bg-whitemode4  dark:bg-darkmode2 hover:bg-whitemode2 dark:hover:bg-darkmode1 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-whitemode1 dark:focus:ring-darkmode3 font-medium rounded-lg text-sm px-3 py-2"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-whitemode1 3 bg-blue-500 dark:bg-blue-600 hover:bg-whitemode2 dark:hover:bg-darkmode1  dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-whitemode1 dark:focus:ring-darkmode3 font-medium rounded-lg text-sm px-3 py-2"
                    onClick={() => handleDownload(item.id)}
                  >
                    Download
                  </button>

                </td>
              </tr>
              )}

              )}
            {
                !loading && student.length==0 && <tr>
                    <td colSpan={6} className="text-center text-lg py-2">
                      هیچ داتایەکی خەزن نیە
                    </td>
                  </tr>
              }
          </tbody>
        </table>
      </div>
    </div>
  );
}

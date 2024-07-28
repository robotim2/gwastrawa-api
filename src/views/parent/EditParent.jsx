import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { useStateContext } from '../../utils/ContextProvider';
import Alerts from '../../components/Alert';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';


const EditParent = () => {

  const navigate = useNavigate();
  const obj = useParams();
  const id = obj.id;

  const [alert,setAlert] = useState(true);
  const { setWarning } = useStateContext();

  const [studentName, setstudentName] = useState('');
  const [Father, setFather] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [Class, setClass] = useState('');
  const [question1, setQuestion1] = useState(false);
  const [question2, setQuestion2] = useState(false);
  const [question3, setQuestion3] = useState(false);
  const [question4, setQuestion4] = useState(false);
  const [question5, setQuestion5] = useState(false);
  const [question6, setQuestion6] = useState(false);
  const [question7, setQuestion7] = useState(false);
  const [question8, setQuestion8] = useState(false);
  const [secondSchool, setsecondSchool] = useState('');
  const [Why, setWhy] = useState('');


  const [studentNameError, setstudentNameError] = useState('');
  const [PhoneNumberError, setPhoneNumberError] = useState('');
  const [ClassError, setClassError] = useState('');
  const [FatherError, setFatherError] = useState('');
  const [WhyError, setWhyError] = useState('');
  const [DateOfBirthError, setDateOfBirthError] = useState('');
  const [secondSchoolError, setsecondSchoolError] = useState('');

  const isArabicOrKurdish = (str) => {
    // Regular expression to match Arabic and Kurdish characters
    const arabicKurdishRegex = /[\u0600-\u06FF\u0750-\u077F]/;
    return arabicKurdishRegex.test(str);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    setstudentNameError('');
    setPhoneNumberError('');
    setClassError('');
    setFatherError('');
    setWhyError('');
    setsecondSchoolError('');
    setDateOfBirthError('');
    let hasError = false;


    if (!dob.trim() || dob.length < 6) {
        setDateOfBirthError('تکایە بەروارێکی دروست داخل بکە');
        hasError = true;
      }else if(dob.length > 100){
        setDateOfBirthError('تکایە بەروارەکە با دروست بێت');
        hasError = true;
      }

      if (!Why.trim() || !isArabicOrKurdish(Why)  || Why.length < 5) {
        setWhyError('تکایە هۆکارێکی گونجاو داخل بکە');
        hasError = true;
      }else if(Why.length > 500){
        setWhyError('تکایە هۆکارێکی گونجاو داخل بکە');
        hasError = true;
      }

      if (!Class.trim() || Class.length < 2) {
        setClassError('تکایە پۆڵێکی دروست داخل بکە');
        hasError = true;
      }else if(Class.length > 100){
        setClassError('تکایە پۆڵێکی دروست داخل بکە');
        hasError = true;
      }

      if (!PhoneNumber.trim() ||  PhoneNumber.length < 2) {
        setPhoneNumberError('تکایەژمارە مۆبایلێکی دروست داخل بکە');
        hasError = true;
      }else if(PhoneNumber.length > 100){
        setPhoneNumberError('تکایەژمارە مۆبایلێکی دروست داخل بکە');
        hasError = true;
      }

     // Validation checks for Arabic and Kurdish letters
       if (!studentName.trim() || !isArabicOrKurdish(studentName) || studentName.length < 2) {
           setstudentNameError('تکایە ناوەکە بە کوردی داخلی بکە و پیتەکانی زیاتر نەبێت لە ٢٥٠ پیت');
           hasError = true;
       }else if(studentName.length > 250){
         setstudentNameError('تکایە وشەی جۆرەکە بچووک بکەرەوە');
           hasError = true;
       }

       // Validation checks for Arabic and Kurdish letters
       if (!Father.trim() || !isArabicOrKurdish(Father) || Father.length < 1) {
        setFatherError('تکایە ناوەکە بە کوردی داخلی بکە و پیتەکانی زیاتر نەبێت لە ٢٥٠ پیت');
        hasError = true;
      }else if(Father.length > 250){
        setFatherError('تکایە وشەی جۆرەکە بچووک بکەرەوە');
          hasError = true;
      }

      if (!secondSchool.trim() || secondSchool.length < 1 ||  secondSchool.length > 300) {
        setsecondSchoolError('تکایە ناوی ئەو قوتابخانەی كە قوتابی بۆی دەگوازرێتەوە ناوێکی گونجاو بێت و پیتەکانی زیاتر نەبێت لە 400 پیت');
        hasError = true;
      }else if(secondSchool.length > 250){
        setsecondSchoolError('تکایە ناوی ئەو قوتابخانەی كە قوتابی بۆی دەگوازرێتەوە بچووک بکەرەوە');
          hasError = true;
      }

     if (hasError) {
         console.log("we got error " + hasError);
       }else{

      const payload = {
         'studentName' : studentName,
        'fatherName': Father,
        "phoneNumber": PhoneNumber,
        'date': dob,
        'class': Class,
        'quest1':question1,
        'quest2':question2,
        'quest3':question3,
        'quest4':question4,
        'quest5':question5,
        'quest6':question6,
        'quest7':question7,
        'quest8':question8,
        'secondSchool':secondSchool,
        'why':Why
      };

      console.log(payload);
      axiosClient.put('/students/'+id, payload, {
          headers: {
            'Content-Type': 'application/json',
          }
      })
      .then(({ data }) => {
          console.log(data);
          if(data.message){
            setWarning('هەڵسایت بە گۆرینی زانیاری گواستراوەکە')
              navigate('/parents')
          }
          if(data.error){
              alert(data.error)
          }
      })
      .catch((errors) => {
        console.error(errors.response.data.error.code);
      });
    }

}

  useEffect(()=>{
    axiosClient.get('/students/'+id, {
      headers: {
        'Content-Type': 'application/json',
      }
  })
  .then(({ data }) => {
      console.log(data);
      if(data.student){
        setstudentName(data.student.studentName);
        setFather(data.student.fatherName);
        setPhoneNumber(data.student.phoneNumber);
        setDob(data.student.date);
        setClass(data.student.class);
        setWhy(data.student.why);
        setQuestion1(data.student.quest1 ? true : false);
        setQuestion2(data.student.quest2  ? true : false);
        setQuestion3(data.student.quest3 ? true : false);
        setQuestion4(data.student.quest4  ? true : false);
        setQuestion5(data.student.quest5 ? true : false);
        setQuestion6(data.student.quest6 ? true : false);
        setQuestion7(data.student.quest7 ? true : false);
        setQuestion8(data.student.quest8 ? true : false);
        setsecondSchool(data.student.secondSchool);

      }
    })
  .catch((errors) => {
    console.error(errors.response.data.error.code);
  });
  }, [])

  return (
    <div className="rounded-xl bg-whitemode4/75 dark:bg-darkmode6/55 shadow-lg ring-1 ring-black/50 p-4 w-full">
           <Breadcrumb pageName="گۆرینی زانیاری گواستراو" title="گواستراوەکان" to='/parents' dir='rtl' />
           {alert && (
             <Alerts visible={alert} title="تکایە مەرجەکان پەیرەو بکە" setVisible={setAlert}>
               <p>ئەو داوکاراییانەی کە هێمای ئەستێرەیان لە لا هەیە پێویستە پڕ بکرێنەوە</p>
             </Alerts>
           )}

           <form onSubmit={handleSubmit} >
           <div className="flex flex-wrap -mx-3" dir='rtl'>
           <div className="w-full md:w-1/2 mt-2 px-3 text-right">
                 <label className="block text-sm font-medium dark:text-white text-black">
                   ناوی قوتابی<span className='text-danger text-lg'> *</span>
                 </label>
                 <input
                   dir='rtl'
                   className="mt-1 block w-full border text-black dark:text-white dark:placeholder:text-slate-200 border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                   type="text"
                   placeholder="ناوی قوتابی داخل بکە"
                   value={studentName}
                   onChange={(e) => setstudentName(e.target.value)}
                 />
                 {studentNameError && <span className='text-red-900'>{studentNameError}</span>}
               </div>
               <div className="w-full md:w-1/2 mt-2 px-3 text-right">
                 <label className="block text-sm font-medium dark:text-white text-black">
                   ناوی بەخێوکار<span className='text-danger text-lg'> *</span>
                 </label>
                 <input
                   dir='rtl'
                   className="mt-1 w-full border text-black  dark:text-white dark:placeholder:text-slate-200 border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                   type="text"
                   placeholder="ناوی بەخێوکار داخل بکە"
                   value={Father}
                   onChange={(e) => setFather(e.target.value)}
                 />
                 {FatherError && <span className='text-red-900'>{FatherError}</span>}
               </div>
             </div>

             <div className="flex flex-wrap -mx-3 mt-5" dir='rtl'>
                  <div className="w-full md:w-1/2 mt-2 px-3 text-right">

                    {/* the questions */}
                    <label className="block text-sm font-medium dark:text-white text-black">
                    1/بەگشتی لە سیستەمی قوتابخانە ڕازیت؟
                    </label>

                    <label className="block text-sm font-medium mt-2 dark:text-white text-black">
                    2/بەگشتی لە كارگێری قوتابخانە ڕازیت؟
                    </label>

                    <label className="block text-sm font-medium mt-2 dark:text-white text-black">
                    3/لە ئاست و هەڵسوكەوتی مامۆستاكان ڕازیت؟
                    </label>

                    <label className="block text-sm font-medium mt-2 dark:text-white text-black">
                    4/ئایا ڕازیت لە خواردنەكانی قوتابخانە؟
                    </label>

                    <label className="block text-sm font-medium mt-2 dark:text-white text-black">
                    5/ئایا لە هاتوچۆی قوتابخانە ڕازیت؟
                    </label>

                    <label className="block text-sm font-medium mt-2 dark:text-white text-black">
                    6/ئایا لە كرێی خوێندن و قیستی قوتابخانە ڕازیت؟
                    </label>

                    <label className="block text-sm font-medium mt-2 dark:text-white text-black">
                    7/ئایا لە هەڵسوكەوتی پرسگە و ڕێنمایكارانی قوتابخانە ڕازیت؟
                    </label>

                    <label className="block text-sm font-medium mt-2 dark:text-white text-black">
                    8/لە كاتی پەیوەندیكردن بە قوتابخانە یاخود سەردانیكرندنت بۆ قوتابخانە ڕازیت؟
                    </label>
                  </div>
                  <div className="w-full md:w-1/2  px-3 text-right">
                  {/* the inputs */}

                  <div className="flex">
                      <label className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600 dark:text-white"
                        value="true"
                        checked={question1 === true}
                        onChange={() => setQuestion1(true)}
                      />
                      <span className="ml-2 text-black dark:text-slate-200">بەڵێ</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600  dark:text-white"
                        value="false"
                        checked={question1 === false}
                        onChange={() => setQuestion1(false)}
                      />
                      <span className="ml-2 text-black dark:text-slate-200">نەخێر</span>
                    </label>
                  </div>

                  <div className="flex mt-1">
                      <label className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600"
                        value="true"
                        checked={question2 === true}
                        onChange={() => setQuestion2(true)}
                      />
                      <span className="ml-2 text-black dark:text-slate-200">بەڵێ</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600"
                        value="false"
                        checked={question2 === false}
                        onChange={() => setQuestion2(false)}
                      />
                      <span className="ml-2 text-black dark:text-slate-200">نەخێر</span>
                    </label>
                  </div>

                  <div className="flex mt-1">
                      <label className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600  dark:text-white"
                        value="true"
                        checked={question3 === true}
                        onChange={() => setQuestion3(true)}
                      />
                      <span className="ml-2 text-black dark:text-slate-200">بەڵێ</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600  dark:text-white"
                        value="false"
                        checked={question3 === false}
                        onChange={() => setQuestion3(false)}
                      />
                      <span className="ml-2 text-black dark:text-slate-200">نەخێر</span>
                    </label>
                  </div>

                  <div className="flex mt-1">
                      <label className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600  dark:text-white"
                        value="true"
                        checked={question4 === true}
                        onChange={() => setQuestion4(true)}
                      />
                      <span className="ml-2 text-black dark:text-slate-200">بەڵێ</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600  dark:text-white"
                        value="false"
                        checked={question4 === false}
                        onChange={() => setQuestion4(false)}
                      />
                      <span className="ml-2 text-black dark:text-slate-200">نەخێر</span>
                    </label>
                  </div>

                  <div className="flex mt-1">
                      <label className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600  dark:text-white"
                        value="true"
                        checked={question5 === true}
                        onChange={() => setQuestion5(true)}
                      />
                      <span className="ml-2 text-black dark:text-slate-200">بەڵێ</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600  dark:text-white"
                        value="false"
                        checked={question5 === false}
                        onChange={() => setQuestion5(false)}
                      />
                      <span className="ml-2 text-black dark:text-slate-200">نەخێر</span>
                    </label>
                  </div>

                  <div className="flex mt-1">
                      <label className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600  dark:text-white"
                        value="true"
                        checked={question6 === true}
                        onChange={() => setQuestion6(true)}
                      />
                      <span className="ml-2 text-black dark:text-slate-200">بەڵێ</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600  dark:text-white"
                        value="false"
                        checked={question6 === false}
                        onChange={() => setQuestion6(false)}
                      />
                      <span className="ml-2 text-black dark:text-slate-200">نەخێر</span>
                    </label>
                  </div>

                  <div className="flex mt-1">
                      <label className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600  dark:text-white"
                        value="true"
                        checked={question7 === true}
                        onChange={() => setQuestion7(true)}
                      />
                      <span className="ml-2 text-black dark:text-slate-200">بەڵێ</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600  dark:text-white"
                        value="false"
                        checked={question7 === false}
                        onChange={() => setQuestion7(false)}
                      />
                      <span className="ml-2 text-black dark:text-slate-200">نەخێر</span>
                    </label>
                  </div>

                  <div className="flex mt-1">
                      <label className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600  dark:text-white"
                        value="true"
                        checked={question8 === true}
                        onChange={() => setQuestion8(true)}
                      />
                      <span className="ml-2 text-black dark:text-slate-200">بەڵێ</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600  dark:text-white"
                        value="false"
                        checked={question8 === false}
                        onChange={() => setQuestion8(false)}
                      />
                      <span className="ml-2 text-black dark:text-slate-200">نەخێر</span>
                    </label>
                  </div>


                  </div>
             </div>


             <div className="flex flex-wrap -mx-3 mt-3" dir='rtl'>
                <div className="w-full md:w-2/4 mt-2 px-3 text-right">
                    <label className="block text-sm font-medium dark:text-white text-black">
                    ناوی ئەو قوتابخانەی كە قوتابی بۆی دەگوازرێتەوە <span className='text-danger text-lg'> *</span>
                    </label>
                    <input
                    dir='rtl'
                    className="mt-1 block w-full border text-black  dark:text-white dark:placeholder:text-slate-200 border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                    type="text"
                    placeholder="ناوی ئەو قوتابخانەی كە قوتابی بۆی دەگوازرێتەوە لێرە داخل بکە"
                    value={secondSchool}
                    onChange={(e) => setsecondSchool(e.target.value)}
                    />
                    {secondSchoolError && <span className='text-red-900'>{secondSchoolError}</span>}
                </div>
            </div>

             <div className="flex flex-wrap -mx-3" dir='rtl'>
               <div className="w-full md:w-2/4 mt-2 px-3 text-right">
                 <label className="block text-sm font-medium dark:text-white text-black">
                   ژمارە مۆبایل <span className='text-danger text-lg'> *</span>
                 </label>
                 <input
                   dir='rtl'
                   className="mt-1 block w-full border text-black  dark:text-white dark:placeholder:text-slate-200 border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                   type="text"
                   placeholder="ژمارە مۆبایلەکە داخل بکە"
                   value={PhoneNumber}
                   onChange={(e) => setPhoneNumber(e.target.value)}
                 />
                 {PhoneNumberError && <span className='text-red-900'>{PhoneNumberError}</span>}
               </div>
               <div className="w-full md:w-1/4 mt-2 px-3 text-right">
                 <label className="block text-sm font-medium dark:text-white text-black">
                   پۆل<span className='text-danger text-lg'> *</span>
                 </label>
                 
                 <select  dir='rtl'
                   className="mt-1 w-full border text-black  dark:text-white dark:placeholder:text-slate-200 border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                   type="text"
                   placeholder="پۆلی داخل بکە"
                   value={Class}
                   onChange={(e) => setClass(e.target.value)}>
                      <option value='یەکەم'>
                        یەکەم
                      </option>
                      <option value='دووەم'>
                        دووەم
                      </option>
                      <option value='سیێەم'>
                        سیێەم
                      </option>
                      <option value='چوارەم'>
                        چوارەم
                      </option>
                      <option value='پێنجەم'>
                        پێنجەم
                      </option>
                      <option value='شەشەم'>
                        شەشەم
                      </option>
                      <option value='حەوتەم'>
                        حەوتەم
                      </option>
                      <option value='هەشتەم'>
                        هەشتەم
                      </option>
                 </select>
                 {ClassError && <span className='text-red-900'>{ClassError}</span>}
               </div>
               <div className="w-full md:w-1/4 mt-2 px-3 text-right">
               <label htmlFor='date' className="block text-sm font-medium dark:text-white text-black">
                   بەروار <span className='text-danger text-lg'> *</span>
                 </label>
                 <input
                    id='date'
                   dir='rtl'
                   className="mt-1 w-full border text-black  dark:text-white dark:placeholder:text-slate-200 border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                   type="date"
                   placeholder="بەروار داخل بکە"
                   value={dob}
                   onChange={(e) => setDob(e.target.value)}
                 />
                 {DateOfBirthError && <span className='text-red-900'>{DateOfBirthError}</span>}
               </div>
             </div>
                <div dir='rtl'>
                  <label className="block text-sm font-medium dark:text-white text-black">
                  هۆكاری گواستنەوەی قوتابی چیە؟<span className='text-danger text-lg'> *</span>
                  </label>
                  <textarea className="w-full text-black  dark:text-white border dark:placeholder:text-slate-200 border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70 mt-3 px-3 text-right" placeholder='هۆكاری گواستنەوەی قوتابی لێرە بنوسە'
                  value={Why}
                  onChange={(e) => setWhy(e.target.value)}
                  >

                  </textarea>
                  {WhyError && <span className='text-red-900'>{WhyError}</span>}

                </div>

             <div className="flex justify-center mt-4">
               <button
                 className="w-full md:w-auto bg-slate-400 dark:bg-slate-400/90 dark:hover:bg-main3/80 text-black font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 hover:bg-blue-600"
                 type="submit"
               >
                 گۆرین
               </button>
             </div>
           </form>
         </div>
    );
};

export default EditParent;





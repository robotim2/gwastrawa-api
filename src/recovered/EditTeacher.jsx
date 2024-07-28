import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { useStateContext } from '../../../contexts/ContextProvider';
import axiosClient from '../../../axios-client';
import Alerts from '../../../components/Alert';
import { useNavigate, useParams } from 'react-router-dom';


const EditTeacher = () => {

  const navigate = useNavigate();

  const [alert,setAlert] = useState(true);
  const {  setNotification } = useStateContext();
    
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subject, setSubject] = useState('');
  const [dateEmployingWork, setDateEmployingWork] = useState('');
  const [dob, setDob] = useState('');
  const [lessons, setLessons] = useState('');
  const [dateStartingWork, setDateStartingWork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [classes, setClasses] = useState('');
  const [gender, setGender] = useState(0);

  const [NameError, setNameError] = useState('');
  const [SubjectError, setSubjectError] = useState('');
  const [PasswordError, setPasswordError] = useState('');
  const [EmailError, setEmailError] = useState('');
  const [DateOfBirthError, setDateOfBirthError] = useState('');

  const { id } = useParams();
  const number = parseInt(id);
  useEffect(()=>{
    axiosClient.get('teachers/'+number)
    .then(({data})=>{
      console.log(data)
      if(data.teacher){
        setName(data.teacher.name)
        setEmail(data.teacher.email)
        setPassword(data.teacher.password)
        setSubject(data.teacher.subject)
        setDateEmployingWork(data.teacher.employingDate)
        setDob(data.teacher.dateOfBirth)
        setLessons(data.teacher.lessons)
        setDateStartingWork(data.teacher.startingWork)
        setPhoneNumber(data.teacher.phoneNumber)
        setClasses(data.teacher.classes)
        setGender(data.teacher.gender)
      }
    })  
    .catch((error)=>{ 
      console.error(error);
    })
  },[])




  const isArabicOrKurdish = (str) => {
    // Regular expression to match Arabic and Kurdish characters
    const arabicKurdishRegex = /[\u0600-\u06FF\u0750-\u077F]/;
    return arabicKurdishRegex.test(str);
};

function isNotPassword(password) {
        console.log("testing letter " + !/[a-zA-Z]/.test(password) )
        console.log("testing number " + !/\d/.test(password) )
    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
        console.log('worked')
        return false;
      }

      return true;
}
  const handleSubmit = (e) => {
      e.preventDefault();
      setNameError('');
      setPasswordError('');
      setSubjectError('');
      setEmailError('');
      setDateOfBirthError('');
  
      let hasError = false;
  
  
      if (!dob.trim() || dob.length < 6) {
          setDateOfBirthError('تکایە بەروارێکی لە دایک بوونی دروست داخل بکە');
          hasError = true;
      } else if (dob.length > 100) {
          setDateOfBirthError('تکایە بەرواری لە دایک بوونەکە بە دروست بێت');
          hasError = true;
      }
  
      if (!password.trim() || !isNotPassword(password) || password.length < 8) {
          setPasswordError('تکایە پاسۆردەکە با لە نێوان ٨ بۆ ٥٠ پیت بێت وە پیت و ژمارەشی تێدا بێت');
          hasError = true;
      } else if (password.length > 100) {
          setPasswordError('تکایە پاسۆردەکە بچووک بکەرەوە');
          hasError = true;
      }
  
      // Validation checks for Arabic and Kurdish letters
      if (!name.trim() || !isArabicOrKurdish(name)) {
          setNameError('تکایە ناوەکە بە کوردی داخلی بکە و پیتەکانی زیاتر نەبێت لە ٢٥٠ پیت');
          hasError = true;
      } else if (name.length > 250) {
          setNameError('تکایە وشەی جۆرەکە بچووک بکەرەوە');
          hasError = true;
      }
      // Validation checks for Arabic and Kurdish letters
      if (!subject.trim() || !isArabicOrKurdish(subject)) {
          setSubjectError('تکایە بابەتەکە بە کوردی داخلی بکە و پیتەکانی زیاتر نەبێت لە ٢٥٠ پیت');
          hasError = true;
      } else if (subject.length > 250) {
          setSubjectError('تکایە وشەی جۆرەکە بچووک بکەرەوە');
          hasError = true;
      }
  
      if (hasError) {
          console.log("we got error " + hasError);
      } else {
  
          const payload = {
              'name': name,
              'email': email,
              'password': password,
              'role_id': 5,
              'subject': subject,
              'employingDate': dateEmployingWork,
              'StartingWork': dateStartingWork,
              'dateOfBirth': dob,
              'lessons': lessons,
              'phoneNumber': phoneNumber,
              'classes': classes,
              'gender': parseInt(gender), // Convert gender to integer
          }
          console.log(payload);
  
          axiosClient.put('teachers/' + number, payload)
              .then(({ data }) => {
                  console.log(data);
                  if (data.message) {
                      setNotification('زانیاری مامۆستایەکەت دەستکاری کرد')
                      navigate('/teachers')
                  }
                  if (data.error) {
                      alert(data.error)
                  }
              })
              .catch((errors) => {
                  console.error(errors.response.data.error.code);
                  if (errors.response.data.error.code == 422) {
                      setEmailError(errors.response.data.error.message);
                  }
              });
      }
  
  }



  return (
    <div className="overflow-x-auto rounded-xl bg-slate-500/25 shadow-lg ring-1 ring-black/5 p-8" >
      <Breadcrumb pageName="زیادکردنی مامۆستا" Title="مامۆستاکان" to='/teachers' dir='rtl' />
      {alert && <Alerts visible={alert} message="ئەو داوکاراییانەی کە هێمای ئەستێرەیان لە لاهەیە پێویستە پڕ بکرێنەوە" setVisible={setAlert} />}
      <form onSubmit={handleSubmit} className="space-y-4 full-width">

      <div className="lg:flex lg:justify-between" dir='rtl'>
            <div className="w-full lg:w-1/2 mt-2 px-3 text-right">
                <label className="block text-sm font-medium dark:text-white text-black">ناوی چواری مامۆستا<span className='text-danger text-lg'> *</span></label>
                <input
                    dir='rtl'
                    className="mt-1 block w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                    type="text"
                    placeholder="ناوەکەی چواری داخل بکە"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />                            
                {NameError && <span className='text-red-600'>{NameError}</span>}

            </div>
            <div className="w-full lg:w-1/2 mt-2 px-3 text-right">
                <label className="block text-sm font-medium dark:text-white text-black">ئیمەیڵ<span className='text-danger text-lg'> *</span></label>
                <input
                    dir='rtl'

                    className="mt-1 w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                    type="email"
                    placeholder="ئیمەیڵەکە داخل بکە"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                {EmailError && <span className='text-red-600'>{EmailError}</span>}

            </div>
        </div>
      <div className="lg:flex lg:justify-between" dir='rtl'>
            <div className="w-full lg:w-1/2 mt-2 px-3 text-right">
                <label className="block text-sm font-medium dark:text-white text-black">پاسۆورد<span className='text-danger text-lg'> *</span></label>
                <input
                    dir='rtl'
                    className="mt-1 block w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                    type="text"
                    placeholder="پاسۆوردەکە داخل بکە"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                />
                {PasswordError && <span className='text-red-600'>{PasswordError}</span>}

            </div>
            <div className="w-full lg:w-1/2 mt-2 px-3 text-right">
                <label className="block text-sm font-medium dark:text-white text-black">ساڵی لە دایک بوون<span className='text-danger text-lg'> *</span></label>
                <input
                    dir='rtl'

                    className="mt-1 w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                    type="text"
                    placeholder="ساڵی لە دایک بوونی داخل بکە"
                    value={dob}
                    
                    onChange={(e) => setDob(e.target.value)}
                />
                {DateOfBirthError && <span className='text-red-600'>{DateOfBirthError}</span>}

            </div>
        </div>
        <div className="lg:flex lg:justify-between" dir='rtl'>
            <div className="w-full lg:w-1/2 mt-2 px-3 text-right">
                <label className="block text-sm font-medium dark:text-white text-black">ئەو بابەتەی دەیڵێتەوە <span className='text-danger text-lg'> *</span></label>
                <input
                    dir='rtl'
                    className="mt-1 block w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                    type="text"
                    placeholder="بابەتەکە داخل بکە"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />
                {SubjectError && <span className='text-red-600'>{SubjectError}</span>}

            </div>
            <div className="w-full lg:w-1/2 mt-2 px-3 text-right">

                <label className="block text-sm font-medium dark:text-white text-black">رەگەز <span className='text-danger text-lg'> *</span></label>
                <select
                      className="mt-1 w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 
                      focus:border-blue-500 sm:text-sm p-1 "
                      value={gender}
                      // required
                      onChange={(e) => setGender(e.target.value)}
                >
                  <option value={0} >Male</option>
                  <option  value={1}>Female</option>
                </select>
                  
            </div>
          </div>

      <div className="lg:flex lg:justify-between" dir='rtl'>
            <div className="w-full lg:w-1/2 mt-2 px-3 text-right">
            
                <label className="block text-sm font-medium dark:text-white text-black">ڕێکەوتی یەکەم دامەزراندن</label>
                <input
                    dir='rtl'
                    className="mt-1 block w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                    type="text"
                    placeholder="ڕێکەوتی یەکەم دامەزراندنی داخل بکە"
                    value={dateEmployingWork}
                    onChange={(e) => setDateEmployingWork(e.target.value)}
                    // required
                />
                
            </div>
            <div className="w-full lg:w-1/2 mt-2 px-3 text-right">
                <label className="block text-sm font-medium dark:text-white text-black">رێکەوتی بە دەست بەکاربوون لە قوتابخانە</label>
                <input
                    dir='rtl'
                    className="mt-1 block w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                    type="text"
                    placeholder="رێکەوتی بە دەست بەکاربوون لە قوتابخانەی داخل بکە"
                    value={dateStartingWork}
                    onChange={(e) => setDateStartingWork(e.target.value)}
                    // required
                />
            </div>
        </div>
      <div className="lg:flex lg:justify-between" dir='rtl'>
            <div className="w-full lg:w-1/2 mt-2 px-3 text-right">
                <label className="block text-sm font-medium dark:text-white text-black">ژمارەی مۆبایل</label>
                <input
                    dir='rtl'

                    className="mt-1 w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                    type="text"
                    placeholder="ژمارەی مۆبایل داخل بکە"
                    value={phoneNumber}
                    // required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
            
            <div className="w-full lg:w-1/2 mt-2 px-3 text-right">
                <label className="block text-sm font-medium dark:text-white text-black">بەشەوانەی لە هەفتەیەکدا</label>
                <input
                    dir='rtl'
                    className="mt-1 block w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                    type="text"
                    placeholder="بەشەوانەکەی داخل بکە"
                    value={lessons}
                    onChange={(e) => setLessons(e.target.value)}
                    // required
                />
            </div>
        </div>
      <div className="lg:flex lg:justify-between" dir='rtl'>
            <div className="w-full lg:w-1/2 mt-2 px-3 text-right">
                <label className="block text-sm font-medium dark:text-white text-black">ئەو پۆڵانەی وانەی تێدا دەڵێتەوە</label>
                <input
                    dir='rtl'
                    className="mt-1 block w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                    type="text"
                    placeholder="ئەو پۆڵانەی وانەی تێدا دەڵێتەوەی داخل بکە"
                    value={classes}
                    onChange={(e) => setClasses(e.target.value)}
                    // required
                />
            </div>
            
        </div>
     
              <div className="flex justify-center">
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

export default EditTeacher;

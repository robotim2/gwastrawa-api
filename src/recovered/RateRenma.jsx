import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { useStateContext } from '../../../contexts/ContextProvider';
import axiosClient from '../../../axios-client';
import { Link, useNavigate, useParams } from 'react-router-dom';

const results = {

  "F1Q1": {
    "title" :  "ڕێنماییكارى په‌‌روه‌‌رده‌‌یی زانیاری هه‌یه‌‌ له‌‌سه‌‌ر دیدگای ڕێنمایی، ئاراسته‌‌كردن و بنه‌‌ماكانیان.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data",
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
    ],
  },
  "F1Q2": {
    "title" :  "ڕێنماییكارى په‌‌روه‌‌رده‌‌یی زانیاری هه‌یه‌‌ له‌‌سه‌‌ر تیۆر و شێوازه‌‌كانی ڕێنماییكردنی ده‌‌روونی سه‌‌رده‌‌مییانه‌‌.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data", 
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
  ],
  },
  "F1Q3": {
    "title" :  "ڕێنماییكارى په‌‌روه‌‌رده‌‌یی زانیاری هه‌یه‌‌ له‌‌ تیۆر و شێوازه‌‌كانی ئاراسته‌‌كردنی په‌‌روه‌‌رده‌‌یی و پیشه‌‌یی سه‌‌رده‌‌میانه‌‌",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data", 
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
    ],
  },
  "F1Q4": {
    "title" :  "ڕێنماییكارى په‌‌روه‌‌رده‌‌یی زانیاری هه‌یه‌‌ له‌‌سه‌‌ر ڕه‌‌وشتی كار و رێنماییه‌‌ كارگێریه‌‌كانی تایبه‌‌ت به‌‌كاره‌‌كه‌‌ی.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data",
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
    ],
  },
  "F1Q5": {
    "title" :   "ڕێنماییكارى په‌‌روه‌‌یی زانیاری هه‌یه‌‌ له‌‌سه‌‌ر ئه‌‌و هۆكاره‌‌ ژینگه‌‌ییانه‌‌ی كه‌‌ كاریگه‌‌رییان له‌‌سه‌‌ر گه‌‌شه‌‌ی قوتابیان/ خوێندكاران هه‌یه‌‌.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data", 
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
    ],
  },
  "F1Q6": {
    "title" : "ڕێنماییكارى په‌‌روه‌‌رده‌‌یی زانیاری هه‌یه‌‌ له‌‌سه‌‌ر ته‌‌كنه‌‌لۆژیای په‌‌یوه‌‌ست به‌‌كاره‌‌كه‌‌ی.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data", 
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
    ],
  },
  "F1Q7": {
    "title" : "ڕێنماییكارى په‌‌روه‌‌رده‌‌یی زانیاری هه‌یه‌‌ له‌‌سه‌‌ر دارشتنی پلان و به‌‌داواچوون و هه‌ڵسه‌‌نگاندن.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data", 
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
    ],
  }
};

const SecondResults = {


  "T2Q1": {
    "title" : "ڕێنماییكارى په‌‌روه‌‌رده‌‌یی ده‌‌توانێت به‌‌شێوه‌‌یه‌‌كی كاریگه‌‌ر كارامه‌‌ییه‌‌كانی ڕێنمایی و ڕێگاكانی چاره‌‌سه‌‌ركردنی كێشه‌‌كان به‌‌كاربهێنێت.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data",
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
    ],
  },
  "T2Q2": {
    "title" : "ڕێنماییكارى په‌‌روه‌‌رده‌‌یی ده‌‌توانێت توێژینه‌‌وه‌‌ بكات و سه‌‌رچاوه‌‌  زانستییه‌‌كان به‌‌كاربهێنێت بۆ جێبه‌‌جێكردنی كاره‌‌كه‌‌ی.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data", 
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
  ],
  },
  "T2Q3": {
    "title" : "ڕێنماییكارى په‌‌روه‌‌رده‌‌یی ده‌‌توانێت پڕۆسه‌‌ی پێوانه‌‌ و هه‌‌ڵسه‌‌نگاندنه‌‌ ده‌‌روونی و په‌‌روه‌‌رده‌‌ییه‌‌كان ئه‌‌نجام بدات.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data", 
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
    ],
  },
  "T2Q4": {
    "title" : "ڕێنماییكارى په‌‌روه‌‌رده‌‌یی ده‌‌توانێت به‌‌ شێوه‌‌یه‌‌كی په‌‌روه‌‌رده‌‌یی ڕه‌‌چاوی جیاتاكی (الفروق الفردیه‌) له‌‌نێوان قوتابیاندا بكات.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data",
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
    ],
  },
  "T2Q5": {
    "title" : "ڕێنماییكارى په‌‌روه‌‌رده‌‌یی ده‌‌توانێت هاوكاری ده‌‌سته‌‌ی كارگێڕی مامۆستایان و خانه‌‌واده‌‌ی قوتابیان بكات له‌‌ سنووری كاره‌‌كه‌‌ی.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data", 
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
    ],
  },
  "T2Q6": {
    "title" : "ڕێنماییكارى په‌‌روه‌‌رده‌‌یی ده‌‌توانێت به‌‌شێوه‌‌یه‌‌كی كاریگه‌‌ر به‌‌شداری چالاكییه‌‌كانی قوتابخانه‌‌ بكات.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data", 
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
    ],
  },
  "T2Q7": {
    "title" : "ڕێنماییكارى په‌روه‌رده‌یى ده‌توانێت به‌ پلانێكى سه‌ركه‌وتوانه‌ كاره‌كانى ئه‌نجام بدات له‌ قوتابخانه‌دا.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data", 
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
    ],
  }
  
};
const ThirdResults = {

  "T3Q1": {
    "title" :  "ڕێنماییكارى په‌‌روه‌‌رده‌‌یی پابه‌‌نده‌‌ به‌‌ پاراستنی نهێنی كاره‌‌كه‌‌ی و زانیارییه‌‌كان.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data",
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
    ],
  },

  "T3Q2": {
    "title" : "ڕێنماییكارى په‌‌روه‌‌رده‌‌یی پابه‌‌نده‌‌ به‌هاوكارییكردن له‌‌گه‌‌ڵ دامه‌‌زراوه‌‌ په‌‌روه‌‌رده‌‌ییه‌‌كان و كۆمه‌‌ڵگه‌‌ی مه‌‌ده‌‌نی و ڕێكخراوه‌‌ په‌‌یوه‌‌ندیداره‌‌كان.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data",
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
    ],
  },
  "T3Q3": {
    "title" :  "ڕێنماییكارى په‌‌روه‌‌رده‌‌یی پابه‌‌نده‌‌ به‌‌ دادپه‌‌روه‌‌ری و یه‌‌كسانی له‌‌گه‌‌ڵ سه‌‌رجه‌‌م قوتابیاندا.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data",
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
    ],
  },
  "T3Q4": {
    "title" :  "ڕێنماییكارى په‌‌روه‌‌رده‌‌یی پابه‌‌نده‌‌ به‌‌به‌هێزكردنی به‌ها و ڕه‌‌فتاره‌‌ كۆمه‌‌ڵایه‌‌تی، نیشتمانی و په‌‌روه‌‌رده‌‌ییه‌‌كان له‌‌ قوتابخانه‌‌.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data",
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
    ],
  },
  "T3Q5": {
    "title" : "ڕێنماییكارى په‌‌روه‌‌رده‌‌یی پابه‌‌نده‌‌ به‌‌ خودهه‌‌ڵسه‌‌نگاندن و باشتركردنی ئه‌‌دای خۆی و به‌‌رزكردنه‌‌وه‌‌ی ڕاپۆرتی كاره‌‌كانی.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data",
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
    ],
  },
  "T3Q6": {
    "title" :   "ڕێنماییكارى په‌‌روه‌‌رده‌‌یی پابه‌‌نده‌‌ به‌‌ ڕه‌‌وشته‌‌ پیشه‌‌ییه‌‌كانی كاركردن.",
    "options": [1, 2, 3, 4, 5],
    "results": [
      "option 1 data",
      "option 2 data", 
      "option 3 data",
      "option 4 data",
      "option 5 data"
    ],
  },
}

const RateRenma = () => {

  const { setNotification } = useStateContext();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [DirectorName, setDirectorName] = useState('');
  const [dateEmployingWork, setDateEmployingWork] = useState('');
  const [dob, setDob] = useState('');
  const [city, setcity] = useState('');
  const [hill, setHill] = useState('');
  const [dateStartingWork, setDateStartingWork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState(0);
  const [Rasps, setRasps] = useState('');
  
  const [Rates, setRates] = useState([]);
  const [sendRates, setSendRates] = useState(1);
  const [Load, setLoading] = useState(true);



  const [selectedOptions, setSelectedOptions] = useState({}); // State to store selected options for the first set of questions
  const [selectedSecondOptions, setSelectedSecondOptions] = useState({}); // State to store selected options for the second set of questions
  const [selectedThirdOptions, setSelectedThirdOptions] = useState({}); // State to store selected options for the second set of questions
  const { id } = useParams();
  const number = parseInt(id);
  useEffect(()=>{
    
    axiosClient.get('staff/'+number)
    .then(({data})=>{
      console.log(data)
      if(data.staff){
        setName(data.staff.name)
        setSchoolName('کۆششی ئینگلیزی ناحکومی')
        setcity('هەولێر')
        setHill('هەولێری نوێ')
        setDateEmployingWork(data.staff.employingDate)
        setDob(data.staff.dateOfBirth)
        setDateStartingWork(data.staff.startingWork)
        setPhoneNumber(data.staff.phoneNumber)
        setGender(data.staff.gender)
        setDirectorName('کەنار شۆرۆ ')
      }
    })  
    .catch((error)=>{ 
      console.error(error);
    })

    // for rates with same role
    axiosClient.get('/get-type-rates/'+4)
    .then(({data})=>{
      console.log(data)
      setRates(data.rates)
      setLoading(false);
      setSendRates(data.rates[0].id)
      console.log(sendRates);
    })  
    .catch((error)=>{ 
      console.error(error);
    })


  },[])
    


  // Function to handle option selection for the first set of questions
  const handleSelectOption = (questionId, option) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [questionId]: option,
    }));
  };

  // Function to handle option selection for the second set of questions
  const handleSecondSelectOption = (questionId, option) => {
    setSelectedSecondOptions(prevState => ({
      ...prevState,
      [questionId]: option,
    }));
  };

  const handleThirdSelectOption = (questionId, option) => {
    setSelectedThirdOptions(prevState => ({
      ...prevState,
      [questionId]: option,
    }));
  };

  const getResult = (questionId) => {
    const selectedOption = selectedOptions[questionId];
    const question = results[questionId];
    if (selectedOption) {
      return question.results[selectedOption - 1]; // Return the result corresponding to the selected option
    } else {
      return ""; // Return empty string if no option is selected
    }
  };
  
  // Function to get result based on selected option for the second set of questions
  const getSecondResult = (questionId) => {
    const selectedOption = selectedSecondOptions[questionId];
    const question = SecondResults[questionId];
    if (selectedOption) {
      return question.results[selectedOption - 1]; // Error occurs here
    } else {
      return ""; // Return empty string if no option is selected
    }
  };

  const getThirdResult = (questionId) => {
    const selectedOption = selectedThirdOptions[questionId];
    const question = ThirdResults[questionId];
    if (selectedOption) {
      return question.results[selectedOption - 1]; // Error occurs here
    } else {
      return ""; // Return empty string if no option is selected
    }
  };
  // Function to calculate the sum of selected options for the first set of questions
  const calculateSum = () => {
    let sum = 0;
    Object.values(selectedOptions).forEach(option => {
      sum += parseInt(option) || 0; // Convert option to integer and add to sum
    });
    return sum;
  };

  // Function to calculate the sum of selected options for the second set of questions
  const calculateSecondSum = () => {
    let sum = 0;
    Object.values(selectedSecondOptions).forEach(option => {
      sum += parseInt(option) || 0; // Convert option to integer and add to sum
    });
    return sum;
  };

  // Function to calculate the sum of selected options for the second set of questions
  const calculateThirdSum = () => {
    let sum = 0;
    Object.values(selectedThirdOptions).forEach(option => {
      sum += parseInt(option) || 0; // Convert option to integer and add to sum
    });
    return sum;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Function to fetch the results for selected options
    const fetchResults = (selectedOptions) => {
      const resultsData = {};
      Object.keys(selectedOptions).forEach(questionId => {
        const selectedOption = selectedOptions[questionId];
        const question = results[questionId];
        if (selectedOption) {
          resultsData[questionId] = {
            option: selectedOption,
            result: question.results[selectedOption - 1] // Fetch the result corresponding to the selected option
          };
        }
      });
      return resultsData;
    };
  
    const fetchSecondResults = (selectedSecondOptions) => {
      const resultsData = {};
      Object.keys(selectedSecondOptions).forEach(questionId => {
        const secondSelectedOption = selectedSecondOptions[questionId];
        const question = SecondResults[questionId];
        if (secondSelectedOption) {
          resultsData[questionId] = {
            option: secondSelectedOption,
            result: question.results[secondSelectedOption - 1] // Fetch the result corresponding to the selected option
          };
        }
      });
      return resultsData;
    };
    const fetchThirdResults = (selectedThirdOptions) => {
      const resultsData = {};
      Object.keys(selectedThirdOptions).forEach(questionId => {
        const thirdSelectedOption = selectedThirdOptions[questionId];
        const question = ThirdResults[questionId];
        if (thirdSelectedOption) {
          resultsData[questionId] = {
            option: thirdSelectedOption,
            result: question.results[thirdSelectedOption - 1] // Fetch the result corresponding to the selected option
          };
        }
      });
      return resultsData;
    };
    

    const payload ={
      'name': name,
      'school':schoolName,
      'employingDate': dateEmployingWork,
      'dateOfBirth': dob,
      'city': city,
      'hill': hill,
      'StartingWork': dateStartingWork,
      'phone': phoneNumber,
      'gender': parseInt(gender),
      'rasps': Rasps,
      'Standard': fetchResults(selectedOptions),
      'Karama': fetchSecondResults(selectedSecondOptions),
      'Baha': fetchThirdResults(selectedThirdOptions),
      'on100' :calculateThirdSum() + calculateSecondSum() + calculateSum(),
      'fQuesLen': Object.keys(results).length,
      'sQuesLen': Object.keys(SecondResults).length,
      'tQuesLen': Object.keys(ThirdResults).length,
      'director': DirectorName,
      'ratedFileId': sendRates

    }
       console.log(payload)

    setNotification("هەڵسەنگاندنێکت دروست کرد")

    
    
    // ... data collection and form submission logic ...
    console.log(payload);
    axiosClient.post('/renma-data', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(saveDataResponse => {
      if (saveDataResponse.status === 200) {
        console.log('Data saved successfully:', saveDataResponse.data);
    
        axiosClient({
            url: '/download-renma',
            method: 'POST',
            responseType: 'blob',
        })
          .then(response  => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'RanmayRate.docx'); 
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            console.log(response);
            navigate('/staffs');
          })
          .catch(downloadError => {
            console.error('There was an error downloading the file:', downloadError);
          });
      } else {
        console.error('There was an error saving data:', saveDataResponse.statusText);
      }
    })
    .catch(error => {
      console.error('There was an error sending data:', error);
    });
}
  return (
    <div className="overflow-x-auto rounded-xl bg-slate-500/25 shadow-lg ring-1 ring-black/5 p-8" >
      <Breadcrumb pageName="هەڵسەنگاندنی ڕێنمایکار" Title="ئەندامەکان" to='/staffs' dir='rtl' />
      
      <form onSubmit={handleSubmit} className="space-y-4 full-width">
     
      <div className="lg:flex lg:justify-between" dir='rtl'>
        <div className="w-full mt-2 px-3 text-right">
            {!Load && (
                Rates.length > 0 ? (
                  <>
                    <label className="block text-sm font-medium dark:text-white text-black">جۆری هەڵسەنگاندن</label>   

                    <select
                  className="mt-1 w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 
                  focus:border-blue-500 sm:text-sm p-1 "
                  value={sendRates}
                  onChange={(e) => setSendRates(e.target.value)}
                  >
                        {Rates.map((rate) => (
                            <option key={rate.id} value={rate.id}>
                                {rate.name}
                            </option>
                        ))}
                    </select>
                  </>
                ) : (
                    <Link to="/ratings" className=' dark:bg-slate-200/70 dark:hover:bg-slate-500/70 bg-blue-300 p-1 rounded-md text-black'>هیچ هەڵسەنگاندێکت بۆ ڕێنمایکاری پەروەردەی نیە</Link>
                )
            )}
          </div>
        </div>

      <div className="lg:flex lg:justify-between" dir='rtl'>
            <div className="w-full lg:w-1/2 mt-2 px-3 text-right">
                <label className="block text-sm font-medium dark:text-white text-black">ناوی چواری ئەندام</label>
                <input
                    dir='rtl'
                    className="mt-1 block w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                    type="text"
                    placeholder="ناوەکەی داخل بکە"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    // required
                />
            </div>
            <div className="w-full lg:w-1/2 mt-2 px-3 text-right">
                <label className="block text-sm font-medium dark:text-white text-black">قوتابخانە</label>
                <input
                    dir='rtl'

                    className="mt-1 w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                    type="text"
                    placeholder="ناوی قوتابخانەکە داخل بکە"
                    value={schoolName}
                    // required
                    onChange={(e) => setSchoolName(e.target.value)}
                />
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
                <label className="block text-sm font-medium dark:text-white text-black">ساڵی لە دایک بوون</label>
                <input
                    dir='rtl'

                    className="mt-1 w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                    type="text"
                    placeholder="ساڵی لە دایک بوونی داخل بکە"
                    value={dob}
                    // required
                    onChange={(e) => setDob(e.target.value)}
                />
            </div>
        </div>
      <div className="lg:flex lg:justify-between" dir='rtl'>
            <div className="w-full lg:w-1/2 lg:mt-2 mt-3 px-3 text-right">
                <label className="block text-sm font-medium dark:text-white text-black">شوێنى قوتابخانە - خوێندنگا</label>
            <div className="lg:flex lg:justify-between   mt-1 align-middle items-center" dir='rtl'>
            <label className="block text-sm font-medium dark:text-white text-black">شار</label>
                <input
                    dir='rtl'

                    className="mt-1 lg:w-50 w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                    type="text"
                    placeholder="شارەکە داخل بکە"
                    value={city}
                    // required
                    onChange={(e) => setcity(e.target.value)}
                />
                <label className="block text-sm font-medium dark:text-white text-black">گوند</label>
                <input
                    dir='rtl'

                    className="mt-1 lg:w-50 w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                    type="text"
                    placeholder="گوندەکە داخل بکە"
                    value={hill}
                    // required
                    onChange={(e) => setHill(e.target.value)}
                />
            </div>
                
                
            </div>
        </div>
      <div className="lg:flex lg:justify-between" dir='rtl'>
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
        </div>
      <div className="lg:flex lg:justify-between" dir='rtl'>
           
            <div className="w-full lg:w-1/2 mt-2 px-3 text-right">
                <label className="block text-sm font-medium dark:text-white text-black">رەگەز</label>
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

        <div dir='rtl'>
          
      <h1 className='text-title-lg my-3 text-black dark:text-white'>زانين</h1>
      <table className="w-full table table-bordered bg-main3/60 border-collapse dark:bg-white rounded-md">
        <thead className='p-2 border-b'>
          <tr>
            <th className="p-2 text-black">ستاندارده‌كان</th>
            <th className="p-2 text-right text-black">نمرە 1 - 5</th>
            <th className="p-2 text-black">بەڵگەكان</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(results).map((questionId, index) => (
            <tr key={index} className='text-black'>
              <td className="py-2 w-100">{results[questionId].title}</td>
              <td className="py-2">
                <select
                  className="border border-slate-700 rounded-md focus:ring-blue-500 focus:border-blue-500 p-1 text-black"
                  onChange={(e) => handleSelectOption(questionId, e.target.value)}
                  value={selectedOptions[questionId] || ""}
                >
                  <option value="">Select</option>
                  {results[questionId].options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </td>
              <td className="py-2 ">{getResult(questionId)}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="mt-4">
      <h1 className='text-title-lg my-3 text-black dark:text-white'>كارامەييەكان</h1>
      <table className="w-full table table-bordered bg-main3/60 border-collapse dark:bg-white rounded-md">
        <thead className='p-2 border-b'>
          <tr>
            <th className="p-2 text-black">ستاندارده‌كان</th>
            <th className="p-2 text-right text-black">نمرە 1 - 5</th>
            <th className="p-2 text-black">بەڵگەكان</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(SecondResults).map((questionId, index) => (
            <tr key={index} className='text-black'>
              <td className="py-2 w-100">{SecondResults[questionId].title}</td>
              <td className="py-2">
              <select
                className="border border-slate-700 rounded-md focus:ring-blue-500 focus:border-blue-500 p-1 text-black"
                onChange={(e) => handleSecondSelectOption(questionId, e.target.value)}
                value={selectedSecondOptions[questionId] || ""}
              >
                <option value="">Select</option>
                {SecondResults[questionId].options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              </td>
              <td className="py-2 ">{getSecondResult(questionId)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>



    <div className="mt-4">
      <h1 className='text-title-lg my-3 text-black dark:text-white'>به‌هاو ڕه‌فتاره‌كان</h1>
      <table className="w-full table table-bordered bg-main3/60 border-collapse dark:bg-white rounded-md">
        <thead className='p-2 border-b'>
          <tr>
            <th className="p-2 text-black">ستاندارده‌كان</th>
            <th className="p-2 text-right text-black">نمرە 1 - 5</th>
            <th className="p-2 text-black">بەڵگەكان</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(ThirdResults).map((questionId, index) => (
            <tr key={index} className='text-black'>
              <td className="py-2 w-100">{ThirdResults[questionId].title}</td>
              <td className="py-2">
              <select
                className="border border-slate-700 rounded-md focus:ring-blue-500 focus:border-blue-500 p-1 text-black"
                onChange={(e) => handleThirdSelectOption(questionId, e.target.value)}
                value={selectedThirdOptions[questionId] || ""}
              >
                <option value="">Select</option>
                {ThirdResults[questionId].options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              </td>
              <td className="py-2 ">{getThirdResult(questionId)}</td>
            </tr>
          ))}
          <tr className='text-black'>
            <td className="py-2 font-bold">كۆى نمره‌ى  خودهه‌ڵسه‌نگاندنى به‌ڕێوه‌به‌ر  له‌(100) نمره‌.</td>
            <td className="py-2"></td>
            <td className="py-2 font-bold">{calculateThirdSum()+calculateSecondSum()+calculateSum()}</td>
          </tr>
        </tbody>
      </table>
    </div>

            <div className="w-full mt-2 px-3 text-right">
                <label className="block text-sm font-medium dark:text-white text-black">ڕاسپارده‌كان بۆ باشتربوون</label>
                <textarea
                    dir='rtl'
                    className="mt-1 block w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                    placeholder="  ڕاسپارده‌كان بۆ باشتربوون:"
                    value={Rasps}
                    onChange={(e) => setRasps(e.target.value)}
                    rows={6} // Adjust the number of rows as needed
                    // required
                />
            </div>
        </div>

        <div className="lg:flex lg:justify-between" dir='rtl'>
            <div className="w-full  mt-2 px-3 text-right">
                <label className="block text-sm font-medium dark:text-white text-black">ناوی بەرێوبەر</label>
                <input
                    dir='rtl'
                    className="mt-1 block w-full border text-black border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1 placeholder:text-black/70"
                    type="text"
                    placeholder="ناوی بەرێوبەر لێرە داخل بکە"
                    value={DirectorName}
                    onChange={(e) => setDirectorName(e.target.value)}
                    // required
                />
            </div>
            </div>

            {!Load && (
                Rates.length != 0 ? (
                  <div className="flex justify-center">
                <button
                    className="w-full md:w-auto bg-slate-400 dark:bg-slate-400/90 dark:hover:bg-main3/80 text-black font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 hover:bg-blue-600"
                    type="submit"
                >
                    هەڵسەنگاندن
                </button>
            </div>
                ) : (
                  <div className="flex justify-center">
                    <Link to="/ratings" className='
                    w-full md:w-auto bg-slate-400 dark:bg-slate-400/90 dark:hover:bg-main3/80
                     text-black font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 hover:bg-blue-600'>هیچ هەڵسەنگاندێکت بۆ رێنمایکار نیە</Link>
                  </div>
                )
            )}
              
      </form>
    </div>
  );
};

export default RateRenma;

// UserInfoForm.js
import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';
import { auth,db } from '../../firebase';
import { getDoc,doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';


export default function Consult({userId}) {
  const [user, loading, error] = useAuthState(auth);
  
  const [gender,setGender]=useState('');
  const [dob,setDob]=useState();
  
  
  const [isBooking, setIsBooking] = useState(false);
  
  const [alert, setAlert] = useState({ show: false, message: "", isSuccess: false });

  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);
  const [specialty, setSpecialty] = useState('');
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
       
        if (docSnap.exists()) {
          const data=docSnap.data();
          setGender(data.gender || '');
          setDob(data.dob || '');
          if (!data.gender || !data.dob) {
            alert("Please Update your Gender and date of birth in profile section");
          }
        } else {
          console.log('No such document!');
        }
      } catch (err) {
        console.error('Error fetching document:', err);
      } 
    };

    fetchUserData();
  }, [userId]);


  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/symptoms`);
        const result=await response.json();
        
        setSymptoms(result);
      } catch (err) {
        console.error('Error fetching symptoms:', err);
      }
    };

    fetchSymptoms();
  }, []);

  

  const handleDiagnosis = async () => {
    if (selectedSymptoms.length === 0) {
      setAlert({ show: true, message: 'Please select symptoms first!', isSuccess: false });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/diagnosis?symptoms=${JSON.stringify(selectedSymptoms)}&gender=${gender}&year_of_birth=${new Date(dob).getFullYear()}&language=en-gb`);
      const data = await response.json();
      setDiagnosis(data);
      setSpecialty(mapDiagnosisToSpecialty(data));
    } catch (err) {
      console.error('Error fetching diagnosis:', err);
      setAlert({ show: true, message: 'Failed to fetch diagnosis. Please try again.', isSuccess: false });
    }
  };


  const mapDiagnosisToSpecialty = (diagnosisData) => {
    if (diagnosisData.length > 0) {
      return diagnosisData[0].Specialisation.map(spec => spec.Name).join(', ');
    }
    return 'General Practitioner';
  };

 

  const handleBooking = () => {
    setIsBooking(true);
    setTimeout(() => {
      alert('Booking successful! Redirecting to payment gateway...');
      window.location.href = 'https://payment-gateway-url.com';
    }, 2000);
  };

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">User Information</h1>
        <form  className="space-y-4">
          

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-semibold">Select Symptoms:</label>
            <select multiple onChange={(e) => setSelectedSymptoms([...e.target.selectedOptions].map(o => o.value))} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              {symptoms.map(symptom => (
                <option key={symptom.ID} value={symptom.ID}>
                  {symptom.Name}
                </option>
              ))}
            </select>
          </div>


          <button
            type="button"
            onClick={handleDiagnosis}
            className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-700 transition duration-300"
          >
            Get Diagnosis
          </button>
          {diagnosis.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Possible Diagnosis</h2>
              {diagnosis.map(d => (
                <div key={d.Issue.ID} className="mb-4">
                  <h3 className="text-lg font-semibold">{d.Issue.Name}</h3>
                  <p>Accuracy: {d.Issue.Accuracy}%</p>
                </div>
              ))}
              <h2 className="text-xl font-bold text-gray-800 mt-4">Suggested Specialty: {specialty}</h2>
            </div>
          )}
        </form>

        {user && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Book a Consultation</h2>
            <button
              onClick={handleBooking}
              disabled={isBooking}
              className={`w-full py-2 px-4 rounded-lg font-semibold text-white ${isBooking ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} transition duration-300`}
            >
              {isBooking ? 'Booking...' : 'Book Now'}
            </button>
          </div>
        )}
      </div>

      {/* Alert Modal */}
      {alert.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`bg-white p-6 rounded-lg shadow-lg max-w-sm w-full`}>
            <h2 className={`text-lg font-bold ${alert.isSuccess ? 'text-green-600' : 'text-red-600'}`}>{alert.isSuccess ? 'Success' : 'Error'}</h2>
            <p className="mt-2">{alert.message}</p>
            <button
              onClick={closeAlert}
              className="mt-4 px-4 py-2 bg-de-york text-white rounded-lg hover:bg-salem transition duration-300"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
Consult.propTypes = {
  userId: PropTypes.string.isRequired,
};
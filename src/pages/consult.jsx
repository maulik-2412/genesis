// UserInfoForm.js

import { useState } from 'react';
import { auth,db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Consult() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", isSuccess: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (user) {
      try {
        const userDoc = doc(db, 'users', user.uid);
        await setDoc(userDoc, {
          name,
          age,
          contactNumber,
          address,
          email: user.email,
        });

        setAlert({ show: true, message: 'User information saved!', isSuccess: true });
      } catch (err) {
        setAlert({ show: true, message: 'Error saving information: ' + err.message, isSuccess: false });
      }
    } else {
      setAlert({ show: true, message: 'Please log in first!', isSuccess: false });
    }

    setIsSubmitting(false);
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-semibold">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSubmitting}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-semibold">Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              disabled={isSubmitting}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-semibold">Contact Number:</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
              disabled={isSubmitting}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-semibold">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              disabled={isSubmitting}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-lg font-semibold text-white ${isSubmitting ? 'bg-gray-400' : 'bg-de-york hover:bg-salem'} transition duration-300`}
          >
            {isSubmitting ? 'Saving...' : 'Save Information'}
          </button>
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

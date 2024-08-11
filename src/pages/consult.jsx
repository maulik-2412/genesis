// UserInfoForm.js

import { useState } from 'react';
import { auth,db } from '../../firebase'; // Import your Firebase configuration
import { doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Consult() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (user) {
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, {
        name,
        age,
        contactNumber,
        address,
        email: user.email
      });
      
      alert('User information saved!');
    } else {
      alert('Please log in first!');
    }
  };

  const handleBooking = () => {
   
    setIsBooking(true);
    setTimeout(() => {
      alert('Booking successful! Redirecting to payment gateway...');
      
      window.location.href = 'https://payment-gateway-url.com';
    }, 2000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>User Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div>
          <label>Contact Number:</label>
          <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <button type="submit">Save Information</button>
      </form>

      {user && (
        <div>
          <h2>Book a Consultation</h2>
          <button onClick={handleBooking} disabled={isBooking}>
            {isBooking ? 'Booking...' : 'Book Now'}
          </button>
        </div>
      )}
    </div>
  );
}

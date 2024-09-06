import  { useEffect, useState } from 'react';
import { db} from '../../firebase' 
import { doc,setDoc,getDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender:'',
    dob:''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
       console.log(docSnap.data());
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          setFormData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, 'users', userId);
      await setDoc(docRef, formData, { merge: true });
      setUserData(formData);
      alert('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
    <div className="text-gray-600">
        <p className="font-medium text-lg">User Profile </p>
        <p>Please fill out all the fields.</p>
    </div>
    <div className="lg:col-span-2">
      <form onSubmit={handleSubmit} className='grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5'>
        <div className='md:col-span-5'>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
          />
        </div>
        <div className='md:col-span-2'>
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
          />
        </div>
        <div className='md:col-span-5'>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
          />
        </div>
        <div className='md:col-span-3'>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
          />
        </div>
        <div className='md:col-span-3'>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
          />
        </div>
        <div className="md:col-span-5 text-right">
        <div className="inline-flex items-end">
        <button type="submit" className='bg-salem hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Update Profile</button>
        </div>
        </div>
      </form>
     
    </div>
    </div>
    </div>
    </div>
  );
};

Profile.propTypes = {
    userId: PropTypes.string.isRequired,
  };

export default Profile;

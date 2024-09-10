import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './navbar/navbar';
import Home from './pages/homepage';
import Login from './pages/login';
import SignIn from './pages/signin';
import FindDoctor from './pages/findDoctor';
import Consult from './pages/consult';
import RazorpayPayment from './components/RazorpayPayment';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; 
import Profile from './pages/profile';
import Pleaselogin from './pages/pleaselogin';

function App() {
  const [user, setUser] = useState(null);
  
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
       
        <Route path="/signin" element={<SignIn />} />
        <Route path="/findDoctor" element={<FindDoctor />} />
        
        <Route path="/payment" element={<RazorpayPayment />} /> 
        
        {user ? (
          <>
       <Route path="/profile" element={ <Profile userId={user.uid}/>} /> 
       <Route path="/consult" element={<Consult userId={user.uid} />} />
       </>
      ) : (
        <>
       <Route path="/login" element={<Login/>} /> 
       <Route path="/consult" element={<Pleaselogin />} />
       </>
      )}
      <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;





import {BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './navbar/navbar'
import Home from './pages/homepage'
import Login from './pages/login'
import SignIn from './pages/signin'
import FindDoctor from './pages/findDoctor'
import Consult from './pages/consult'

import RazorpayPayment from './components/RazorpayPayment'
// import Banner from './pages/banner'

function App() {
  
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/finddoctor" element={<FindDoctor />} />
      <Route path="/consult" element={<Consult />} />
      <Route path="/payment" element={<RazorpayPayment />} /> 
      </Routes>
    </Router>
    </>
  )
}

export default App

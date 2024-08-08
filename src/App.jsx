import {BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './navbar/navbar'
import Home from './pages/homepage'
import Login from './pages/login'
import Banner from './pages/banner'

function App() {
  
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/signin" element={<SignIn />} /> */}
      </Routes>
    </Router>
    </>
  )
}

export default App

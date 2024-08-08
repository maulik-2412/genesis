import {BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './navbar/navbar'
import Home from './pages/homepage'
import Login from './pages/login'

function App() {
  
  return (
    <>
       <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </>
  )
}

export default App

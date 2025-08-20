import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login"
import Doctors from "../pages/Doctors"
import MyAppointment from "../pages/MyAppointment"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify"
import Appointment from "../pages/Appointment"
import MyProfile from '../pages/MyProfile';
import About from "../pages/About"
import Contact from '../pages/Contact';
import { useAppContext } from '../context/AppContext';


function App() {

  const {userData}  = useAppContext();

  console.log(userData);

  return(

    <BrowserRouter>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/doctors" element={<Doctors />}/>
        <Route path="/my-appointment" element={ userData?.role=='admin'?<AdminDashboard/>:<MyAppointment/>}/>
        <Route path='/appointment/:docId' element={<Appointment/>}/>
        <Route path='/profile' element={<MyProfile/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>

      </Routes>
      <ToastContainer position="top-right" autoClose={5000} ></ToastContainer>
        <Footer/>
    </BrowserRouter>
  )
}

export default App

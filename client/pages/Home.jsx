import React, { useEffect, useState } from 'react'
import { FaCalendar, FaHeart, FaStar, FaUserShield } from 'react-icons/fa'
import { FaIdBadge } from 'react-icons/fa6'
import DoctorCard from "../components/DoctorCard";
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const {doctor, userData} = useAppContext();
  console.log(userData);

  console.log(doctor);

  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 md:px-24">
      <section className="flex justify-between  md:flex-row items-center w-full mt-18 bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Left Column - Text Content */}
        <div className="w-1/2 md:w-1/2 p-8 md:p-16 flex flex-col justify-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight">
            Discover Ancient
          </h2>
          <h3 className="text-3xl md:text-4xl font-semibold text-blue-800">
            Ayurvedic Wisdom
          </h3>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            Book consultations with certified Ayurvedic doctors and embark on your journey to holistic wellness through time-tested natural healing practices.
          </p>
          <button className="w-max bg-blue-600 inline text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition duration-300">
            
            Book an Appointment
          </button>
        </div>

        {/* Right Column - Image */}
        <div className="w-1/3 md:w-1/2 mr-12 ">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/ayurvedic-serenity-8yEuUCNDUYLTnA5midQGxS3GtfSgzf.png"

            alt="Ayurveda"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

      </section>

     {/* Featured Specialists Section */}
      <section className="w-full md:px-0 px-12 m-4">
        <div className='flex justify-between m-4'>

        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center md:text-left">
          Meet Our Featured Specialists
        </h2>
        <button  onClick={()=>navigate("/doctors")} className=' p-2 border rounded-2xl w-24'>see all</button>
        </div>
        
        <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-8">
      

          {doctor?.slice(0,8).map((d, index)=>(
            
            <div key={index}  onClick={()=>navigate(`/appointment/${d._id}`)}>
            <DoctorCard data={d} />

            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


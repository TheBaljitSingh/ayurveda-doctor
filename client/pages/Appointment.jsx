import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';
import axios from "../config/axios";
import {toast} from "react-toastify"


export default function Appointment() {

  //load from the state if not found then make an api to fetch it
  const {doctor} = useAppContext();

  const [currentDoctor, setCurrentDoctor] =useState(null);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  console.log(selectedDate, selectedTime);

  const {docId} = useParams();


const getNext7Days = () => {
  const days = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date();
    nextDay.setDate(today.getDate() + i);
    days.push({
      date: nextDay,
      day: nextDay.toLocaleDateString("en-US", { weekday: "short" }),
      formatted: nextDay.toLocaleDateString("en-GB").replace(/\//g, "-"), // YYYY-MM-DD for inputs
      
    });
  }

  return days;
};


  useEffect(()=>{

    async function loadDoctor(){
      let foundDoctor = doctor.find(d=>d._id==docId);
      if(foundDoctor){
        setCurrentDoctor(foundDoctor);
      }else{
        try {
          const { data } = await axios.get(`api/v1/doctor/get-doctor/${docId}`);
          if(data.doctor){
            setCurrentDoctor(data.doctor);
          }else{
            setError(data.message)
          }
          
        } catch (error) {
          console.log(error.message);
          setError(error.message);
        }

      }
    }

    loadDoctor();

  },[docId, doctor]);


 
  if(!currentDoctor){

    return error?<p>{error}</p>:<p>Loading doctor...</p>
  }




  const next7Days = getNext7Days();
  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

  const handleBooking = async()=>{
 
    try {
      const {data} = await axios.post("api/v1/user/book-appointment", { docId, slotDate:selectedDate, slotTime:selectedTime})

       if(data.success){
      toast.success("slot booked");
      }else{
        toast.error(data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }

   
  }

  
  return (
 <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden p-6 flex flex-col md:flex-row gap-6 m-4">
  {/* Doctor Image */}
  <div className="flex-shrink-0 w-full md:w-1/3">
    <img
      src={currentDoctor.image}
      alt={currentDoctor.name}
      className="w-full h-80 object-fit rounded-xl"
    />
  </div>

  {/* Doctor Details */}
  <div className="flex-1">
    <h2 className="text-2xl font-semibold text-gray-800">{currentDoctor.name}</h2>
    <p className="text-gray-600 text-sm">
      {currentDoctor.degree} • {currentDoctor.speciality} • {currentDoctor.experience} yrs exp
    </p>
    <div className="mt-3">
      <h3 className="font-semibold text-gray-700">About</h3>
      <p className="text-gray-600 text-sm">{currentDoctor.about}</p>
    </div>
    <p className="mt-3 text-lg font-medium text-blue-600">₹{currentDoctor.fees}</p>
  </div>

{/* Booking Section */}


      <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Slot</h2>
 <div className="max-w-3xl mx-auto  bg-gray-50 rounded-2xl shadow-sm p-6">

      {/* Dates */}
      <div className="flex gap-4 mb-4 overflow-x-auto">
        {next7Days.map((day) => (
          <button
            key={day.formatted}
            onClick={() => setSelectedDate(day.formatted)}
            className={`flex flex-col items-center px-4 py-2 rounded-lg border ${
              selectedDate === day.formatted ? "bg-blue-600 text-white" : "bg-white text-gray-800 border-gray-200"
            }`}
          >
            <span className="font-medium">{day.day}</span>
            <span className="text-sm">{day.date.getDate()}/{day.date.getMonth() + 1}</span>
          </button>
        ))}
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div>
          <h3 className="text-gray-700 mb-2">Select Time:</h3>
          <div className="flex flex-wrap gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedTime === time ? "bg-blue-600 text-white" : "bg-white text-gray-800 border-gray-200"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

    {selectedDate && selectedTime && (
      <div className='flex justify-center items-center mt-4'>

      <button
        onClick={handleBooking}
        className=" w-32 h-12 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
        >
        Book
      </button>
        </div>
    )}

    </div>

</div>
  )
}

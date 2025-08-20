import React from 'react'
import axios from '../config/axios'
import { useEffect } from 'react'
import { useState } from 'react';
import {toast} from "react-toastify"

export default function MyAppointments() {

  const [appointments, setAppointments] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [limit, setLimit] = useState(5);
  
  
  useEffect(()=>{
    
    async function myAppointmnet(){


      try {
        const {data} = await axios.get(`/api/v1/user/all-appointments?limit=${limit}&page=${page}`);
        console.log(data);
        if(data){
          setTotalPage(data.totalPages);
        }
        if(data.appointments){
          setAppointments(data.appointments);
        }
      } catch (error) {
        console.log(error);

      }


    }

    myAppointmnet();

  },[page]);


  const handleCancelAppointment = async(id)=>{

    try {
      const {data} = await axios.post("/api/v1/user/cancel-appointment",{appointmentId:id});

      if(data.message){
        toast.success(data.message);
      }
      
    } catch (error) {
      console.log(error);
    }

  }


    if (!appointments || appointments.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-6 p-6 bg-gray-50 rounded-2xl shadow-sm text-center text-gray-500">
        No appointments booked yet.
      </div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">My Appointments</h2>
      <hr className="mb-4" />

      <div className="space-y-3 mb-4">
        {appointments.map((app) => (
          <div
            key={app._id}
            className="flex  md:flex-row items-start md:items-center gap-3 bg-white rounded-xl shadow-sm p-3 border border-gray-100"
          >
            {/* Doctor Image */}
            <img
              src={app.docData?.image || "/doctor-placeholder.png"}
              alt={app.docData?.name}
              className="w-16 h-16 rounded-full object-cover border border-gray-200"
            />

            {/* Appointment Details */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">
                {app.docData?.name}
              </h3>
              <p className="text-md text-gray-500">
                {app.docData?.speciality} • {app.docData?.degree}
              </p>

              <div className="mt-1 flex flex-col sm:flex-row sm:gap-4 text-md text-gray-600">
                <p>
                  <span className="font-medium">Date:</span> {app.slotDate}
                </p>
                <p>
                  <span className="font-medium">Time:</span> {app.slotTime}
                </p>
                <p>
                  <span className="font-medium">Fees:</span> ₹{app.amount}
                </p>
              </div>

              <div className="mt-1 flex gap-1 flex-wrap">
                {app.cancelled ? (
                  <span className="px-2 py-0.5 text-[10px] rounded-full bg-red-100 text-red-700">
                    Cancelled
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[10px] rounded-full bg-green-100 text-green-700">
                    Active
                  </span>
                )}

                {app.isCompleted && (
                  <span className="px-2 py-0.5 text-[10px] rounded-full bg-blue-100 text-blue-700">
                    Completed
                  </span>
                )}

                {!app.payment && (
                  <span className="px-2 py-0.5 text-[10px] rounded-full bg-yellow-100 text-yellow-700">
                    Pending Payment
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
          <div className="flex gap-2 mt-2 self-end">
            {!app.cancelled && !app.isCompleted && (
              <button
              onClick={()=>handleCancelAppointment(app._id)}
              className="hover:cursor-pointer px-3 py-1 text-md bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                Cancel
              </button>
            )}
            {!app.payment && !app.cancelled && (
              <button className="px-3 py-1 text-md bg-blue-500 text-white rounded-md hover:bg-bluegreen-600 transition">
                Pay Now
              </button>
            )}
          </div>

           
          </div>
        ))}
        <div className='flex justify-center items-center gap-4  mt-4 '>
          <button 
          disabled={page===1}
          onClick={()=>setPage(prev=>prev-1)}
          className='hover:text-blue-400 hover:cursor-pointer'>
            Prev
            </button>
              <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
            <button 
            disabled={page===totalPages}
            onClick={()=>setPage(prev=>prev+1)}
            className='hover:text-blue-400 hover:cursor-pointer'>
              Next
            </button>
        </div>


      </div>
    </div>
  )
}

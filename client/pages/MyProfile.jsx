import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import {toast} from "react-toastify"
import axios from "../config/axios"
import { useEffect } from 'react';

export default function Profile() {



  const { userData, getUserData } = useAppContext();
  const [isEdit, setIsEdit] = useState(false);
  const [gender, setGender] = useState(userData?.gender || "");
  const [dob, setDob] = useState(userData?.dob || "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("gender", gender);
    formData.append("dob", dob);
    if(image){
      formData.append("image", image);
    }

    try {

      const {data} = await axios.post("/api/v1/user/update-profile", formData)

      if(data){
        getUserData();
        setIsEdit(false);
        setImage(null);
        toast.success("profile updated");

      }

      
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message||"something went wrong");
      
    }finally{
      setLoading(false);
    }
  };



  useEffect(()=>{
    if(userData){
      setGender(userData.gender||"");
      setDob(userData.dob||"")
    }
  },[userData]);


  if(!userData) return <p>Loading user profile...</p>
  
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-6 md:p-10 flex flex-col md:flex-row gap-8">
      
      {/* Profile Picture */}
      <div className="flex-shrink-0 w-full md:w-1/3 flex flex-col items-center gap-4">
        <img
          src={image ? URL.createObjectURL(image) : userData?.image || "/placeholder.png"}
          alt="profile"
          className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-full border-4  shadow-md"
        />
        {isEdit && (
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-gray-300 rounded-lg px-3 py-1 w-1/2 justify-center text-gray-700"
          />
        )}
      </div>

      {/* Profile Details */}
      <div className="flex-1 flex flex-col justify-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{userData?.name}</h2>
        <hr className="border-gray-300" />

        <div className="flex flex-col sm:flex-row sm:gap-4">
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="text-gray-600">{userData?.email}</span>
        </div>

        {userData?.speciality && (
          <p className="text-gray-700 font-medium">{userData?.speciality}</p>
        )}

        <div className="flex flex-col sm:flex-row sm:gap-4 items-start">
          <span className="font-semibold text-gray-700">Gender:</span>
          {isEdit ? (
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 "
            >
              <option value="">Select</option>
              <option value="Male" >Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <span className="text-gray-600">{userData?.gender}</span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-4 items-start">
          <span className="font-semibold text-gray-700">DOB:</span>
          {isEdit ? (
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <span className="text-gray-600">{userData?.dob }</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4">
          {isEdit ? (
            <button
              onClick={save}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-blue-700 transition duration-300"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-blue-600 transition duration-300"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

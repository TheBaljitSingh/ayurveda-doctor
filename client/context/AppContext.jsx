import { createContext, useContext, useEffect, useState } from "react";

import axios from "../config/axios"; // modify it later  
const AppContext = createContext();



export const AppProvider = ({children})=>{
    // define here all the states

  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctor, setDoctor] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const currencySymbol = "$";

  const getDoctors = async ()=>{
    try {
        const {data} = await axios.get(`api/v1/doctor/get-doctor`);
        if(data){
            setDoctor(data.doctor);
        }
    } catch (error) {
        console.log(error);
    }
  }

  const getUserData = async ()=>{
    try {
        const {data} = await axios.get(`api/v1/user/get-profile`);
        if(data){
            setUserData(data.user);
        }
    } catch (error) {
      console.log(error.message);
        
    }
  }

  

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      setAccessToken(token);
      setIsLoggedIn(true);
    }
    setLoading(false);
  },[]);
  
  const token = localStorage.getItem("token");
  useEffect(()=>{
    //for refreshing
    if(token){
        getUserData()
    }else{
        setUserData(null);
    }
  },[token]);

  useEffect(()=>{
    getDoctors();
  },[])


  const value = {
    accessToken,
    setAccessToken,
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    doctor,
    setDoctor,
    userData,
    setUserData,
    loading,
    setLoading,
    getUserData,
    currencySymbol,
    getDoctors
  }



    return <AppContext.Provider value = {value}>{children}</AppContext.Provider>
}

export const useAppContext = ()=>useContext(AppContext);
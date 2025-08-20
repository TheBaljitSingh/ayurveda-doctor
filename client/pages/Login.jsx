import React, { useContext, useState } from 'react'
import axios from "../config/axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
export default function Login() {

  const [currentPage, setCurrentPage] = useState('login');
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const {setAccessToken, setUser, setIsLoggedIn} = useAppContext();



  const handleEvent = (e)=>{
    const {name, value} = e.target;

    setFormData((prevData)=>{
      return {
        ...prevData,
        [name]:value
      }
    });
    
    
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    
    if(currentPage==='login'){

      try {
        const res = await axios.post("/api/v1/user/signin", formData);
        if(res){
          console.log("signin successfull", res);

          toast.success("sign in successfull");
          navigate("/")
          localStorage.setItem("token", res.data.accessToken);
          setAccessToken(res.data.accessToken);
          setUser(res.data.user);
          setIsLoggedIn(true); 

        }else{
          toast.error(res.data.message||"somthing went wrong");
        }
        
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
        return console.log(error.message);
        
      }
    }else{
     try {

       const res = await axios.post("/api/v1/user/signup", formData);
      if(res){

        toast.success("signup successfull");
        navigate("/login");
        setCurrentPage("login");
      }else{
        toast.error(res.data.message||"somthing went wrong");
      }
      
     } catch (error) {
      toast.error(error?.response?.data?.message ||error.message);
      return console.log(error.message);
      
     }
    }

    

    }
  
   
    
  
  

  
  console.log(formData);
  return (
      <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Ayurveda
          </a>
          {currentPage ==='login'?(<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@company.com"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    onChange={(e)=>handleEvent(e)}


                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    onChange={(e)=>handleEvent(e)}

                  />
                </div>
                <div className="flex items-center justify-between">
                
             
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleSubmit}
                >
                  Sign in
                </button>
                <div className='flex flex-row '>

                <p className="text-md  font-semibold text-gray-500">
                  Don’t have an account yet?
               
                     <span  className="font-medium text-blue-600 hover:underline hover:cursor-pointer"
                    onClick={()=>setCurrentPage("signup")  }> Click here</span>
                  </p>
                
                    </div>
              </form>
            </div>
          </div>):(
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                signup 
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >Your Name</label>
                  <input type="text" name='name' placeholder='Your Name'
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  onChange={(e)=>handleEvent(e)}



                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@company.com"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    onChange={(e)=>handleEvent(e)}


                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    onChange={(e)=>handleEvent(e)}

                  />
                </div>
                <div className="flex items-center justify-between">
                 
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
                <p className="text-md font-semibold text-gray-500">
                  already have account ? <span  className="font-medium text-blue-600 hover:underline hover:cursor-pointer"
                    onClick={()=>setCurrentPage("login")}>Click here</span>
              
                </p>
              </form>
            </div>
          </div>
          )}
        </div>
      </section>
    </div>
  )
}

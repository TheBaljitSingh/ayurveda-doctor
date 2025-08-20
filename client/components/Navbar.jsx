import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const {
    userData,
    isLoggedIn,
    setIsLoggedIn,
    setUser,
    setAccessToken,
    loading,
  } = useAppContext();
  
  console.log(userData);
  console.log(isLoggedIn);
  
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const dropDownRef = useRef();
  
  const Links = [
    { name: "Home", path: "/" },
    { name: "All Doctors", path: "/doctors" },
    { name: "About", path: "/about" },
    { name: "Contact us", path: "/contact" },
  ];
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setAccessToken(false);
    navigate("/login");
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  if (loading) return null;
  
  return (
    <>
      <nav className="bg-white border-b-4 sticky top-0 z-50">
        <div className="w-full  lg:max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between rounded-b-xl">
          {/* Brand Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 cursor-pointer"
          > <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            <div className="leading-tight">
              
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-600">
                
                Ayurveda<span className="text-black font-semibold"></span>
              </h1>
             
            </div>
          </div>

          {/* Desktop Links */}
          <div className=" md:flex items-center space-x-8 font-medium text-sm text-gray-700">
            {Links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative transition ${
                  currentPath === link.path
                    ? "text-black"
                    : "text-gray-800 hover:text-black"
                }`}
              >
                {link.name}
                {currentPath === link.path && (
                  <span className="absolute -bottom-1 left-0 flex items-center w-full h-[2px] bg-blue-300"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen((prev) => !prev)}>
              {menuOpen ? (
                <FaTimes className="text-xl text-gray-800 hover:cursor-pointer" /> //cross button
              ) : (
                <FaBars className="text-xl text-gray-800 hover:cursor-pointer" /> //menu button
              )}
            </button>
          </div>

          {/* Right User Section for Desktop, hidden md:block  relative */}
          <div className=" md:block relative" ref={dropDownRef}>
            {isLoggedIn ? (
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <img
                  src={userData?.image}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-sm font-medium">
                  Welcome, {userData?.name}
                </span>
              </div>
            ) : (
              <Link to="/login">
                <button className="hover:cursor-pointer bg-white px-5 py-2 rounded-full font-medium text-gray-800 shadow-lg hover:bg-gray-100 transition">
                  Sign In
                </button>
              </Link>
            )}

            {isLoggedIn && showDropdown && (
              <div className="absolute bg-gray-200 mt-4 w-48 rounded-md shadow-lg py-2 z-50">
                <Link
                  to="/profile"
                  onClick={() => setShowDropdown(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  to="/my-appointment"
                  onClick={() => setShowDropdown(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Appointments
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* FULLSCREEN Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed font-semibold pt-5 left-0 z-40 w-full h-screen bg-white flex flex-col items-center px-6 space-y-6 text-lg text-gray-700 md:hidden transition-all duration-300 ease-in-out">
          {Links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`transition ${
                currentPath === link.path ? "text-black" : "text-gray-800"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="text-gray-800"
              >
                My Profile
              </Link>
              <Link
                to="/my-appointments"
                onClick={() => setMenuOpen(false)}
                className="text-gray-800"
              >
                My Appointments
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button
                onClick={() => setMenuOpen(false)}
                className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;

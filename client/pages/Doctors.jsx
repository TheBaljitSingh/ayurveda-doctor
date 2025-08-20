import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const navigate = useNavigate();

  // Predefined filter options
  const specialities = [
    "Cardiology",
    "Neurology",
    "Dermatology",
    "Pediatrics",
    "Orthopedics",
  ];

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const { data } = await axios.get("/api/v1/doctor/get-doctor");
        setDoctors(data.doctor);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading doctors...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-medium">{error}</p>
    );

  // Filter doctors by selected speciality
  // const filteredDoctors = selectedSpeciality
  //   ? doctors.filter(
  //       (doc) =>
  //         doc.speciality.toLowerCase() === selectedSpeciality.toLowerCase()
  //     )
  //   : doctors;

  const filteredDoctors = selectedSpeciality
  ?doctors.filter((doc)=>doc.speciality.toLowerCase()===selectedSpeciality.toLowerCase())
  :doctors;

  return (
    <div className="max-w-7xl mx-auto p-6 flex gap-6">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white shadow-md rounded-xl p-6 flex flex-col gap-4 sticky top-18 h-fit">
        <h2 className="text-xl font-semibold mb-2">Filter by Speciality</h2>
        {specialities.map((spec) => (
          <button
            key={spec}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
              selectedSpeciality === spec
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() =>
              setSelectedSpeciality(selectedSpeciality === spec ? "" : spec)
            }
          >
            {spec}
          </button>
        ))}
        {/* Clear Filter Button */}
        {selectedSpeciality && (
          <button
            className="mt-2 w-full bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={() => setSelectedSpeciality("")}
          >
            Show All
          </button>
        )}
      </aside>

      {/* Doctor Grid */}
      <main className="flex-1 grid md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc._id}
            className="hover:cursor-pointer bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center transition-transform duration-200 hover:scale-105"
            onClick={() => navigate(`/appointment/${doc._id}`)}
          >
            <img
              src={doc.image}
              alt={doc.name}
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <h2 className="text-lg font-semibold">{doc.name}</h2>
            <p className="text-gray-600 text-sm">{doc.speciality}</p>
            <p className="text-gray-500 text-sm">{doc.experience} yrs exp</p>
            <p className="mt-2 text-blue-600 font-medium">₹{doc.fees}</p>
          </div>
        ))}
        {filteredDoctors.length === 0 && (
          <p className="col-span-full text-center text-gray-500 mt-10">
            No doctors found for this speciality.
          </p>
        )}
      </main>
    </div>
  );
}

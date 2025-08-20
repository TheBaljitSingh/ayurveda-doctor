export default function DoctorCard({ data }) {
  return (
    <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      
      {/* Doctor Image */}
      <div className="h-64 w-full overflow-hidden">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Doctor Info */}
      <div className="p-4 space-y-2">
        <div  className={`text-sm  ${data.available?"text-blue-500":"text-red-500"} font-medium`}>
          {data.available ? "Available" : "Not Available"}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">
          {data.name}
        </h3>
        <p className="text-gray-600">{data.speciality}</p>
      </div>

      {/* Optional: Book Appointment Button */}
      <div className="px-4 pb-4">
        <button className="w-full hover:cursor-pointer bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Profile
        </button>
      </div>

    </div>
  );
}

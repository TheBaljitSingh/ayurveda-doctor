import React from 'react'

export default function About() {
  return (
    <div>
        <section className="bg-gray-50 py-16 h-screen">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          About Us
        </h2>
        <p className="text-gray-600 mb-8">
          Welcome to Ayurveda, your trusted online platform for booking appointments with certified doctors. 
          We aim to make healthcare simple, fast, and reliable, giving you access to top medical professionals from the comfort of your home.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Trusted Doctors</h3>
            <p className="text-gray-600">
              All our doctors are verified and experienced, ensuring you get the best medical advice.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-gray-600">
              Schedule appointments in just a few clicks with our simple and intuitive platform.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Our support team is available around the clock to assist you with any queries or concerns.
            </p>
          </div>
        </div>
      </div>
    </section>


    </div>
  )
}

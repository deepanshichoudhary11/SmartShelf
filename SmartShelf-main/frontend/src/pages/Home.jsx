import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col justify-between">
      {/* Navbar */}
      <div className="bg-blue-600 text-white p-4 text-2xl font-bold">
        SmartShelf
      </div>

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white bg-opacity-40 backdrop-blur-lg p-10 rounded-2xl shadow-xl text-center w-[90%] max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 leading-snug tracking-tight mb-4">
            Helping customers flag empty shelves <br /> for faster restocking by staff.
          </h1>
          <p className="text-gray-700 mb-6">
            Choose your role to get started and make Walmart shopping better for everyone!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/customer')}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              I’m a Customer
            </button>
            <button
              onClick={() => navigate('/staff')}
              className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-500 transition"
            >
              I’m Staff
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-blue-600 text-white text-sm text-center p-3 font-medium tracking-wide">
        SmartShelf helps Walmart ensure real-time shelf updates for better customer satisfaction.
      </div>
    </div>
  );
};

export default Home;

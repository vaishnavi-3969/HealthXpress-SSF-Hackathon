import React, { useEffect, useState } from 'react';
import { FiUser, FiBriefcase, FiShoppingCart, FiPhone, FiMail, FiLogOut, FiUserPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const cardVariants = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

const Home = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  
  useEffect(() => {
    // Fetch user's location
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        // Fetch nearby hospitals using Mapbox API
        fetchNearbyHospitals(latitude, longitude);
      },
      error => {
        console.error(error);
      }
    );
  }, []);

  const fetchNearbyHospitals = async (latitude, longitude) => {
    try {
      const mapboxApiKey = 'pk.eyJ1IjoidmFpc2huYXZpMzk2OSIsImEiOiJjbGpiOGhqd2UxdGdyM2hxbm1vMDZxa2JqIn0.nsJYS6QQxVmEr2ZajJywYQ';
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=${longitude},${latitude}&access_token=${mapboxApiKey}`
      );
      const data = await response.json();

      setNearbyHospitals(data.features);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-green-400 to-yellow-300 flex flex-col items-center">
      <div className="text-black text-center p-8">
        <img src={Logo} alt="HealthXpress Logo" className="w-24 mx-auto mb-2" />
        <h1 className="text-4xl font-semibold mb-4 text-yellow-200">Welcome to HealthXpress</h1>
        {isAuthenticated ? (
          <div>
          <div className="flex justify-end items-center mb-4">
            <p className="text-lg mr-4">Welcome, {user.name}!</p>
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="text-white hover:text-gray-300"
            >
              <FiLogOut className="text-2xl" />
            </button>
          </div>
          <div className="flex gap-4 justify-center mb-6">
          <Link to="/individual" className="w-64">
            <motion.div
              variants={cardVariants}
              className="cursor-pointer p-6 rounded-xl shadow-2xl bg-gray-900 text-white w-full text-center transition-transform transform hover:scale-105"
            >
              <FiUser className="text-4xl mb-2 text-blue-500 mx-auto" />
              <p className="text-xl font-semibold">Individual</p>
              <p className="text-sm mt-2">
                Book appointments, access health info, and more.
              </p>
            </motion.div>
          </Link>
          <Link to="/hospital" className="w-64">
            <motion.div
              variants={cardVariants}
              className="cursor-pointer p-6 rounded-xl shadow-2xl bg-gray-900 text-white w-full text-center transition-transform transform hover:scale-105"
            >
              <FiBriefcase className="text-4xl mb-2 text-green-500 mx-auto" />
              <p className="text-xl font-semibold">Hospital</p>
              <p className="text-sm mt-2">
                Manage appointments, provide telemedicine, and more.
              </p>
            </motion.div>
          </Link>
          <Link to="/pharmacy" className="w-64">
            <motion.div
              variants={cardVariants}
              className="cursor-pointer p-6 rounded-xl shadow-2xl bg-gray-900 text-white w-full text-center transition-transform transform hover:scale-105"
            >
              <FiShoppingCart className="text-4xl mb-2 text-yellow-500 mx-auto" />
              <p className="text-xl font-semibold">Pharmacy</p>
              <p className="text-sm mt-2">
                Order medications, manage inventory, and more.
              </p>
            </motion.div>
          </Link>
        </div>
        <div className="mt-4 text-xl text-red-500">
          <a href="tel:911">
            <FiPhone className="inline-block mr-2" />
          </a>
          <a href="mailto:emergency@healthxpress.com">
            <FiMail className="inline-block ml-2" />
          </a>
        </div>
        </div>
        ) : (
          <p className="text-lg mb-4">
            Your Journey to Better Health Begins Here. Choose your role to get started:
          </p>
        )}
        
        <p className="mt-6 text-sm italic">
          Discover hospitals and healthcare providers near you for immediate assistance.
        </p>
        {!isAuthenticated && (
         <div>
         <button
            onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
            className="bg-blue-500 hover:bg-blue-600 text-black py-2 px-4 rounded-md mt-4"
          >
            <div className='flex'>
            <FiUserPlus className="mr-2" /> Login
            </div>
          </button>
         </div>
        )}
         {/* Display Nearby Hospitals */}
         {userLocation && (
          <div className="mt-6">
            <h2 className="text-xl mb-2">Nearby Hospitals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyHospitals.map((hospital, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="whileHover"
                  whileTap="whileTap"
                  className="bg-white p-4 rounded-lg shadow-md transition-all transform"
                >
                  <FiBriefcase className="text-4xl mb-2 text-green-500 mx-auto" />
                  <h3 className="text-xl font-semibold mb-1">{hospital.text}</h3>
                  <p className="text-sm">{hospital.properties.address}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;

import React from 'react';
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
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-green-400 to-yellow-300 flex flex-col items-center">
      <div className="text-white text-center p-8">
        <img src={Logo} alt="HealthXpress Logo" className="w-24 mx-auto mb-2" />
        <h1 className="text-4xl font-semibold mb-4">Welcome to HealthXpress</h1>
        {isAuthenticated ? (
          <div className="flex justify-end items-center mb-4">
            <p className="text-lg mr-4">Welcome, {user.name}!</p>
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="text-white hover:text-gray-300"
            >
              <FiLogOut className="text-2xl" />
            </button>
          </div>
        ) : (
          <p className="text-lg mb-4">
            Your Journey to Better Health Begins Here. Choose your role to get started:
          </p>
        )}
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
        <p className="mt-6 text-sm italic">
          Discover hospitals and healthcare providers near you for immediate assistance.
        </p>
        {!isAuthenticated && (
          <button
            onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
          >
            <FiUserPlus className="mr-2" /> Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;

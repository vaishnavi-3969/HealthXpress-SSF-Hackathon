import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaHospitalAlt, FaPhone } from 'react-icons/fa';

const hospitalsData = [
  {
    name: 'City General Hospital',
    address: '123 Main Street, City',
    phone: '123-456-7890',
  },
  {
    name: 'Community Medical Center',
    address: '456 Park Avenue, Town',
    phone: '987-654-3210',
  },
];

const EmergencySupport = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-yellow-600 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-md shadow-md text-gray-800"
        >
          <div className="flex items-center mb-4">
            <FaExclamationTriangle className="text-3xl text-red-500 mr-2" />
            <p className="text-xl font-semibold">Emergency Support</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Nearby Hospitals</h3>
            {hospitalsData.map((hospital, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-lg mb-2">
                <h4 className="text-lg font-semibold">{hospital.name}</h4>
                <p>{hospital.address}</p>
                <p>Phone: {hospital.phone}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Call Ambulance
            </button>
            <a href="tel:911" className="flex items-center text-red-500">
              <FaPhone className="text-lg mr-1" />
              <span>Call 911</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmergencySupport;

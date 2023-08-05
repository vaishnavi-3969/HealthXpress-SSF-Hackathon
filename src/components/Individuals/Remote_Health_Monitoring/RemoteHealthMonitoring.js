import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaExclamationTriangle, FaClock } from 'react-icons/fa';

const RemoteHealthMonitoring = () => {
  const [vitalSigns, setVitalSigns] = useState([
    { timestamp: '2023-08-01T08:00:00', heartRate: 70, bloodPressure: '120/80' },
    { timestamp: '2023-08-01T09:00:00', heartRate: 75, bloodPressure: '122/82' },
    { timestamp: '2023-08-01T10:00:00', heartRate: 82, bloodPressure: '125/85' },
  ]);

  const handleBandIntegration = (bandName) => {
    alert(`Integrating ${bandName} fitness band`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-green-400 to-yellow-300 text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-md shadow-md text-gray-800"
        >
          <div className="flex items-center mb-4">
            <FaHeartbeat className="text-3xl text-red-500 mr-2" />
            <p className="text-xl font-semibold">Remote Health Monitoring Portal</p>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Heart Rate Trend</h3>
            {/* Display heart rate data */}
            <div className="chart">
              {vitalSigns.map(sign => (
                <div key={sign.timestamp} className="chart-bar">
                  <div className="chart-bar-fill" style={{ height: `${sign.heartRate}px` }}></div>
                  <p className="chart-label">{sign.timestamp.split('T')[1]}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              <FaClock className="mr-1" /> Last 3 hours
            </p>
          </div>
          <div className="mt-8">
            {vitalSigns.length > 0 && (
              <div className="flex items-center">
                <FaExclamationTriangle className="text-red-500 text-xl mr-2" />
                <p className="text-red-500">
                  Alert: Abnormal heart rate detected in the last reading.
                </p>
              </div>
            )}
          </div>
          <div className="mt-8">
            <p className="text-lg font-semibold mb-2">Integrate Fitness Bands:</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
              onClick={() => handleBandIntegration('Fitbit')}
            >
              Connect Fitbit
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={() => handleBandIntegration('Apple Watch')}
            >
              Connect Apple Watch
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RemoteHealthMonitoring;

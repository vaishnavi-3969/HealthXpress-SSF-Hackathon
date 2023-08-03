import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiClock, FiHome, FiUser, FiLogOut } from 'react-icons/fi';
import Confetti from 'react-confetti';

const OnlineBooking = () => {
    const { user,logout } = useAuth0();
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const mockAvailableSlots = [
    '9:00 AM - 10:00 AM',
    '11:00 AM - 12:00 PM',
    '2:00 PM - 3:00 PM',
    '4:00 PM - 5:00 PM',
  ];

    useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        fetchNearbyHospitals(latitude, longitude);
        setAvailableSlots(mockAvailableSlots);
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

      const hospitalsWithDistances = data.features.map(hospital => ({
        ...hospital,
        distance: calculateDistance(
          latitude,
          longitude,
          hospital.center[1],
          hospital.center[0]
        )
      }));
      setNearbyHospitals(hospitalsWithDistances);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  const handleSlotSelection = (hospital) => {
    setSelectedHospital(hospital);
    setShowDialog(true);
  };

  const handleTimeSlotSelection = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleConfirmBooking = () => {
    setIsBookingConfirmed(true);
    setShowDialog(false);
  };
  const handleCloseDialog = () => {
    setSelectedHospital(null);
    setSelectedTimeSlot(null);
    setIsBookingConfirmed(false); 
    setShowDialog(false);
  };
  const cardVariants = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-green-400 to-yellow-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Link to="/individual" className="text-blue-600 hover:underline">
              <FiHome className="text-xl text-gray-900" />
            </Link>
            <div className="bg-black bg-opacity-50 rounded-lg p-2">
              <motion.img
                src={user.picture}
                alt="Profile"
                className="h-8 w-8 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="text-blue-600 hover:underline text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {user.name}
              </motion.span>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
          </div>
          <div className="text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => logout()}>
            <FiLogOut className="text-xl" />
          </div>
        </div>
        {userLocation && (
          <div className="mt-6">
          <div className="flex items-center justify-center mb-4">
                    <h1 className="text-4xl font-bold text-red-600 mb-8 animate-wavy text-center">
                        Online Appoinment Booking
                    </h1>
                </div>
            <h2 className="text-xl mb-2">Nearby Hospitals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyHospitals.map((hospital, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="whileHover"
                  whileTap="whileTap"
                  className="bg-gray-800 p-4 rounded-lg shadow-md transition-all transform cursor-pointer"
                  onClick={() => handleSlotSelection(hospital, '9:00 AM - 10:00 AM')}
                >
                  <Link to="#" className="flex flex-col h-full text-white">
                    <h3 className="text-xl font-semibold mb-1">{hospital.text}</h3>
                    <p className="text-sm mb-2">{hospital.properties.address}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-400">
                        <FiMapPin className="mr-1" />
                        <p className="text-xs">{hospital.distance.toFixed(2)} km</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiPhone className="text-gray-400 text-sm" />
                        <FiClock className="text-gray-400 text-sm" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dialog Box */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Select Time Slot</h2>
            <p>Select a time slot for your booking at {selectedHospital && selectedHospital.text}:</p>
            <div className="mt-4">
              {availableSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 rounded-md cursor-pointer ${
                    selectedTimeSlot === slot ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                  onClick={() => handleTimeSlotSelection(slot)}
                >
                  {slot}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md" onClick={handleCloseDialog}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleConfirmBooking}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Confirmed */}
      {isBookingConfirmed && (
        <div className="fixed inset-0 flex items-center justify-center">
          <Confetti width={500} height={500} />
          <div className="bg-white rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Booking Confirmed</h3>
            <p>Your appointment at {selectedHospital && selectedHospital.text} on {selectedSlot} is confirmed!</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleCloseDialog}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default OnlineBooking;

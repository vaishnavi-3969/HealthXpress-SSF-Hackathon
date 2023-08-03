import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi';
import Confetti from 'react-confetti';

const OnlineBooking = () => {
    const { user } = useAuth0();
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  
    useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

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

  const handleSlotSelection = (hospital, slot) => {
    setSelectedHospital(hospital);
    setSelectedSlot(slot);
    setShowDialog(true);
  };

  const handleConfirmBooking = () => {
    setIsBookingConfirmed(true);
    setShowDialog(false);
  };
  
  const cardVariants = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-green-400 to-yellow-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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

      {/* Styled Dialog Box */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Confirm Booking</h2>
            <p>Confirm your booking at {selectedHospital && selectedHospital.text} on {selectedSlot}?</p>
            <div className="mt-4 flex justify-end">
              <button className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md" onClick={() => setShowDialog(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleConfirmBooking}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confetti and Booking Confirmed */}
      {isBookingConfirmed && (
        <div className="fixed inset-0 flex items-center justify-center">
          <Confetti width={500} height={500} />
          <div className="bg-white rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Booking Confirmed</h3>
            <p>Your appointment at {selectedHospital && selectedHospital.text} on {selectedSlot} is confirmed!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineBooking;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi';

const OnlineBooking = () => {
  const { user } = useAuth0();
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);

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

      // Calculate distances and setNearbyHospitals
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
    const R = 6371; // Radius of the Earth in km
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
                >
                  <Link to={`/hospital/${hospital.id}`} className="flex flex-col h-full text-white">
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
    </div>
  );
};

export default OnlineBooking;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaHome, FaHospitalSymbol,  } from 'react-icons/fa';
import { RiBookLine } from 'react-icons/ri';
import Confetti from 'react-confetti';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { useAuth0 } from '@auth0/auth0-react';

const DoctorCard = ({ doctor, onBookSession }) => {
  const { picture, name, email, cell, type, fees, qualification, ratings, reviews, comments } = doctor;

  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer text-white"
      whileHover={{ scale: 1.05 }}
    >
      <img src={picture.large} alt={name.first} className="h-32 w-32 mx-auto rounded-full mb-4" />
      <h3 className="text-xl font-semibold mb-1 text-center">{`${name.first} ${name.last}`}</h3>
      <p className="text-gray-200 mb-1 text-center">{email}</p>
      <p className="text-gray-200 text-center">{cell}</p>
      <p className="mt-4 text-blue-200 text-center">Type: {type}</p>
      <p className="text-green-200 text-center">Fees per session: ₹{fees}</p>
      <p className="text-gray-200 text-center">Qualification: {qualification}</p>
      <div className="mt-4 text-center">
        <p className="text-yellow-400">Ratings: {ratings}</p>
        <p className="text-yellow-400">Reviews: {reviews}</p>
        <p className="text-yellow-400">Comments: {comments}</p>
      </div>
      <div className="mt-4 flex justify-center">
        <button className="px-4 py-2 bg-blue-600 rounded-md" onClick={() => onBookSession(doctor)}>
          <RiBookLine className="inline-block mr-2" />
          Book Session
        </button>
      </div>
    </motion.div>
  );
};

const TimeSlot = ({ slot, isSelected, onSelect }) => {
  return (
    <div
      className={`px-4 py-2 rounded-md cursor-pointer ${
        isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200'
      }`}
      onClick={onSelect}
    >
      {slot}
    </div>
  );
};

const Telemedicine = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=20');
      const data = await response.json();
      const doctorList = data.results.map((result) => ({
        picture: result.picture,
        name: result.name,
        email: result.email,
        cell: result.cell,
        type: 'General Practitioner',
        fees: Math.floor(Math.random() * 1000) + 500,
        qualification: 'MD, MBBS',
        ratings: Math.floor(Math.random() * 5) + 1,
        reviews: Math.floor(Math.random() * 100),
        comments: ['Great doctor! ', 'Very knowledgeable. ', 'Highly recommended. '],
        availableSlots: [
          '9:00 AM - 10:00 AM',
          '11:00 AM - 12:00 PM',
          '2:00 PM - 3:00 PM',
          '4:00 PM - 5:00 PM',
        ],
      }));

      setDoctors(doctorList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookSession = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };
  const { user } = useAuth0();
  const handleConfirmBooking = () => {
    setIsBookingConfirmed(true);
    setSelectedDoctor(null);
    setSelectedSlot(null);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-500 via-green-400 to-yellow-300">
      <div className="max-w-7xl mx-auto ">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FaHospitalSymbol className="text-2xl mr-2" />
            <h1 className="text-3xl font-bold text-white">Telemedicine - Find a Doctor</h1>
          </div>
          <div className="flex items-center">
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
          </div>
        </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} onBookSession={handleBookSession} />
          ))}
        </div>
      </div>
      {selectedDoctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Select Time Slot</h2>
            <p>Select a time slot for your session with {selectedDoctor.name.first}:</p>
            <div className="mt-4">
              {selectedDoctor.availableSlots.map((slot, index) => (
                <TimeSlot
                  key={index}
                  slot={slot}
                  isSelected={selectedSlot === slot}
                  onSelect={() => handleSlotSelection(slot)}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md" onClick={() => setSelectedDoctor(null)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleConfirmBooking}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {isBookingConfirmed && (
        <div className="fixed inset-0 flex items-center justify-center">
          <Confetti width={500} height={500} />
          <div className="bg-white rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Booking Confirmed</h3>
            <p>Your appointment on {selectedSlot} is confirmed!</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => setIsBookingConfirmed(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Telemedicine;

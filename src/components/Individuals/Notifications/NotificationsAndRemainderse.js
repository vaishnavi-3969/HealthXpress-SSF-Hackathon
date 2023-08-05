import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBell } from 'react-icons/fa';
import soundFile from '../../../assets/notification.wav';

const NotificationsAndReminders = () => {
  const [notifications, setNotifications] = useState([
    'Upcoming appointment at 10:00 AM.',
    'Take your medication dose now.',
    'Remember to drink water.'
  ]);

  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);

  const playNotificationSound = () => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotificationIndex((prevIndex) =>
        (prevIndex + 1) % notifications.length
      );
      playNotificationSound();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-500 via-green-400 to-yellow-300">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-md shadow-lg text-white max-w-md w-full"
      >
        <div className="flex items-center mb-4">
          <FaBell className="text-2xl mr-2" />
          <p className="text-lg font-semibold">Notifications</p>
        </div>
        <p className="text-gray-300">
          {notifications[currentNotificationIndex]}
        </p>
      </motion.div>
    </div>
  );
};

export default NotificationsAndReminders;

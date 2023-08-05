import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { FaUser, FaEdit, FaCheck } from 'react-icons/fa';

const UserProfile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [editMode, setEditMode] = useState(false);
  const [updatedFields, setUpdatedFields] = useState({
    name: user.name,
    email: user.email,
  });
  const [profileUpdated, setProfileUpdated] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleFieldChange = (field, value) => {
    setUpdatedFields({ ...updatedFields, [field]: value });
  };

  const handleSaveClick = () => {
    setProfileUpdated(true);
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-green-400 to-yellow-300 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-md shadow-md"
        >
          <div className="flex items-center mb-4">
            <FaUser className="text-2xl mr-2" />
            <p className="text-lg font-semibold">User Profile</p>
          </div>
          {isAuthenticated ? (
            <div>
              <div className="flex items-center mb-4">
                <img
                  src={user.picture}
                  alt="Profile"
                  className="h-16 w-16 rounded-full"
                />
                <div className="ml-4">
                  <p className="text-xl font-semibold">{user.name}</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              {editMode ? (
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Name</label>
                    <input
                      type="text"
                      value={updatedFields.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      className="border rounded-lg px-3 py-2 w-full focus:outline-none"
                    />
                  </div>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mr-2"
                    onClick={handleSaveClick}
                  >
                    Save Changes
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={handleEditClick}
                >
                  <FaEdit className="mr-2" />
                  Edit Profile
                </button>
              )}
              {profileUpdated && (
                <div className="bg-green-100 p-4 rounded-lg mt-4">
                  <div className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" />
                    <p className="text-green-500">Profile Successfully Updated!</p>
                  </div>
                </div>
              )}
              <div className="mt-8">
                <p className="text-lg font-semibold">Additional Information</p>
                <p className="text-gray-600">Address: {user.address || 'N/A'}</p>
                <p className="text-gray-600">Phone: {user.phone || 'N/A'}</p>
              </div>
              <div className="mt-8">
                <p className="text-lg font-semibold">Settings</p>
                <div className="flex items-center mt-2">
                  <input type="checkbox" className="mr-2" />
                  <p className="text-gray-600">Opt in for email communications</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Please log in to view your profile.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;

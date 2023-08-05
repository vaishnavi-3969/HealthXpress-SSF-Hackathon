import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const crowdfundingPosts = [
  {
    id: 1,
    targetAmount: 10000,
    gatheredAmount: 2500,
    topic: 'Medical Treatment for Children',
    description:
      'Support medical treatment for children in need. Your contribution can help provide essential healthcare services to those who need it most.',
    image: 'https://plus.unsplash.com/premium_photo-1661774059755-6360e96d2f6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80',
  },
  {
    id: 2,
    targetAmount: 8000,
    gatheredAmount: 1500,
    topic: 'Emergency Medical Relief',
    description:
      'Help provide emergency medical relief to individuals affected by disasters and crises. Your contribution can save lives and provide immediate medical support.',
    image: 'https://media.istockphoto.com/id/1270275522/photo/medical-team-do-cpr-to-injured-patient-on-gurney.jpg?s=1024x1024&w=is&k=20&c=_alGUNd_wM9cIoWZ6nm1jRYh3r-G6qhMGZHvTUXXfH0=', 
  },
  {
    id: 3,
    targetAmount: 12000,
    gatheredAmount: 3500,
    topic: 'Cancer Treatment Support',
    description:
      'Raise funds to support cancer patients with medical expenses. Your donation can help provide treatments, medications, and emotional support.',
    image: 'https://images.unsplash.com/photo-1576765974004-1fcdcab09015?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=878&q=80',
  },
];

const CrowdFunding = () => {
  const [donationAmount, setDonationAmount] = useState(500);

  const handleDonationChange = (e) => {
    setDonationAmount(e.target.value);
  };

  const handleDonate = (postId) => {
    const paymentLink = `https://buy.stripe.com/test_4gw29B1YL3Wx6mk6op`;
    window.open(paymentLink, '_blank'); // Open in a new tab
  };

  const { user } = useAuth0();

  return (
    <div className="bg-gradient-to-b from-blue-500 via-green-400 to-yellow-300 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full mb-8">
            <div className="flex items-center space-x-2">
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
          {crowdfundingPosts.map((post) => (
            <div key={post.id} className="mb-8 w-full sm:w-1/2 md:w-1/2 px-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">{post.topic}</p>
                  <p className="text-gray-500">
                    ${post.gatheredAmount} of ${post.targetAmount} gathered
                  </p>
                </div>
                <div className="mt-4">
                  <img src={post.image} alt="Cause" className="w-full h-48 object-cover rounded-lg" />
                </div>
                <p className="mt-4">{post.description}</p>
                <div className="mt-4 h-2 bg-gray-300 rounded-lg">
                  <div
                    className="h-full bg-blue-500 rounded-lg"
                    style={{ width: `${(post.gatheredAmount / post.targetAmount) * 100}%` }}
                  />
                </div>
                <div className="flex items-center mb-4">
                  <span className="text-lg font-semibold mr-2">Rs.</span>
                  <input
                    type="number"
                    className="border rounded-lg px-2 py-1 w-24 text-lg focus:outline-none"
                    value={donationAmount}
                    onChange={handleDonationChange}
                  />
                </div>
                <motion.button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleDonate(post.id)}
                >
                  Donate Now
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrowdFunding;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDumbbell, FaUtensils, FaCheckCircle } from 'react-icons/fa';
import Confetti from 'react-confetti';

const FitnessWellnessCommunity = () => {
  const [activeTab, setActiveTab] = useState('workouts');
  const [isJoined, setIsJoined] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-md shadow-md text-gray-800"
        >
          <div className="flex items-center mb-4">
            <FaDumbbell className="text-3xl text-green-500 mr-2" />
            <p className="text-xl font-semibold">Fitness and Wellness Community</p>
          </div>
          <div className="flex justify-center mb-6">
            <button
              className={`mr-4 ${
                activeTab === 'workouts' ? 'text-blue-500' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('workouts')}
            >
              Workouts
            </button>
            <button
              className={`mr-4 ${
                activeTab === 'recipes' ? 'text-blue-500' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('recipes')}
            >
              Recipes
            </button>
            <button
              className={`mr-4 ${
                activeTab === 'goals' ? 'text-blue-500' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('goals')}
            >
              Goals
            </button>
            <button
              className={`mr-4 ${
                activeTab === 'nutrition' ? 'text-blue-500' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('nutrition')}
            >
              Nutrition
            </button>
            <button
              className={`mr-4 ${
                activeTab === 'mindfulness' ? 'text-blue-500' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('mindfulness')}
            >
              Mindfulness
            </button>
            <button
              className={`mr-4 ${
                activeTab === 'challenges' ? 'text-blue-500' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('challenges')}
            >
              Challenges
            </button>
          </div>
          {activeTab === 'workouts' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Workout Routines</h3>
              <p>
                Join our community to share and discover various workout routines and fitness tips.
              </p>
              <button
                className={`mt-4 ${isJoined ? 'bg-gray-500' : 'bg-blue-500'} text-white px-4 py-2 rounded-md`}
                onClick={() => setIsJoined(true)}
                disabled={isJoined}
              >
                {isJoined ? 'Joined' : 'Join Community'}
              </button>
              {isJoined && <Confetti width={800} height={800} />}
            </div>
          )}
          {activeTab === 'recipes' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Healthy Recipes</h3>
              <p>
                Connect with others who are passionate about cooking and share your favorite healthy recipes.
              </p>
              <button
                className={`mt-4 ${isJoined ? 'bg-gray-500' : 'bg-green-500'} text-white px-4 py-2 rounded-md`}
                onClick={() => setIsJoined(true)}
                disabled={isJoined}
              >
                {isJoined ? 'Joined' : 'Join Community'}
              </button>
              {isJoined && <Confetti width={800} height={800} />}
            </div>
          )}
          {activeTab === 'goals' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Fitness Goals</h3>
              <p>
                Set and track your fitness goals with the support of our community to stay motivated.
              </p>
              <button
                className={`mt-4 ${isJoined ? 'bg-gray-500' : 'bg-yellow-500'} text-white px-4 py-2 rounded-md`}
                onClick={() => setIsJoined(true)}
                disabled={isJoined}
              >
                {isJoined ? 'Joined' : 'Join Community'}
              </button>
              {isJoined && <Confetti width={800} height={800} />}
            </div>
          )}
          {activeTab === 'nutrition' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Nutrition Tips</h3>
              <p>
                Share and explore nutritional advice, diet plans, and healthy eating habits.
              </p>
              <button
                className={`mt-4 ${isJoined ? 'bg-gray-500' : 'bg-pink-500'} text-white px-4 py-2 rounded-md`}
                onClick={() => setIsJoined(true)}
                disabled={isJoined}
              >
                {isJoined ? 'Joined' : 'Join Community'}
              </button>
              {isJoined && <Confetti width={800} height={800} />}
            </div>
          )}
          {activeTab === 'mindfulness' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Mindfulness Practices</h3>
              <p>
                Connect with others to learn and practice mindfulness techniques for a balanced life.
              </p>
              <button
                className={`mt-4 ${isJoined ? 'bg-gray-500' : 'bg-purple-500'} text-white px-4 py-2 rounded-md`}
                onClick={() => setIsJoined(true)}
                disabled={isJoined}
              >
                {isJoined ? 'Joined' : 'Join Community'}
              </button>
              {isJoined && <Confetti width={800} height={800} />}
            </div>
          )}
          {activeTab === 'challenges' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Fitness Challenges</h3>
              <p>
                Participate in community challenges to enhance your fitness journey and achieve milestones.
              </p>
              <button
                className={`mt-4 ${isJoined ? 'bg-gray-500' : 'bg-orange-500'} text-white px-4 py-2 rounded-md`}
                onClick={() => setIsJoined(true)}
                disabled={isJoined}
              >
                {isJoined ? 'Joined' : 'Join Community'}
              </button>
              {isJoined && <Confetti width={800} height={800} />}
            </div>
          )}
          <div className="mt-8">
            <p className="text-lg font-semibold mb-2">Start your journey to a healthier you!</p>
            <p className="text-gray-600">
              Join our community to connect, inspire, and achieve your fitness and wellness goals.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FitnessWellnessCommunity;

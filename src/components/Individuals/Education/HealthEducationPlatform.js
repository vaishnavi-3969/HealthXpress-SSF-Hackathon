import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaQuestionCircle, FaBullhorn } from 'react-icons/fa';

const coursesData = [
  {
    title: 'Introduction to Nutrition',
    description: 'Learn the basics of nutrition and its importance for a healthy lifestyle.',
  },
  {
    title: 'Yoga for Beginners',
    description: 'Discover the benefits of yoga and practice beginner-friendly poses.',
  },
  // Add more courses here
];

const quizQuestions = [
  {
    question: 'What is the recommended daily intake of water for adults?',
    options: ['8 cups', '2 liters', '5 gallons', '1 liter'],
    correctAnswer: '2 liters',
  },
  {
    question: 'Which nutrient is essential for building and repairing muscles?',
    options: ['Vitamin C', 'Protein', 'Calcium', 'Fiber'],
    correctAnswer: 'Protein',
  },
];

const OnlineCourses = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Online Courses</h3>
      {coursesData.map((course, index) => (
        <div key={index} className="mb-4">
          <h4 className="text-lg font-semibold">{course.title}</h4>
          <p>{course.description}</p>
        </div>
      ))}
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
        Browse Courses
      </button>
    </div>
  );
};

const InteractiveQuizzes = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const selectedQuestion = quizQuestions.find((q) => q.correctAnswer === option);
    if (selectedQuestion) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Interactive Quizzes</h3>
      {quizQuestions.map((question, index) => (
        <div key={index} className="mb-4">
          <p className="font-semibold">{question.question}</p>
          <div className="flex flex-col mt-2">
            {question.options.map((option, optionIndex) => (
              <button
                key={optionIndex}
                className={`mt-2 bg-gray-200 p-2 rounded-md ${
                  selectedOption === option && (isAnswerCorrect ? 'bg-green-200' : 'bg-red-200')
                }`}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">
        Take a Quiz
      </button>
    </div>
  );
};

const RaiseAwareness = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Raise Awareness</h3>
      <p>
        Join us in raising awareness about preventive healthcare measures and healthier lifestyles.
      </p>
      <div className="flex mt-4">
        <button className="bg-purple-500 text-white px-4 py-2 rounded-md mr-2">Share on Facebook</button>
        <button className="bg-blue-400 text-white px-4 py-2 rounded-md mr-2">Tweet</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded-md">Share on Instagram</button>
      </div>
    </div>
  );
};

const HealthEducationPlatform = () => {
  const [activeTab, setActiveTab] = useState('');

  const renderContent = () => {
    if (activeTab === 'onlineCourses') {
      return <OnlineCourses />;
    } else if (activeTab === 'interactiveQuizzes') {
      return <InteractiveQuizzes />;
    } else if (activeTab === 'raiseAwareness') {
      return <RaiseAwareness />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-md shadow-md text-gray-800"
        >
          <div className="flex items-center mb-4">
            <FaBook className="text-3xl text-indigo-500 mr-2" />
            <p className="text-xl font-semibold">Health Education and Awareness Platform</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 p-4 rounded-lg">
              <button
                className={`text-lg font-semibold mb-4 ${activeTab === 'onlineCourses' && 'text-indigo-500'}`}
                onClick={() => setActiveTab('onlineCourses')}
              >
                Online Courses
              </button>
              {activeTab === 'onlineCourses' && <OnlineCourses />}
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <button
                className={`text-lg font-semibold mb-4 ${activeTab === 'interactiveQuizzes' && 'text-indigo-500'}`}
                onClick={() => setActiveTab('interactiveQuizzes')}
              >
                Interactive Quizzes
              </button>
              {activeTab === 'interactiveQuizzes' && <InteractiveQuizzes />}
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-gray-200 p-4 rounded-lg">
              <button
                className={`text-lg font-semibold mb-4 ${activeTab === 'raiseAwareness' && 'text-indigo-500'}`}
                onClick={() => setActiveTab('raiseAwareness')}
              >
                Raise Awareness
              </button>
              {activeTab === 'raiseAwareness' && <RaiseAwareness />}
            </div>
          </div>
          <div className="mt-8">
            {renderContent()}
          </div>
          <div className="mt-8">
            <p className="text-lg font-semibold mb-2">Empower yourself with knowledge and make informed decisions.</p>
            <p className="text-gray-600">
              Our platform is here to provide you with educational resources and insights for a healthier life.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HealthEducationPlatform;

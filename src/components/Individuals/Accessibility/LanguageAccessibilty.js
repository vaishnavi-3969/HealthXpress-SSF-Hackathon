import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUniversalAccess, FaLanguage, FaPhoneAlt, FaVolumeUp } from 'react-icons/fa';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ka', name: 'Kannada' },
  { code: 'tel', name: 'Telugu' },
  { code: 'tam', name: 'Tamil' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
];

const LanguageAccessibility = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTextToSpeechEnabled, setIsTextToSpeechEnabled] = useState(false);

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
  };

  const handleTextToSpeechToggle = () => {
    setIsTextToSpeechEnabled(!isTextToSpeechEnabled);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-orange-500 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-md shadow-md text-gray-800"
        >
          <div className="flex items-center mb-4">
            <FaUniversalAccess className="text-3xl text-yellow-500 mr-2" />
            <p className="text-xl font-semibold">Language and Accessibility Support</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Language Preferences</h3>
            <div className="flex flex-wrap">
              {languages.map((language) => (
                <button
                  key={language.code}
                  className={`mr-2 mb-2 px-3 py-1 rounded-lg ${
                    selectedLanguage === language.code
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                  onClick={() => handleLanguageChange(language.code)}
                >
                  {language.name}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Accessibility Options</h3>
            <div className="flex items-center mb-2">
              <button
                className={`mr-2 px-3 py-1 rounded-lg ${
                  isTextToSpeechEnabled ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}
                onClick={handleTextToSpeechToggle}
              >
                <FaVolumeUp className="mr-1" />
                Text-to-Speech
              </button>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Customer Service</h3>
            <p>
              Need assistance? Contact our customer service for support.
            </p>
            <button className="mt-2 bg-purple-500 text-white px-4 py-2 rounded-md">
              <FaPhoneAlt className="mr-1" />
              Contact Customer Service
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LanguageAccessibility;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { FaUser, FaNewspaper } from 'react-icons/fa';

const HealthInformationPortal = () => {
  const { user } = useAuth0();
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([
    'All',
    'Fitness',
    'Nutrition',
    'Mental Health',
  ]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    const apiKey = '61f583c04c9346b3b4c409005434243d';
    const apiUrl = `https://newsapi.org/v2/everything?q=health&apiKey=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  const filteredArticles = articles.filter((article) => {
    if (selectedCategory === 'All' && !selectedTag) {
      return true;
    }

    const categoryMatch =
      selectedCategory === 'All' || article.title.includes(selectedCategory);
    const tagMatch = selectedTag ? article.title.includes(selectedTag) : true;

    return categoryMatch && tagMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-green-400 to-yellow-300 text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-6 rounded-md shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaUser className="text-2xl mr-2" />
              <p className="text-lg font-semibold">
                Hello, {user ? user.name : 'Guest'}
              </p>
            </div>
            <div className="flex items-center">
              <select
                className="border rounded-lg px-3 py-2 focus:outline-none mr-4 bg-gray-700"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Search by tag..."
                className="border rounded-lg px-3 py-2 focus:outline-none bg-gray-700"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              />
            </div>
          </div>
          <div>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <motion.div
                  key={article.title}
                  className="border rounded-lg p-4 mt-4 bg-gray-700"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-gray-400 mb-2">{article.publishedAt}</p>
                  <p className="text-xl font-semibold">{article.title}</p>
                  <p>{article.description}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Read more
                  </a>
                </motion.div>
              ))
            ) : (
              <div className="border rounded-lg p-4 mt-4 bg-gray-700">
                <p className="text-xl font-semibold">
                  No related news found.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HealthInformationPortal;

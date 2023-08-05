import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserFriends, FaBookOpen, FaComments, FaCheck, FaExternalLinkAlt } from 'react-icons/fa';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import ReactConfetti from 'react-confetti';

const VirtualCounseling = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=3');
      const data = await response.json();
      setMentors(data.results);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md text-gray-800">
      <h3 className="text-xl font-semibold mb-4">Virtual Counseling</h3>
      <p>
        Connect with professional counselors for virtual sessions to discuss your mental well-being.
        Our licensed therapists are available to provide you with guidance and support tailored to your needs.
      </p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
        Schedule a Session
      </button>

      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">Available Mentors</h4>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {mentors.map((mentor, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-md">
              <div className="flex items-center justify-center mb-4">
                <FaUser className="text-2xl mr-2" />
                <p className="text-lg font-semibold">{`${mentor.name.first} ${mentor.name.last}`}</p>
              </div>
              <p className="text-sm">
                <FaEnvelope className="mr-1" />
                {mentor.email}
              </p>
              <p className="text-sm">
                <FaPhone className="mr-1" />
                {mentor.phone}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



const SupportGroups = () => {
    const [groups, setGroups] = useState([
      { id: 1, name: 'Anxiety Warriors', description: 'Join us to share your journey and learn coping strategies.', joined: false },
      { id: 2, name: 'Mindful Meditators', description: 'Practice mindfulness meditation with a supportive community.', joined: false },
      { id: 3, name: 'Depression Support Circle', description: 'Connect with others facing similar challenges and receive uplifting support.', joined: false },
    ]);
    const [joinedGroupId, setJoinedGroupId] = useState(null);
  
    const handleJoinGroup = (groupId) => {
      setGroups(groups.map(group => group.id === groupId ? { ...group, joined: true } : group));
      setJoinedGroupId(groupId);
    };
  
    return (
      <div className="bg-white p-6 rounded-md shadow-md text-gray-800 relative">
        <h3 className="text-xl font-semibold mb-4">Support Groups</h3>
        <p>
          Join support groups and engage in discussions with others who share similar experiences.
          Our safe and inclusive community provides you a space to connect, share, and learn from one another.
        </p>
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">
          Explore Groups
        </button>
  
        <div className="mt-6">
          {groups.map(group => (
            <div key={group.id} className="bg-gray-200 p-4 rounded-md mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold">{group.name}</h4>
                  <p className="text-sm">{group.description}</p>
                </div>
                {!group.joined ? (
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                    onClick={() => handleJoinGroup(group.id)}
                  >
                    Join
                  </button>
                ) : (
                  <div className="flex items-center">
                    <FaCheck className="text-green-500 mr-1" />
                    Joined
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
  
        {joinedGroupId && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
            <div className="bg-white p-6 rounded-md shadow-md text-gray-800 z-10">
              <h3 className="text-xl font-semibold mb-4">Congratulations!</h3>
              <p>You have successfully joined a support group.</p>
              <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={() => setJoinedGroupId(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };


  const resourcesData = [
    {
      id: 1,
      title: '10 Tips for Stress Management',
      description: 'Learn effective strategies to manage and reduce stress in your daily life.',
      link: 'https://example.com/article1',
    },
    {
      id: 2,
      title: 'Mindfulness Meditation Guide',
      description: 'Discover the benefits of mindfulness meditation and how to practice it.',
      link: 'https://example.com/article2',
    },
    {
      id: 3,
      title: 'Understanding Anxiety Disorders',
      description: 'Gain insights into different types of anxiety disorders and treatment options.',
      link: 'https://example.com/article3',
    },
  ];
  
  const Resources = () => {
    return (
      <div className="bg-white p-6 rounded-md shadow-md text-gray-800">
        <h3 className="text-xl font-semibold mb-4">Resources</h3>
        <p>
          Access helpful resources, articles, and tools for managing stress, anxiety, and other mental health issues.
          Our curated collection of resources aims to provide you with valuable information and techniques
          to improve your mental well-being.
        </p>
        <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md">
          Browse Resources
        </button>
  
        <div className="mt-6">
          {resourcesData.map(resource => (
            <div key={resource.id} className="bg-gray-200 p-4 rounded-md mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold">{resource.title}</h4>
                  <p className="text-sm">{resource.description}</p>
                </div>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500"
                >
                  Read More <FaExternalLinkAlt className="inline-block ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  
const MentalHealthSupport = () => {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-md shadow-md text-gray-800"
        >
          <div className="flex items-center mb-4">
            <FaUserFriends className="text-3xl text-blue-500 mr-2" />
            <p className="text-xl font-semibold">Mental Health Support Platform</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Virtual Counseling</h3>
              <p>
                Connect with professional counselors for virtual sessions to discuss your mental well-being.
              </p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => setActiveTab('virtualCounseling')}
              >
                Schedule a Session
              </button>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Support Groups</h3>
              <p>
                Join support groups and engage in discussions with others who share similar experiences.
              </p>
              <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={() => setActiveTab('supportGroups')}
              >
                Explore Groups
              </button>
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-gray-200 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Resources</h3>
              <p>
                Access helpful resources, articles, and tools for managing stress, anxiety, and other mental health issues.
              </p>
              <button
                className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md"
                onClick={() => setActiveTab('resources')}
              >
                Browse Resources
              </button>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-lg font-semibold mb-2">You are not alone on this journey.</p>
            <p className="text-gray-600">
              Our platform is here to provide you with the support and resources you need for your mental well-being.
            </p>
          </div>
        </motion.div>

        {activeTab === 'virtualCounseling' && <VirtualCounseling />}
        {activeTab === 'supportGroups' && <SupportGroups />}
        {activeTab === 'resources' && <Resources />}
      </div>
    </div>
  );
};

export default MentalHealthSupport;

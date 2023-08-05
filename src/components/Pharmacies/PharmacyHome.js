import React from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { FiShoppingBag, FiClipboard, FiStar, FiBell, FiPhone, FiGlobe } from 'react-icons/fi';

const FeatureCard = ({ title, description, icon }) => {
    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-gray-800 rounded-lg p-6 shadow-lg cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
        >
            <div className="text-5xl mb-4 text-center text-white">{icon}</div>
            <h2 className="text-xl font-semibold mb-2 text-white text-center">{title}</h2>
            <p className="text-gray-400 text-center">{description}</p>
            <p className="mt-4 text-center text-yellow-400">Coming Soon</p>
        </motion.div>
    );
};

const PharmacyHome = () => {
    const { user } = useAuth0();

    const features = [
        {
            title: 'Online Catalog and Ordering',
            description: 'Browse a catalog of medications and healthcare products.\nAdd prescriptions and order medications online.',
            icon: <FiShoppingBag className="text-5xl mb-4 text-blue-500" />,
        },
        {
            title: 'Pharmacy Reviews and Feedback',
            description: 'Gather customer feedback and reviews for better pharmacy services.',
            icon: <FiStar className="text-5xl mb-4 text-green-500" />,
        },
        {
            title: 'Notifications and Reminders',
            description: 'Send notifications for prescription refill reminders and more.',
            icon: <FiBell className="text-5xl mb-4 text-purple-500" />,
        },
        {
            title: 'Emergency Contact',
            description: 'Quick access to emergency contact information and resources.',
            icon: <FiPhone className="text-5xl mb-4 text-red-500" />,
        },
        {
            title: 'Language and Accessibility Support',
            description: 'Cater to diverse user groups with language and accessibility options.',
            icon: <FiGlobe className="text-5xl mb-4 text-blue-500" />,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-500 via-green-400 to-yellow-300 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-right mb-4">
                    <Link to="/" className="text-blue-600 hover:underline">
                        <div className="bg-black rounded-lg p-2 inline-block">
                            <span className="text-white">Back to Home</span>
                        </div>
                    </Link>
                    {user && (
                        <div className="ml-4 flex items-center space-x-2">
                            <div className="bg-black rounded-lg p-2">
                                <Link to='/profile'>
                                    <motion.img
                                        src={user.picture}
                                        alt="Profile"
                                        className="h-8 w-8 rounded-full"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Link>
                            </div>
                            <div className="bg-black bg-opacity-50 rounded-lg p-2">
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
                    )}
                </div>
                <div className="flex items-center justify-center mb-4">
                    <img src={Logo} alt="HealthXpress Logo" className="h-20 w-20" />
                    <h1 className="text-4xl font-bold text-yellow-400 mb-8 animate-wavy text-center">
                        Welcome to HealthXpress Pharmacy
                    </h1>
                </div>
                <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PharmacyHome;

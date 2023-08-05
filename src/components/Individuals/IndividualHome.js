import React from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { FiCalendar, FiBookOpen, FiHeart, FiMonitor, FiPhoneCall, FiShoppingBag, FiUsers, FiDollarSign, FiClipboard, FiUser, FiLock, FiStar, FiBell, FiPhone, FiGlobe } from 'react-icons/fi';

const FeatureCard = ({ title, description, icon,link }) => {
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
            <Link to={`/individual/${link}`} className="mt-4 inline-block bg-purple-900 text-white px-4 py-2 rounded-lg block mx-auto">
                View
            </Link>
        </motion.div>
    );
};

const IndividualHome = () => {
    const { user } = useAuth0();

   const features = [
        {
            title: 'Online Healthcare Booking Platform',
            description: 'Schedule appointments with doctors, specialists, and healthcare providers.\nView available time slots and choose convenient appointments.\nReceive confirmation and reminders for appointments.',
            icon: <FiCalendar className="text-5xl mb-4 text-blue-500" />,
            link:'online_booking',
        },
        {
            title: 'Health Information Portal',
            description: 'Access reliable health-related articles, news, and resources.\nSearch for specific health topics and information.\nFilter content by categories and tags.',
            icon: <FiBookOpen className="text-5xl mb-4 text-green-500" />,
            link:'heath_information_portal',
        },
        {
            title: 'Remote Health Monitoring Portal',
            description: 'Connect with wearable devices to track vital signs (heart rate, blood pressure, etc.).\nReceive real-time alerts and notifications for critical health changes.\nProvide a dashboard to visualize health data trends over time.',
            icon: <FiHeart className="text-5xl mb-4 text-purple-500" />,
            link:'remote_health_monitoring',
        },
        {
            title: 'Telemedicine',
            description: 'Conduct virtual medical consultations with healthcare professionals.\nShare medical history, symptoms, and receive advice remotely.\nPrescribe medications and treatment plans through the platform.',
            icon: <FiPhoneCall className="text-5xl mb-4 text-red-500" />,
            link:'telemedicine',
        },
        {
            title: 'Mental Health Support Platform',
            description: 'Connect with mental health professionals for virtual counseling.\nJoin support groups and engage in discussions about mental well-being.\nAccess resources for managing stress, anxiety, and other mental health issues.',
            icon: <FiUsers className="text-5xl mb-4 text-yellow-500" />,
            link:'mental_health_support',
        },
        {
            title: 'Online Pharmacy and Medication Delivery Service',
            description: 'Browse a catalog of medications and healthcare products.\nAdd prescriptions and order medications online.\nProvide home delivery options for medications.',
            icon: <FiShoppingBag className="text-5xl mb-4 text-blue-500" />,
            link:'online_pharmacy',
        },
        {
            title: 'Fitness and Wellness Community',
            description: 'Join an online community focused on fitness and well-being.\nShare workout routines, healthy recipes, and wellness tips.\nTrack personal fitness goals and progress.',
            icon: <FiDollarSign className="text-5xl mb-4 text-green-500" />,
            link: 'fitness_and_wellness_community'
        },
        {
            title: 'Healthcare Donation and Fundraising',
            description: 'Contribute to medical fundraisers for individuals in need.\nCreate fundraising campaigns for medical expenses.\nAccept donations securely through the platform.',
            icon: <FiClipboard className="text-5xl mb-4 text-purple-500" />,
            link:'crowdfunding'
        },
        {
            title: 'Health Education and Awareness Platform',
            description: 'Offer online courses and resources on health topics.\nProvide interactive quizzes and educational materials.\nRaise awareness about preventive healthcare measures.',
            icon: <FiMonitor className="text-5xl mb-4 text-blue-500" />,
            link:'health_education_and_awareness'
        },
        {
            title: 'User Profiles and Personalization',
            description: 'Allow users to create accounts and manage their profiles.\nCustomize content recommendations based on user preferences.\nTrack appointment history, health data, and activity.',
            icon: <FiUser className="text-5xl mb-4 text-red-500" />,
            link:'profile_and_settings',
        },
        {
            title: 'Feedback and Reviews',
            description: 'Enable users to provide feedback and reviews for healthcare services.\nHelp users make informed decisions based on others\' experiences.',
            icon: <FiStar className="text-5xl mb-4 text-green-500" />,
            link:'feedback_and_reviews'
        },
        {
            title: 'Notifications and Reminders',
            description: 'Send notifications for upcoming appointments, medication doses, and health goals.\nAllow users to set personalized reminders for health-related tasks.',
            icon: <FiBell className="text-5xl mb-4 text-purple-500" />,
            link:'notification_and_remainders',
        },
        {
            title: 'Emergency Support',
            description: 'Provide emergency contact information and resources.\nOffer a quick way for users to seek urgent medical help.',
            icon: <FiPhone className="text-5xl mb-4 text-red-500" />,
            link:'emergency_support',
        },
        {
            title: 'Language and Accessibility Support',
            description: 'Ensure the app is accessible to users with disabilities.\nOffer language options to cater to diverse user groups.',
            icon: <FiGlobe className="text-5xl mb-4 text-blue-500" />,
            link:'language_and_accessibility_support'
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
                        Welcome to HealthXpress
                    </h1>
                </div>
                <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                            link={feature.link}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IndividualHome;

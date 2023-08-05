import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-gray-900 py-8 text-white">
            <div className="mt-8 text-center">
                <p>&copy; 2023 HealthXpress. All rights reserved.</p>
                <div className="mt-2">
                    <Link to="#" className="text-blue-400 hover:underline">
                        Privacy Policy
                    </Link>
                    <span className="mx-2">|</span>
                    <Link to="#" className="text-blue-400 hover:underline">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

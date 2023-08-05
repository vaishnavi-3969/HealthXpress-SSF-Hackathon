import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { FaMedkit, FaUpload, FaCheck, FaShoppingCart } from 'react-icons/fa';
import ReactConfetti from 'react-confetti';

const PharmacyCatalog = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [prescription, setPrescription] = useState(null);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const { user } = useAuth0();
  
    const products = [
        {
          id: 1,
          name: 'Pain Relief Tablets',
          description: 'Relieve pain quickly with these tablets.',
          price: 100,
        },
        {
          id: 2,
          name: 'Allergy Medicine',
          description: 'Effective allergy relief for all ages.',
          price: 150,
        },
        {
          id: 3,
          name: 'Cold and Flu Syrup',
          description: 'Relieve cold and flu symptoms.',
          price: 120,
        },
        {
          id: 4,
          name: 'Antacid Chewable Tablets',
          description: 'Provides relief from heartburn and indigestion.',
          price: 80,
        },
        {
          id: 5,
          name: 'Multivitamin Capsules',
          description: 'Boost your daily nutrition with these capsules.',
          price: 200,
        },
        {
          id: 6,
          name: 'Cough Drops',
          description: 'Soothe your throat and suppress coughing.',
          price: 10,
        },
        {
          id: 7,
          name: 'Eye Drops',
          description: 'Relieve dry and itchy eyes.',
          price: 60,
        },
        {
          id: 8,
          name: 'Bandages Pack',
          description: 'Assorted sizes of adhesive bandages.',
          price: 15,
        },
        {
          id: 9,
          name: 'Digital Thermometer',
          description: 'Accurate temperature measurement.',
          price: 30,
        },
        {
          id: 10,
          name: 'Anti-Inflammatory Gel',
          description: 'Reduces inflammation and soothes pain.',
          price: 90,
        },
      ];
      
  const handlePrescriptionUpload = (e) => {
    const file = e.target.files[0];
    setPrescription(file);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  return (
    <div className="bg-gradient-to-b from-blue-500 via-green-400 to-yellow-300 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full mb-8">
            <div className="flex items-center space-x-2">
              {user && (
                <div className="flex items-center space-x-2">
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-white">{user.name}</span>
                </div>
              )}
            </div>
          </div>
          <div className="mb-8 w-full px-4">
            <h2 className="text-3xl font-semibold mb-4 text-white">
              Online Pharmacy and Medication Delivery
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Browse a catalog of medications and healthcare products. Add prescriptions and order medications online.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-6 rounded-lg shadow-md mb-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xl font-semibold">{product.name}</p>
                    <p className="text-blue-600">Rs.{product.price}</p>
                  </div>
                  <p className="text-gray-500 mb-4">{product.description}</p>
                  <div className="mb-4">
                    <label htmlFor={`prescription-${product.id}`} className="block text-gray-600 mb-1">
                      Upload Prescription
                    </label>
                    <input
                      type="file"
                      id={`prescription-${product.id}`}
                      accept=".jpg, .jpeg, .png, .pdf"
                      className="border rounded-lg px-3 py-2 w-full focus:outline-none"
                      onChange={handlePrescriptionUpload}
                    />
                  </div>
                  <motion.button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaMedkit className="mr-2" />
                    Add to Cart
                  </motion.button>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <motion.div
                className="bg-yellow-100 p-4 rounded-lg mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaShoppingCart className="text-yellow-500 mr-2" />
                    <p className="text-yellow-500">Cart ({cart.length} items)</p>
                  </div>
                  <button
                    className="text-yellow-500 hover:text-yellow-600 transition"
                    onClick={() => setShowCart(!showCart)}
                  >
                    View Cart
                  </button>
                </div>
                {showCart && (
                  <div className="mt-4">
                    {cart.map((product) => (
                      <div key={product.id} className="flex items-center mb-2">
                        <p className="text-sm font-semibold">{product.name}</p>
                        <button
                          className="ml-2 text-red-500 hover:text-red-600 transition"
                          onClick={() => handleRemoveFromCart(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <div className="mt-4">
                      <motion.button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
            {orderPlaced && (
              <div className="bg-green-100 p-4 rounded-lg mt-8">
                <div className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  <p className="text-green-500">Order Placed Successfully!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {orderPlaced && (
        <div className="bg-green-100 p-4 rounded-lg mt-8">
          <div className="flex items-center">
            <FaCheck className="text-green-500 mr-2" />
            <p className="text-green-500">Order Placed Successfully!</p>
          </div>
          <ReactConfetti
            width={800}
            height={1000}
            numberOfPieces={200}
            recycle={false}
          />
        </div>
      )}
    </div>
  );
};

export default PharmacyCatalog;
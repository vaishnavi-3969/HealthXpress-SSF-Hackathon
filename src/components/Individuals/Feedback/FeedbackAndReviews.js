import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const FeedbackAndReviews = () => {
  const { user, isAuthenticated } = useAuth0();

  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: 'John Doe',
      rating: 4,
      comment: 'Great service and friendly staff. Highly recommended!',
    },
    {
      id: 2,
      user: 'Jane Smith',
      rating: 5,
      comment: 'Excellent experience. The doctors were very knowledgeable.',
    },
  ]);

  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleSubmitReview = () => {
    if (selectedRating === 0 || !comment.trim()) {
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      user: user.nickname,
      rating: selectedRating,
      comment,
    };

    setReviews([...reviews, newReview]);
    setSelectedRating(0);
    setComment('');
    setReviewSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-green-400 to-yellow-300 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-md shadow-md"
        >
          <p className="text-lg font-semibold mb-4">Feedback and Reviews</p>
          <div className="flex mb-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <motion.div
                key={rating}
                className="mr-2 cursor-pointer"
                whileHover={{ scale: 1.2 }}
                onClick={() => handleRatingClick(rating)}
              >
                {rating <= selectedRating ? (
                  <FaStar className="text-yellow-500 text-lg" />
                ) : (
                  <FaRegStar className="text-gray-300 text-lg" />
                )}
              </motion.div>
            ))}
          </div>
          <textarea
            placeholder="Leave a review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full focus:outline-none mb-4"
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            onClick={handleSubmitReview}
          >
            Submit Review
          </button>
          {reviewSubmitted && (
            <div className="bg-green-100 p-4 rounded-lg mt-4">
              <div className="flex items-center">
                <FaStar className="text-yellow-500 mr-2" />
                <p className="text-green-500">Review Submitted Successfully!</p>
              </div>
            </div>
          )}
          <div className="mt-8">
            <p className="text-lg font-semibold">User Reviews</p>
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4 mt-4">
                <div className="flex items-center mb-2">
                  <img
                    src={user.picture}
                    alt={user.nickname}
                    className="h-8 w-8 rounded-full mr-2"
                  />
                  <p className="text-gray-600">{review.user}</p>
                </div>
                <div className="flex mb-2">
                  {Array.from({ length: review.rating }, (_, index) => (
                    <FaStar key={index} className="text-yellow-500 text-sm mr-1" />
                  ))}
                  {Array.from({ length: 5 - review.rating }, (_, index) => (
                    <FaRegStar key={index} className="text-gray-300 text-sm mr-1" />
                  ))}
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbackAndReviews;
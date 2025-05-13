import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TopDeliveryMan = () => {
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveryMen = async () => {
      try {
        const response = await fetch('https://parcel-pilot-server.vercel.app/delivery-men');
        const deliveryMenData = await response.json();

        const reviewsPromises = deliveryMenData.map(async (man) => {
          const reviewsResponse = await fetch(
            `https://parcel-pilot-server.vercel.app/reviews/${man._id}`
          );
          const reviews = await reviewsResponse.json();

          const averageRating =
            reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length || 0;

          return {
            ...man,
            averageRating,
          };
        });

        const deliveryMenWithRatings = await Promise.all(reviewsPromises);

        const sortedDeliveryMen = deliveryMenWithRatings.sort(
          (a, b) => b.averageRating - a.averageRating
        );

        setDeliveryMen(sortedDeliveryMen);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching delivery men or reviews:', error);
        setLoading(false);
      }
    };

    fetchDeliveryMen();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className="p-6 bg-gray-100 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Top Delivery Men</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deliveryMen.map((man, index) => (
          <motion.div
            key={man._id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-3">
              <img
                src={man.image || 'https://via.placeholder.com/150'}
                alt={man.name}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h3 className="text-lg font-bold">{man.name}</h3>
                <p className="text-sm text-gray-500">{man.email}</p>
              </div>
            </div>
            <p className="text-gray-700">Average Rating: {man.averageRating.toFixed(2)}</p>
            <p className="text-gray-500 text-sm">Role: {man.role}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TopDeliveryMan;

import React, { useEffect, useState } from 'react';

const TopDeliveryMan = () => {
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveryMen = async () => {
      try {
        const response = await fetch('http://localhost:5000/delivery-men');
        const deliveryMenData = await response.json();

        const reviewsPromises = deliveryMenData.map(async (man) => {
          const reviewsResponse = await fetch(
            `http://localhost:5000/reviews/${man._id}`
          );
          const reviews = await reviewsResponse.json();

          const averageRating =
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length || 0;

          return {
            ...man,
            averageRating,
          };
        });

        const deliveryMenWithRatings = await Promise.all(reviewsPromises);

        // Sort by averageRating in descending order
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
    <div className="p-6 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Top Delivery Men</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deliveryMen.map((man, index) => (
          <div
            key={man._id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDeliveryMan;

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';

const MyReviews = () => {
    const { user } = useAuth();

    const { data: reviews = [], isLoading, isError } = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/reviews/${user?.email}`);
            return response.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) return <p>Loading reviews...</p>;
    if (isError) return <p>Failed to load reviews. Please try again later.</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">My Reviews</h1>
            {reviews.length === 0 ? (
                <p className="text-center text-gray-500">No reviews found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reviews.map((review) => (
                        <div key={review._id} className="p-4 border rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <img
                                    src={review.userImage || 'https://via.placeholder.com/50'}
                                    alt={review.userName || 'Anonymous'}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h2 className="font-bold">{review.userName || 'Anonymous'}</h2>
                                    <p className="text-sm text-gray-500">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <p className="text-yellow-500 font-bold mb-2">Rating: {review.rating}/5</p>
                            <p className="text-gray-700">{review.feedback || 'No feedback provided.'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyReviews;

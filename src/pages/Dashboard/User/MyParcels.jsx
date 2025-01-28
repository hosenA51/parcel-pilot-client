import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [filter, setFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [review, setReview] = useState({
        rating: 5,
        feedback: '',
    });
    const [currentParcelId, setCurrentParcelId] = useState(null);

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return response.data;
        }
    });

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredParcels = filter === 'all' ? parcels : parcels.filter(parcel => parcel.status === filter);

    // Handle modal open and close
    const openModal = (parcelId) => {
        setCurrentParcelId(parcelId); // Set the current parcel ID
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    const handleReviewSubmit = async () => {
        if (!currentParcelId) return;

        try {
            const response = await axiosSecure.post(`/reviews`, {
                parcelId: currentParcelId,
                rating: review.rating,
                feedback: review.feedback,
                displayName: user?.displayName,
                photoURL: user?.photoURL,
                deliveryManId: parcels.find(parcel => parcel._id === currentParcelId)?.deliveryManId,
            });
            if (response.data.success) {
                Swal.fire('Review Submitted!', 'Your review has been submitted.', 'success');
                closeModal();
                refetch();
            }
        } catch (error) {
            console.error('Failed to submit review:', error);
            Swal.fire('Error', 'Failed to submit review. Please try again.', 'error');
        }
    };

    const handleCancel = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action will cancel your booking.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it!',
        });

        if (confirm.isConfirmed) {
            try {
                const response = await axiosSecure.patch(`/parcels/${id}`, { status: 'canceled' });
                if (response.data.message) {
                    Swal.fire('Canceled!', 'Your booking has been canceled.', 'success');
                    refetch();
                }
            } catch (error) {
                console.error('Failed to cancel booking:', error);
                Swal.fire('Error', 'Failed to cancel booking. Please try again.', 'error');
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">My Parcels</h1>
            <div className="mb-4">
                <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
                <select id="statusFilter" value={filter} onChange={handleFilterChange} className="border rounded p-2">
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="onTheWay">On the way</option>
                    <option value="delivered">Delivered</option>
                    <option value="returned">Returned</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Parcel Type</th>
                        <th className="border border-gray-300 px-4 py-2">Requested Delivery Date</th>
                        <th className="border border-gray-300 px-4 py-2">Approximate Delivery Date</th>
                        <th className="border border-gray-300 px-4 py-2">Booking Date</th>
                        <th className="border border-gray-300 px-4 py-2">Delivery Men ID</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredParcels.map((parcel) => (
                        <tr key={parcel._id}>
                            <td className="border border-gray-300 px-4 py-2">{parcel.parcelType}</td>
                            <td className="border border-gray-300 px-4 py-2">{parcel.requestedDate}</td>
                            <td className="border border-gray-300 px-4 py-2">{parcel.deliveryDate || 'N/A'}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {parcel.bookingDate ? new Date(parcel.bookingDate).toLocaleDateString() : 'Invalid Date'}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{parcel.deliveryManId || 'N/A'}</td>
                            <td className="border border-gray-300 px-4 py-2 capitalize">{parcel.status}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Link to={`/dashboard/update-parcel/${parcel._id}`}>
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2 disabled:bg-gray-400"
                                        disabled={parcel.status !== 'pending'}
                                    >
                                        Update
                                    </button>
                                </Link>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded mr-2 disabled:bg-gray-400"
                                    disabled={parcel.status !== 'pending'}
                                    onClick={() => handleCancel(parcel._id)}
                                >
                                    Cancel
                                </button>
                                {parcel.status === 'Delivered' && (
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                        onClick={() => openModal(parcel._id)}
                                    >
                                        Review
                                    </button>
                                )}
                                <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded disabled:bg-gray-400"
                                    disabled={parcel.status !== 'pending'}
                                    onClick={() => window.location.href = `/pay/${parcel._id}`}
                                >
                                    Pay
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* DaisyUI Modal for Review */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="text-xl font-bold">Submit Review</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleReviewSubmit();
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block">User's Name</label>
                                <input
                                    type="text"
                                    value={user?.displayName}
                                    readOnly
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block">User's Image</label>
                                <img src={user?.photoURL} alt="User" className="w-20 h-20 rounded-full" />
                            </div>
                            <div>
                                <label className="block">Rating (out of 5)</label>
                                <input
                                    type="number"
                                    value={review.rating}
                                    onChange={(e) => setReview({ ...review, rating: e.target.value })}
                                    max="5"
                                    min="1"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block">Feedback</label>
                                <textarea
                                    value={review.feedback}
                                    onChange={(e) => setReview({ ...review, feedback: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block">Delivery Men’s ID</label>
                                <input
                                    type="text"
                                    value={
                                        parcels.find(p => p._id === currentParcelId)?.deliveryManId || 'N/A'
                                    }
                                    readOnly
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary">
                                    Submit Review
                                </button>
                            </div>
                        </form>
                        <div className="modal-action">
                            <button className="btn" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyParcels;

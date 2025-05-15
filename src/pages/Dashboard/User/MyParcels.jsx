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
    const [review, setReview] = useState({ rating: 5, feedback: '' });
    const [currentParcelId, setCurrentParcelId] = useState(null);

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return response.data;
        }
    });

    const handleFilterChange = (e) => setFilter(e.target.value);
    const filteredParcels = filter === 'all' ? parcels : parcels.filter(parcel => parcel.status === filter);

    const openModal = (parcelId) => {
        setCurrentParcelId(parcelId);
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
                <select
                    id="statusFilter"
                    value={filter}
                    onChange={handleFilterChange}
                    className="border rounded p-2 bg-gray-300"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="onTheWay">On the way</option>
                    <option value="delivered">Delivered</option>
                    <option value="returned">Returned</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            {/* Table view for large screens */}
            <div className="hidden lg:block">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Parcel Type</th>
                            <th className="border px-4 py-2">Requested Date</th>
                            <th className="border px-4 py-2">Delivery Date</th>
                            <th className="border px-4 py-2">Booking Date</th>
                            <th className="border px-4 py-2">DeliveryMan ID</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredParcels.map(parcel => (
                            <tr key={parcel._id}>
                                <td className="border px-4 py-2">{parcel.parcelType}</td>
                                <td className="border px-4 py-2">{parcel.requestedDate}</td>
                                <td className="border px-4 py-2">{parcel.deliveryDate || 'N/A'}</td>
                                <td className="border px-4 py-2">
                                    {parcel.bookingDate ? new Date(parcel.bookingDate).toLocaleDateString() : 'Invalid'}
                                </td>
                                <td className="border px-4 py-2">{parcel.deliveryManId || 'N/A'}</td>
                                <td className="border px-4 py-2 capitalize">{parcel.status}</td>
                                <td className="border px-4 py-2 space-y-1">
                                    <Link to={`/dashboard/update-parcel/${parcel._id}`}>
                                        <button className="bg-blue-500 text-white px-2 py-1 rounded mr-1 disabled:bg-gray-400"
                                            disabled={parcel.status !== 'pending'}>
                                            Update
                                        </button>
                                    </Link>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded mr-1 disabled:bg-gray-400"
                                        disabled={parcel.status !== 'pending'}
                                        onClick={() => handleCancel(parcel._id)}>
                                        Cancel
                                    </button>
                                    {parcel.status === 'Delivered' && (
                                        <button className="bg-green-500 text-white px-2 py-1 rounded mr-1"
                                            onClick={() => openModal(parcel._id)}>
                                            Review
                                        </button>
                                    )}
                                    <button className="bg-yellow-500 text-white px-2 py-1 rounded disabled:bg-gray-400"
                                        disabled={parcel.status !== 'pending'}
                                        onClick={() => window.location.href = `/pay/${parcel._id}`}>
                                        Pay
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card view for small/medium devices */}
            <div className="lg:hidden space-y-4">
                {filteredParcels.map(parcel => (
                    <div key={parcel._id} className="bg-white shadow rounded p-4 border border-gray-300">
                        <p><strong>Parcel Type:</strong> {parcel.parcelType}</p>
                        <p><strong>Requested Date:</strong> {parcel.requestedDate}</p>
                        <p><strong>Delivery Date:</strong> {parcel.deliveryDate || 'N/A'}</p>
                        <p><strong>Booking Date:</strong> {parcel.bookingDate ? new Date(parcel.bookingDate).toLocaleDateString() : 'Invalid'}</p>
                        <p><strong>DeliveryMan ID:</strong> {parcel.deliveryManId || 'N/A'}</p>
                        <p><strong>Status:</strong> <span className="capitalize">{parcel.status}</span></p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <Link to={`/dashboard/update-parcel/${parcel._id}`}>
                                <button className="bg-blue-500 text-white px-3 py-1 rounded disabled:bg-gray-400"
                                    disabled={parcel.status !== 'pending'}>
                                    Update
                                </button>
                            </Link>
                            <button className="bg-red-500 text-white px-3 py-1 rounded disabled:bg-gray-400"
                                disabled={parcel.status !== 'pending'}
                                onClick={() => handleCancel(parcel._id)}>
                                Cancel
                            </button>
                            {parcel.status === 'Delivered' && (
                                <button className="bg-green-500 text-white px-3 py-1 rounded"
                                    onClick={() => openModal(parcel._id)}>
                                    Review
                                </button>
                            )}
                            <button className="bg-yellow-500 text-white px-3 py-1 rounded disabled:bg-gray-400"
                                disabled={parcel.status !== 'pending'}
                                onClick={() => window.location.href = `/pay/${parcel._id}`}>
                                Pay
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal modal-open fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="modal-box bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Submit Review</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleReviewSubmit();
                            }}
                            className="space-y-4"
                        >
                            <input type="text" readOnly value={user?.displayName} className="w-full p-2 border rounded" />
                            <img src={user?.photoURL} alt="User" className="w-20 h-20 rounded-full" />
                            <input
                                type="number"
                                max="5"
                                min="1"
                                value={review.rating}
                                onChange={(e) => setReview({ ...review, rating: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            <textarea
                                value={review.feedback}
                                onChange={(e) => setReview({ ...review, feedback: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                readOnly
                                value={parcels.find(p => p._id === currentParcelId)?.deliveryManId || 'N/A'}
                                className="w-full p-2 border rounded"
                            />
                            <button type="submit" className="btn btn-primary w-full">Submit Review</button>
                        </form>
                        <button className="btn mt-4 w-full" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyParcels;

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

    // Fetch parcels for the logged-in user using react-query
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user?.email], // Correct queryKey format
        queryFn: async () => {
            const response = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return response.data;
        }
    });

    // Handle filter change
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    // Filtered parcels based on the selected status
    const filteredParcels = filter === 'all' ? parcels : parcels.filter(parcel => parcel.status === filter);

    // Cancel a booking
    // const handleCancel = async (id) => {
    //     const confirm = await Swal.fire({
    //         title: 'Are you sure?',
    //         text: 'This action will cancel your booking.',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes, cancel it!',
    //     });

    //     if (confirm.isConfirmed) {
    //         try {
    //             const response = await axiosSecure.patch(`/parcels/${id}`, { status: 'canceled' });
    //             if (response.data.modifiedCount > 0) {
    //                 Swal.fire('Canceled!', 'Your Parcel has been canceled.', 'success');
    //                 refetch();
    //             }
    //         } catch (error) {
    //             console.error('Failed to cancel booking:', error);
    //             Swal.fire('Error', 'Failed to cancel booking. Please try again.', 'error');
    //         }
    //     }
    // };
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
                const response = await axiosSecure.patch(`/parcels/${id}`, { status: 'canceled' }); // নতুন স্ট্যাটাস পাঠানো
                if (response.data.message) {
                    Swal.fire('Canceled!', 'Your booking has been canceled.', 'success');
                    refetch(); // নতুন ডাটা লোড করুন
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
                            <td className="border border-gray-300 px-4 py-2">{parcel.approximateDate || 'N/A'}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {parcel.bookingDate ? new Date(parcel.bookingDate).toLocaleDateString() : 'Invalid Date'}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{parcel.deliveryMenId || 'N/A'}</td>
                            <td className="border border-gray-300 px-4 py-2 capitalize">{parcel.status}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Link to={`/dashboard/update-parcel/${parcel._id}`}>
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2 disabled:bg-gray-400"
                                        disabled={parcel.status !== 'pending'}
                                    // onClick={() => window.location.href = `/update-booking/${parcel._id}`}
                                    >
                                        Update
                                    </button>
                                </Link>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded mr-2 disabled:bg-gray-400"
                                    disabled={parcel.status !== 'pending'} // শুধু pending হলে সক্রিয় থাকবে
                                    onClick={() => handleCancel(parcel._id)} // স্ট্যাটাস আপডেট
                                >
                                    Cancel
                                </button>
                                {parcel.status === 'delivered' && (
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                        onClick={() => window.location.href = `/review/${parcel._id}`}
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
        </div>
    );
};

export default MyParcels;

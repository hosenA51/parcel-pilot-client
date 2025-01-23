import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';

const AllParcels = () => {
    const [search, setSearch] = useState({ from: '', to: '' });
    const [modalData, setModalData] = useState(null);

    const { data: parcels, refetch: refetchParcels, isLoading, error } = useQuery({
        queryKey: ['parcels', search],
        queryFn: () => {
            const params = {};
            if (search.from) params.from = search.from;
            if (search.to) params.to = search.to;

            return axios.get('/parcels', { params })
                .then(response => response.data)
                .catch(error => {
                    console.error("Error fetching parcels:", error);
                    return []; // Return an empty array in case of error
                });
        },
        enabled: !!search.from || !!search.to,  // Query will only run if at least one of search fields is provided
        refetchOnWindowFocus: false,  // To prevent refetching on window focus
        onSuccess: data => {
            console.log('Fetched parcels data:', data);
        },
        onError: error => {
            console.error('Error fetching parcels:', error);
        }
    });

    console.log("Parcels Data: ", parcels);

    const { data: deliveryMen } = useQuery({
        queryKey: ['deliveryMen'],
        queryFn: () => axios.get('/delivery-men').then(response => response.data)
    });

    const handleSearch = () => {
        if (search.from && search.to && new Date(search.from) > new Date(search.to)) {
            alert('The "From" date cannot be later than the "To" date.');
            return;
        }
        refetchParcels(); // Refetch the parcels data when search is triggered
    };

    const handleAssign = async () => {
        if (!modalData.deliveryManId || !modalData.deliveryDate) {
            alert('Please select a delivery man and a delivery date');
            return;
        }
        const { id, deliveryManId, deliveryDate } = modalData;
        try {
            await axios.patch(`/parcels/${id}`, {
                status: 'On The Way',
                deliveryManId,
                deliveryDate,
            });
            refetchParcels();  // Refetch parcels after assigning
            setModalData(null); // Close the modal after successful assignment
        } catch (error) {
            alert('Error assigning delivery man. Please try again.');
            console.error('Error assigning delivery man:', error);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading parcels data!</div>;

    return (
        <div className="container">
            <h1>All Parcels</h1>
            <div className="search-bar">
                <label>From: </label>
                <input
                    type="date"
                    value={search.from}
                    onChange={e => setSearch({ ...search, from: e.target.value })}
                />
                <label>To: </label>
                <input
                    type="date"
                    value={search.to}
                    onChange={e => setSearch({ ...search, to: e.target.value })}
                />
                <button onClick={handleSearch} disabled={!search.from && !search.to}>
                    Search
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>User Phone</th>
                        <th>Booking Date</th>
                        <th>Requested Delivery Date</th>
                        <th>Cost</th>
                        <th>Status</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(parcels) && parcels.length > 0 ? (
                        parcels.map(parcel => (
                            <tr key={parcel._id}>
                                <td>{parcel.senderName}</td>
                                <td>{parcel.phoneNumber}</td>
                                <td>{moment(parcel.bookingDate).format('YYYY-MM-DD')}</td>
                                <td>{moment(parcel.requestedDate).format('YYYY-MM-DD')}</td>
                                <td>${parcel.price}</td>
                                <td>{parcel.status}</td>
                                <td>
                                    <button onClick={() => setModalData({ id: parcel._id })}>
                                        Manage
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No parcels available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {modalData && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Assign Delivery Man</h2>
                        <label>Delivery Man:</label>
                        <select
                            onChange={e =>
                                setModalData(prev => ({ ...prev, deliveryManId: e.target.value }))
                            }
                        >
                            <option value="">Select Delivery Man</option>
                            {Array.isArray(deliveryMen) && deliveryMen.length > 0 ? (
                                deliveryMen.map(man => (
                                    <option key={man._id} value={man._id}>
                                        {man.name}
                                    </option>
                                ))
                            ) : (
                                <option value="">No delivery men available</option>
                            )}
                        </select>

                        <label>Approximate Delivery Date:</label>
                        <input
                            type="date"
                            onChange={e =>
                                setModalData(prev => ({ ...prev, deliveryDate: e.target.value }))
                            }
                        />

                        <button onClick={handleAssign}>Assign</button>
                        <button onClick={() => setModalData(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllParcels;

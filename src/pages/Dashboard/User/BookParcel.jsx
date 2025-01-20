// Import necessary libraries and hooks
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

const BookParcel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [formData, setFormData] = useState({
        phoneNumber: '',
        parcelType: '',
        parcelWeight: '',
        receiverName: '',
        receiverPhone: '',
        deliveryAddress: '',
        deliveryDate: '',
        latitude: '',
        longitude: '',
        price: 0,
    });

    // Update form data
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
            price: name === 'parcelWeight' ? calculatePrice(value) : prev.price,
        }));
    };

    // Calculate price based on weight
    const calculatePrice = (weight) => {
        const parsedWeight = parseFloat(weight);
        if (parsedWeight <= 1) return 50;
        if (parsedWeight <= 2) return 100;
        return 150;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            phoneNumber,
            parcelType,
            parcelWeight,
            receiverName,
            receiverPhone,
            deliveryAddress,
            deliveryDate,
            latitude,
            longitude,
        } = formData;


        if (
            !phoneNumber ||
            !parcelType ||
            !parcelWeight ||
            !receiverName ||
            !receiverPhone ||
            !deliveryAddress ||
            !deliveryDate ||
            !latitude ||
            !longitude
        ) {
            toast.error('All fields are required!');
            return;
        }

        const parcelData = {
            senderName: user?.displayName,
            senderEmail: user?.email,
            phoneNumber,
            parcelType,
            parcelWeight,
            receiverName,
            receiverPhoneNumber: receiverPhone,
            deliveryAddress,
            requestedDate: deliveryDate,
            latitude,
            longitude,
            price: formData.price,
            status: 'pending',
        };

        try {
            const response = await axiosSecure.post('/parcels', parcelData);
            if (response.data.data?.acknowledged) {
                Swal.fire({
                    title: response.data.message || 'Parcel booked successfully!',
                    text: 'Your parcel has been added successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            
                setFormData({
                    phoneNumber: '',
                    parcelType: '',
                    parcelWeight: '',
                    receiverName: '',
                    receiverPhone: '',
                    deliveryAddress: '',
                    deliveryDate: '',
                    latitude: '',
                    longitude: '',
                    price: 0,
                });
            }
            
            console.log(response.data)

        } catch (error) {
            console.error(error?.response?.data?.message || 'Failed to book parcel. Please try again.');
            toast.error(error?.response?.data?.message || 'Failed to book parcel. Please try again.');
        }
    };
    
    return (
        <div className="card lg:w-full shrink-0 shadow-2xl mx-auto">
            <h1 className='text-3xl font-bold text-[#ca6602] m-4 text-center'>Book a Parcel</h1>
            <form onSubmit={handleSubmit} className="space-y-4 card-body">
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className="form-control flex-1" >
                        <label>Name</label>
                        <input
                            type="text"
                            value={user?.displayName || ''}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100"
                        />
                    </div>
                    <div className="form-control flex-1" >
                        <label>Email</label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100"
                        />
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className="form-control flex-1">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="form-control flex-1">
                        <label>Parcel Type</label>
                        <input
                            type="text"
                            name="parcelType"
                            value={formData.parcelType}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className="form-control flex-1">
                        <label>Parcel Weight (kg)</label>
                        <input
                            type="number"
                            name="parcelWeight"
                            value={formData.parcelWeight}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="form-control flex-1">
                        <label>Receiver’s Name</label>
                        <input
                            type="text"
                            name="receiverName"
                            value={formData.receiverName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className="form-control flex-1">
                        <label>Receiver's Phone Number</label>
                        <input
                            type="text"
                            name="receiverPhone"
                            value={formData.receiverPhone}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="form-control flex-1">
                        <label>Parcel Delivery Address</label>
                        <input
                            type="text"
                            name="deliveryAddress"
                            value={formData.deliveryAddress}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className="form-control flex-1">
                        <label>Requested Delivery Date</label>
                        <input
                            type="date"
                            name="deliveryDate"
                            value={formData.deliveryDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="form-control flex-1">
                        <label>Delivery Address Latitude</label>
                        <input
                            type="number"
                            name="latitude"
                            value={formData.latitude}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className="form-control flex-1">
                        <label>Delivery Address Longitude</label>
                        <input
                            type="number"
                            name="longitude"
                            value={formData.longitude}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="form-control flex-1">
                        <label>Price (Tk)</label>
                        <input
                            type="text"
                            value={formData.price}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-[#ca6602] text-white px-4 py-2 rounded hover:bg-[#854200]"
                >
                    Book
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default BookParcel;

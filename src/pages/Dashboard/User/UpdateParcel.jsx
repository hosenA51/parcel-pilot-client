import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";

const UpdateParcel = () => {
    const { _id, phoneNumber, parcelType, parcelWeight, receiverName, receiverPhoneNumber, deliveryAddress, requestedDate, latitude, longitude, price } = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth()

    const [formData, setFormData] = useState({
        phoneNumber: phoneNumber || "",
        parcelType: parcelType || "",
        parcelWeight: parcelWeight || "",
        receiverName: receiverName || "",
        receiverPhoneNumber: receiverPhoneNumber || "",
        deliveryAddress: deliveryAddress || "",
        requestedDate: requestedDate || "",
        latitude: latitude || "",
        longitude: longitude || "",
        price: price || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedParcel = {
            phoneNumber: formData.phoneNumber,
            parcelType: formData.parcelType,
            parcelWeight: formData.parcelWeight,
            receiverName: formData.receiverName,
            receiverPhoneNumber: formData.receiverPhoneNumber,
            deliveryAddress: formData.deliveryAddress,
            latitude: formData.latitude,
            longitude: formData.longitude,
            price: parseFloat(formData.price),
            status: "pending"
        };

        try {
            const response = await axiosSecure.patch(`/parcels/${_id}`, updatedParcel);
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Parcel updated successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
                
            }
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error updating parcel",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="card lg:w-full shrink-0 shadow-2xl mx-auto">
            <h1 className='text-3xl font-bold text-[#ca6602] m-4 text-center'>Update Parcel</h1>
            <form onSubmit={handleSubmit} className="space-y-4 card-body">
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className="form-control flex-1">
                        <label>Name</label>
                        <input
                            type="text"
                            value={user?.displayName || ''}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100"
                        />
                    </div>
                    <div className="form-control flex-1">
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
                            className="w-full p-2 border rounded bg-[#F3F4F6]"
                        />
                    </div>
                    <div className="form-control flex-1">
                        <label>Parcel Type</label>
                        <input
                            type="text"
                            name="parcelType"
                            value={formData.parcelType}
                            onChange={handleChange}
                            className="w-full p-2 border rounded bg-[#F3F4F6]"
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
                            className="w-full p-2 border rounded bg-[#F3F4F6]"
                        />
                    </div>
                    <div className="form-control flex-1">
                        <label>Receiver’s Name</label>
                        <input
                            type="text"
                            name="receiverName"
                            value={formData.receiverName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded bg-[#F3F4F6]"
                        />
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className="form-control flex-1">
                        <label>Receiver's Phone Number</label>
                        <input
                            type="text"
                            name="receiverPhone"
                            value={formData.receiverPhoneNumber}
                            onChange={handleChange}
                            className="w-full p-2 border rounded bg-[#F3F4F6]"
                        />
                    </div>
                    <div className="form-control flex-1">
                        <label>Parcel Delivery Address</label>
                        <input
                            type="text"
                            name="deliveryAddress"
                            value={formData.deliveryAddress}
                            onChange={handleChange}
                            className="w-full p-2 border rounded bg-[#F3F4F6]"
                        />
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className="form-control flex-1">
                        <label>Requested Delivery Date</label>
                        <input
                            type="date"
                            name="requestedDate"
                            value={formData.requestedDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded bg-[#F3F4F6]"
                        />
                    </div>
                    <div className="form-control flex-1">
                        <label>Delivery Address Latitude</label>
                        <input
                            type="number"
                            name="latitude"
                            value={formData.latitude}
                            onChange={handleChange}
                            className="w-full p-2 border rounded bg-[#F3F4F6]"
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
                            className="w-full p-2 border rounded bg-[#F3F4F6]"
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
                    Update Parcel
                </button>
            </form>
        </div>
    );
};

export default UpdateParcel;

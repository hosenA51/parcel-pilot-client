import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateParcel = () => {
  const { id } = useParams(); // Get parcel ID from URL
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({});

  // Fetch parcel data using react-query
  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/parcels/${id}`);
      return response.data;
    },
    enabled: !!id, // Ensure ID is available before making the query
  });

  // Mutation for updating the parcel
  const mutation = useMutation({
    mutationFn: async (updatedParcel) =>
      await axiosSecure.patch(`/parcels/${id}`, updatedParcel),
    onSuccess: () => {
      queryClient.invalidateQueries(["parcel", id]);
      Swal.fire("Success!", "Parcel updated successfully!", "success");
      navigate("/my-parcels"); // Redirect after update
    },
    onError: (error) => {
      console.error("Failed to update parcel:", error);
      Swal.fire("Error", "Failed to update parcel. Please try again.", "error");
    },
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!parcel) {
    return <p>Parcel not found!</p>;
  }

  // Disable form if the parcel status is not pending
  const isDisabled = parcel.status !== "pending";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Update Parcel</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <div>
          <label className="block mb-2">Parcel Type</label>
          <input
            type="text"
            name="parcelType"
            defaultValue={parcel.parcelType}
            onChange={handleChange}
            disabled={isDisabled}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Requested Delivery Date</label>
          <input
            type="date"
            name="requestedDate"
            defaultValue={parcel.requestedDate}
            onChange={handleChange}
            disabled={isDisabled}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Delivery Address</label>
          <input
            type="text"
            name="deliveryAddress"
            defaultValue={parcel.deliveryAddress}
            onChange={handleChange}
            disabled={isDisabled}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Price</label>
          <input
            type="number"
            name="price"
            defaultValue={parcel.price}
            onChange={handleChange}
            disabled={isDisabled}
            className="border rounded p-2 w-full"
          />
        </div>
        <button
          type="submit"
          disabled={isDisabled || mutation.isLoading}
          className={`${
            isDisabled ? "bg-gray-400" : "bg-blue-500"
          } text-white px-4 py-2 rounded`}
        >
          {isDisabled ? "Cannot Update (Status Not Pending)" : "Update Parcel"}
        </button>
      </form>
    </div>
  );
};

export default UpdateParcel;

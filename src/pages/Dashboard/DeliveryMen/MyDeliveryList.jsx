import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
  const { user } = useAuth();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParcels = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://parcel-pilot-server.vercel.app/parcels?deliveryManId=${user._id}`
        );
        setParcels(response.data);
      } catch (error) {
        console.error("Error fetching parcels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParcels();
  }, [user]);

  const handleCancel = async (parcelId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to cancel this parcel!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`https://parcel-pilot-server.vercel.app/parcels/${parcelId}`, {
            status: "Cancelled",
          });
          setParcels((prev) => prev.filter((parcel) => parcel._id !== parcelId));
          Swal.fire('Cancelled!', 'Your parcel has been cancelled.', 'success');
        } catch (error) {
          console.error("Error cancelling parcel:", error);
        }
      }
    });
  };

  const handleDeliver = async (parcelId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to mark this parcel as delivered!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, deliver it!',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`https://parcel-pilot-server.vercel.app/parcels/${parcelId}`, {
            status: "Delivered",
          });
          setParcels((prev) => prev.filter((parcel) => parcel._id !== parcelId));
          Swal.fire('Delivered!', 'Your parcel has been marked as delivered.', 'success');
        } catch (error) {
          console.error("Error delivering parcel:", error);
        }
      }
    });
  };

  if (loading) {
    return <p>Loading your deliveries...</p>;
  }

  if (!user) {
    return <p>Please log in to view your deliveries.</p>;
  }

  if (parcels.length === 0) {
    return <p>No parcels assigned to you yet.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Delivery List</h1>
      {parcels.length === 0 ? (
        <p>No parcels assigned to you.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 hidden lg:table">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-black">Booked User's Name</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Receiver's Name</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Booked User's Phone</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Requested Delivery Date</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Approximate Delivery Date</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Receiver's Phone</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Receiver's Address</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td className="border border-gray-300 px-4 py-2">{parcel.senderName}</td>
                  <td className="border border-gray-300 px-4 py-2">{parcel.receiverName}</td>
                  <td className="border border-gray-300 px-4 py-2">{parcel.phoneNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(parcel.requestedDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(parcel.deliveryDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{parcel.receiverPhoneNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">{parcel.deliveryAddress}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() =>
                        window.open(
                          `https://maps.google.com?q=${parcel.latitude},${parcel.longitude}`,
                          "_blank"
                        )
                      }
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                    >
                      View Location
                    </button>
                    <button
                      onClick={() => handleCancel(parcel._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeliver(parcel._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Deliver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Responsive Card View */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
            {parcels.map((parcel) => (
              <div
                key={parcel._id}
                className="border border-gray-300 p-4 rounded-lg shadow-md"
              >
                <p><strong>Booked User's Name:</strong> {parcel.senderName}</p>
                <p><strong>Receiver's Name:</strong> {parcel.receiverName}</p>
                <p><strong>Booked User's Phone:</strong> {parcel.phoneNumber}</p>
                <p><strong>Requested Delivery Date:</strong> {new Date(parcel.requestedDate).toLocaleDateString()}</p>
                <p><strong>Approximate Delivery Date:</strong> {new Date(parcel.deliveryDate).toLocaleDateString()}</p>
                <p><strong>Receiver's Phone:</strong> {parcel.receiverPhoneNumber}</p>
                <p><strong>Receiver's Address:</strong> {parcel.deliveryAddress}</p>
                <div className="mt-4">
                  <button
                    onClick={() =>
                      window.open(
                        `https://maps.google.com?q=${parcel.latitude},${parcel.longitude}`,
                        "_blank"
                      )
                    }
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                  >
                    View Location
                  </button>
                  <button
                    onClick={() => handleCancel(parcel._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeliver(parcel._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Deliver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDeliveryList;
import { useState, useEffect } from 'react';
import axios from 'axios';

const AllDeliveryMen = () => {
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveryMen = async () => {
      try {
        const response = await axios.get('https://parcel-pilot-server.vercel.app/delivery-men');
        setDeliveryMen(response.data);
      } catch (error) {
        console.error('Error fetching delivery men details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryMen();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">Loading delivery men...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">All Delivery Men</h1>

      {deliveryMen.length === 0 ? (
        <p className="text-center text-gray-500">No delivery men found.</p>
      ) : (
        <>
          {/* Table for larger screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Parcels Delivered</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Avg. Review</th>
                </tr>
              </thead>
              <tbody>
                {deliveryMen.map((man) => (
                  <tr key={man._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{man.name || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2">{man.phone || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{man.totalParcelsDelivered ?? 0}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{man.averageReview?.toFixed(2) ?? 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card view for mobile and tablets */}
          <div className="md:hidden space-y-4">
            {deliveryMen.map((man) => (
              <div
                key={man._id}
                className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
              >
                <p><span className="font-semibold">Name:</span> {man.name || 'N/A'}</p>
                <p><span className="font-semibold">Phone:</span> {man.phone || 'N/A'}</p>
                <p><span className="font-semibold">Parcels Delivered:</span> {man.totalParcelsDelivered ?? 0}</p>
                <p><span className="font-semibold">Avg. Review:</span> {man.averageReview?.toFixed(2) ?? 'N/A'}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllDeliveryMen;

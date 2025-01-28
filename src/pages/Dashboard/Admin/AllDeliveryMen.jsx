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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching delivery men details:', error);
        setLoading(false);
      }
    };

    fetchDeliveryMen();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Delivery Men</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Delivery Man's Name</th>
            <th className="border border-gray-300 px-4 py-2">Phone Number</th>
            <th className="border border-gray-300 px-4 py-2">Number of Parcels Delivered</th>
            <th className="border border-gray-300 px-4 py-2">Average Review</th>
          </tr>
        </thead>
        <tbody>
          {deliveryMen.map((man, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{man.name}</td>
              <td className="border border-gray-300 px-4 py-2">{man.phone}</td>
              <td className="border border-gray-300 px-4 py-2">{man.totalParcelsDelivered}</td>
              <td className="border border-gray-300 px-4 py-2">{man.averageReview}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllDeliveryMen;

import { useState, useEffect } from 'react';
import axios from 'axios';

const AllParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState('');
  const [deliveryMen, setDeliveryMen] = useState([]); // State to store delivery men

  useEffect(() => {
    // Fetching parcels data
    const fetchParcels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/parcels');
        setParcels(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching parcels:", error);
        setLoading(false);
      }
    };

    // Fetching delivery men data
    const fetchDeliveryMen = async () => {
      try {
        const response = await axios.get('http://localhost:5000/delivery-men');
        setDeliveryMen(response.data); // Storing delivery men in state
      } catch (error) {
        console.error("Error fetching delivery men:", error);
      }
    };

    fetchParcels();
    fetchDeliveryMen();
  }, []);

  const handleManageClick = (parcel) => {
    setSelectedParcel(parcel);
    setModalOpen(true);
  };

  // const handleAssign = async () => {
  //   try {
  //     await axios.patch(`http://localhost:5000/parcels/assign/${selectedParcel._id}`, {
  //       deliveryManId: selectedDeliveryMan,
  //       deliveryDate,
  //     });

  //     setModalOpen(false);
  //     setSelectedParcel(null);
  //     setDeliveryDate('');
  //     setSelectedDeliveryMan('');
  //     // Refetch parcels to reflect updates
  //     const response = await axios.get('http://localhost:5000/parcels');
  //     setParcels(response.data);
  //   } catch (error) {
  //     console.error("Error assigning delivery man:", error);
  //   }
  // };

  const handleAssign = async () => {
    if (!selectedDeliveryMan) {
      alert("Please select a delivery man before assigning.");
      return;
    }
  
    try {
      await axios.patch(`http://localhost:5000/parcels/assign/${selectedParcel._id}`, {
        deliveryManId: selectedDeliveryMan,
        deliveryDate,
      });
  
      // ক্লিয়ার এবং রিফ্রেশ ডেটা
      setModalOpen(false);
      setSelectedParcel(null);
      setDeliveryDate('');
      setSelectedDeliveryMan('');
  
      const response = await axios.get('http://localhost:5000/parcels');
      setParcels(response.data);
    } catch (error) {
      console.error("Error assigning delivery man:", error);
      alert("Failed to assign delivery man. Please try again.");
    }
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Parcels</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">User's Name</th>
            <th className="border border-gray-300 px-4 py-2">User's Phone</th>
            <th className="border border-gray-300 px-4 py-2">Booking Date</th>
            <th className="border border-gray-300 px-4 py-2">Requested Delivery Date</th>
            <th className="border border-gray-300 px-4 py-2">Cost</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Manage</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel._id}>
              <td className="border border-gray-300 px-4 py-2">{parcel.senderName}</td>
              <td className="border border-gray-300 px-4 py-2">{parcel.phoneNumber}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(parcel.bookingDate).toLocaleDateString()}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(parcel.requestedDate).toLocaleDateString()}</td>
              <td className="border border-gray-300 px-4 py-2">{parcel.price}</td>
              <td className="border border-gray-300 px-4 py-2">{parcel.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleManageClick(parcel)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Manage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for assigning delivery man */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Assign Delivery Man</h2>
            <div className="mb-4">
              <label htmlFor="deliveryMan" className="block mb-2">Select Delivery Man</label>
              <select
  id="deliveryMan"
  value={selectedDeliveryMan}
  onChange={(e) => setSelectedDeliveryMan(e.target.value)}
  className="w-full border px-3 py-2"
>
  <option value="">Select Delivery Man</option>
  {deliveryMen.map((man) => (
    <option key={man._id} value={man._id}>{man.name}</option>
  ))}
</select>
            </div>
            <div className="mb-4">
              <label htmlFor="deliveryDate" className="block mb-2">Approximate Delivery Date</label>
              <input
                type="date"
                id="deliveryDate"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full border px-3 py-2"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Close
              </button>
              <button
                onClick={handleAssign}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllParcels;

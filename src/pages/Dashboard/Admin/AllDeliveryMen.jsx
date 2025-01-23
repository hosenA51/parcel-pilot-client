import React, { useState, useEffect } from "react";
import axios from "axios";

const AllDeliveryMen = () => {
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/delivery-men")
      .then((response) => {
        console.log(response.data); // ডেটা চেক করুন
        setDeliveryMen(response.data);
        setIsLoading(false); // Loading শেষ হলে
      })
      .catch((error) => {
        setError("Error fetching delivery men."); // Error সেট করুন
        setIsLoading(false); // Loading শেষ হলে
        console.error("Error fetching delivery men:", error);
      });
  }, []);

  // Function to calculate average review
  const calculateAverageReview = (reviews) => {
    if (!reviews || reviews.length === 0) return "N/A"; // If no reviews, show N/A
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1); // Returns the average review
  };

  if (isLoading) return <div>Loading...</div>; // Show loading if data is being fetched
  if (error) return <div>{error}</div>; // Show error message if there is an issue

  return (
    <div className="container">
      <h1>All Delivery Men</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Delivery Man Name</th>
            <th>Phone Number</th>
            <th>Number of Parcels Delivered</th>
            <th>Average Review</th>
          </tr>
        </thead>
        <tbody>
          {deliveryMen && deliveryMen.length > 0 ? (
            deliveryMen.map((man) => (
              <tr key={man._id}>
                <td>
                  <img
                    src={man.image}
                    alt={man.name}
                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  />
                </td>
                <td>{man.name}</td>
                <td>{man.phone}</td>
                <td>{man.parcelsDelivered || "N/A"}</td> {/* Parcels delivered */}
                <td>{man.reviews ? calculateAverageReview(man.reviews) : "N/A"}</td> {/* Average Review */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No delivery men available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllDeliveryMen;

import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

const OurFeatures = () => {
  const [statistics, setStatistics] = useState({
    parcelsCount: 0,
    deliveredCount: 0,
    usersCount: 0,
  });

  useEffect(() => {
    // Fetch statistics from the backend
    fetch("http://localhost:5000/statistics")
      .then((res) => res.json())
      .then((data) => setStatistics(data))
      .catch((error) => console.error("Error fetching statistics:", error));
  }, []);

  const features = [
    {
      icon: "📦", // Replace with an actual icon component if preferred
      title: "Parcel Safety",
      description: "We ensure your parcels are always secure and delivered with care.",
    },
    {
      icon: "⚡", // Replace with an actual icon component if preferred
      title: "Super Fast Delivery",
      description: "Get your parcels delivered faster than ever with our service.",
    },
    {
      icon: "🤝", // Replace with an actual icon component if preferred
      title: "Trusted Service",
      description: "Millions of users trust us for their parcel deliveries.",
    },
  ];

  return (
    <div className="px-4 py-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 text-center"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
      <h2 className="text-3xl font-bold text-center mb-8">Our Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Parcels Booked</h3>
          <CountUp
            start={0}
            end={statistics.parcelsCount}
            duration={2.5}
            separator=","
            className="text-4xl font-bold text-blue-500"
          />
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Parcels Delivered</h3>
          <CountUp
            start={0}
            end={statistics.deliveredCount}
            duration={2.5}
            separator=","
            className="text-4xl font-bold text-green-500"
          />
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Happy Users</h3>
          <CountUp
            start={0}
            end={statistics.usersCount}
            duration={2.5}
            separator=","
            className="text-4xl font-bold text-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

export default OurFeatures;

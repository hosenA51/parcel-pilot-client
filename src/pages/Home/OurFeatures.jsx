import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const OurFeatures = () => {
  const [statistics, setStatistics] = useState({
    parcelsCount: 0,
    deliveredCount: 0,
    usersCount: 0,
  });

  useEffect(() => {
    fetch("https://parcel-pilot-server.vercel.app/statistics")
      .then((res) => res.json())
      .then((data) => setStatistics(data))
      .catch((error) => console.error("Error fetching statistics:", error));
  }, []);

  const features = [
    {
      icon: "📦",
      title: "Parcel Safety",
      description: "We ensure your parcels are always secure and delivered with care.",
    },
    {
      icon: "⚡",
      title: "Super Fast Delivery",
      description: "Get your parcels delivered faster than ever with our service.",
    },
    {
      icon: "🤝",
      title: "Trusted Service",
      description: "Millions of users trust us for their parcel deliveries.",
    },
  ];

  return (
    <motion.div
      className="px-4 py-8 bg-gray-50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold text-center mb-8">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-center mb-8">Our Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Parcels Booked", count: statistics.parcelsCount, color: "text-blue-500" },
          { label: "Parcels Delivered", count: statistics.deliveredCount, color: "text-green-500" },
          { label: "Happy Users", count: statistics.usersCount, color: "text-purple-500" },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-white shadow-lg rounded-2xl p-6 text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <h3 className="text-xl font-semibold mb-2">{item.label}</h3>
            <CountUp
              start={0}
              end={item.count}
              duration={2.5}
              separator=","
              className={`text-4xl font-bold ${item.color}`}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OurFeatures;

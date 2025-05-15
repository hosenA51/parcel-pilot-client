import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaClock, FaThumbsUp, FaGlobe } from 'react-icons/fa';

const reasons = [
  {
    icon: <FaShieldAlt className="text-3xl text-blue-600" />,
    title: "Secure & Reliable",
    description: "Your parcels are handled with care and protected by our secure system.",
  },
  {
    icon: <FaClock className="text-3xl text-green-600" />,
    title: "On-Time Delivery",
    description: "We prioritize punctuality to ensure timely parcel delivery every time.",
  },
  {
    icon: <FaThumbsUp className="text-3xl text-purple-600" />,
    title: "Customer Satisfaction",
    description: "Thousands of happy customers trust us for their delivery needs.",
  },
  {
    icon: <FaGlobe className="text-3xl text-yellow-600" />,
    title: "Nationwide Coverage",
    description: "We deliver parcels across the country, wherever you need.",
  },
];

const WhyChooseUs = () => {
  return (
    <motion.section
      className="py-16 px-6 bg-white text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-12 text-gray-800">
        Why Choose Parcel Pilot
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex justify-center">{reason.icon}</div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              {reason.title}
            </h4>
            <p className="text-gray-600">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;

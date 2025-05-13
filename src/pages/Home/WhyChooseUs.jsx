import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaClock, FaThumbsUp, FaGlobe } from 'react-icons/fa';

const reasons = [
  {
    icon: <FaShieldAlt className="text-2xl text-blue-600" />,
    title: "Secure & Reliable",
    description: "Your parcels are handled with care and protected by our secure system.",
  },
  {
    icon: <FaClock className="text-2xl text-green-600" />,
    title: "On-Time Delivery",
    description: "We prioritize punctuality to ensure timely parcel delivery every time.",
  },
  {
    icon: <FaThumbsUp className="text-2xl text-purple-600" />,
    title: "Customer Satisfaction",
    description: "Thousands of happy customers trust us for their delivery needs.",
  },
  {
    icon: <FaGlobe className="text-2xl text-yellow-600" />,
    title: "Nationwide Coverage",
    description: "We deliver parcels across the country, wherever you need.",
  },
];

const WhyChooseUs = () => {
  return (
    <motion.section
      className="py-12 px-6 bg-white"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold text-center mb-12">
        Why Choose Parcel Pilot
      </h2>

      <div className="relative border-l-4 border-blue-200 ml-6 space-y-10">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="relative pl-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="absolute -left-6 top-1.5 bg-white rounded-full border border-blue-300 p-2 shadow">
              {reason.icon}
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-1">
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

import React from 'react';
import { motion } from 'framer-motion';
import { FaBoxOpen, FaMapMarkedAlt, FaSmileBeam } from 'react-icons/fa';

const steps = [
  {
    icon: <FaBoxOpen className="text-4xl text-blue-500 mb-3" />,
    title: "Book Your Parcel",
    description: "Provide pickup and delivery details to schedule your parcel.",
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl text-green-500 mb-3" />,
    title: "Track Your Parcel",
    description: "Monitor real-time delivery status from your dashboard.",
  },
  {
    icon: <FaSmileBeam className="text-4xl text-yellow-500 mb-3" />,
    title: "Delivered Safely",
    description: "Your parcel reaches the destination safely and on time.",
  },
];

const HowItWorks = () => {
  return (
    <motion.div
      className="py-12 px-4 bg-gray-50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl text-center shadow hover:shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div>{step.icon}</div>
            <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HowItWorks;

import React from 'react';
import { motion } from 'framer-motion';
import { FaBoxOpen, FaMapMarkedAlt, FaSmileBeam } from 'react-icons/fa';

const steps = [
  {
    icon: <FaBoxOpen className="text-3xl text-blue-500" />,
    title: "Book Your Parcel",
    description: "Provide pickup and delivery details to schedule your parcel.",
  },
  {
    icon: <FaMapMarkedAlt className="text-3xl text-green-500" />,
    title: "Track Your Parcel",
    description: "Monitor real-time delivery status from your dashboard.",
  },
  {
    icon: <FaSmileBeam className="text-3xl text-yellow-500" />,
    title: "Delivered Safely",
    description: "Your parcel reaches the destination safely and on time.",
  },
];

const HowItWorks = () => {
  return (
    <motion.section
      className="py-14 px-4 bg-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold text-center mb-14">How It Works</h2>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-10 md:gap-20 relative">
        {/* Horizontal Line */}
        <div className="hidden md:block absolute top-6 left-10 right-10 h-1 bg-blue-200 z-0" />

        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="relative z-10 flex flex-col items-center text-center md:w-1/3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white border-4 border-blue-300 shadow mb-4">
              {step.icon}
            </div>
            <h4 className="text-lg font-semibold mb-1">{step.title}</h4>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default HowItWorks;

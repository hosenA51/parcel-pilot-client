import React from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';
import { FaBoxOpen, FaSearchLocation, FaCheckCircle } from 'react-icons/fa';

const Banner = () => {
    const steps = [
        {
            icon: <FaBoxOpen size={30} className="text-yellow-400" />,
            title: '1. Book Parcel',
            description: 'Quickly book your parcel online.',
        },
        {
            icon: <FaSearchLocation size={30} className="text-yellow-400" />,
            title: '2. Track Parcel',
            description: 'Track your delivery in real-time.',
        },
        {
            icon: <FaCheckCircle size={30} className="text-yellow-400" />,
            title: '3. Delivered',
            description: 'We deliver safely & on time.',
        },
    ];

    return (
        <div
            className='min-h-screen flex flex-col justify-center items-center px-4'
            style={{
                backgroundImage: "url(https://i.ibb.co.com/2N89D3f/banner-img.webp)",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                backgroundBlendMode: "darken",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
            <Fade>
                <h1 className="text-3xl md:text-6xl text-center font-bold mb-6 text-white">
                    Your Reliable Delivery Partner
                </h1>
            </Fade>
            <Fade delay={300}>
                <p className="text-xl md:text-2xl max-w-3xl text-center mb-10 text-slate-200 font-medium">
                    Experience the ease of managing your parcels with our user-friendly platform. Stay informed, track progress, and enjoy hassle-free delivery tailored to meet your needs.
                </p>
            </Fade>

            <Zoom delay={500}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white/20 backdrop-blur-sm p-6 rounded-xl text-white border border-white/30 hover:bg-white/30 transition duration-300"
                        >
                            <div className="mb-3 flex justify-center">{step.icon}</div>
                            <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                            <p className="text-sm text-slate-300">{step.description}</p>
                        </div>
                    ))}
                </div>
            </Zoom>
        </div>
    );
};

export default Banner;

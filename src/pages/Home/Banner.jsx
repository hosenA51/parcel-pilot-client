import React from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';

const Banner = () => {
    return (
        <div
            className='min-h-screen flex flex-col justify-center items-center'
            style={{
                backgroundImage: "url(https://i.ibb.co.com/2N89D3f/banner-img.webp)",
                backgroundColor: "rgba(0, 0, 0, 0.6)", // Adding a dark overlay
                backgroundBlendMode: "darken", // Ensuring the dark effect blends
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
            <Fade>
                <h1 className="text-3xl md:text-6xl text-center font-bold mb-7 text-white">
                    Your Reliable Delivery Partner
                </h1>
            </Fade>
            <Fade delay={300}>
                <p className="text-2xl md:text-xl max-w-2xl text-center mb-7 text-slate-200 font-semibold">
                    Experience the ease of managing your parcels with our user-friendly platform. Stay informed, track progress, and enjoy hassle-free delivery, tailored to meet your needs.
                </p>
            </Fade>
            <Zoom delay={500}>
                <div className="flex w-full max-w-sm items-center">
                    <input
                        type="text" placeholder="Search for delivery services"
                        className="p-2 rounded-l-lg outline-none text-black w-72"
                    />
                    <button
                        type="submit"
                        className="p-2 px-4 bg-[#ca6602] rounded-r-lg text-white hover:bg-[#a65201] transition-colors font-semibold"
                    >
                        Search
                    </button>
                </div>
            </Zoom>
        </div>
    );
};

export default Banner;

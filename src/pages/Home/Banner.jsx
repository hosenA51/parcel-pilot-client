import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
                <h1 className="text-3xl md:text-6xl font-bold mb-7 text-white">
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
                    <Input className="rounded-none rounded-tl-xl rounded-bl-xl w-60" type="text" placeholder="Search for delivery services" />
                    <Button className="rounded-none rounded-tr-xl rounded-br-xl text-lg" type="submit">Search</Button>
                </div>
            </Zoom>
        </div>
    );
};

export default Banner;

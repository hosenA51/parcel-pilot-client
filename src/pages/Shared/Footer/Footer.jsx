import React from "react";
import { motion } from "framer-motion";
import { Fade, Zoom } from "react-awesome-reveal";
import logo from '../../../assets/logo1.png';

const Footer = () => {
    return (
        <footer className="relative bg-[#1A202C] text-white py-10 overflow-hidden">
            <div className="md:w-10/12 mx-auto">
                {/* Animated Shapes */}
                <motion.div
                    className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#ca6602] opacity-30"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                ></motion.div>
                <motion.div
                    className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#ca6602] opacity-20"
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 30, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                ></motion.div>

                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-0 relative z-10 my-4">
                    {/* Logo and About */}
                    <Fade>
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <img src={logo} alt='logo' width='50' height='50' />
                                <span className="text-4xl">|</span>
                                <h2 className='text-3xl font-bold text-[#ca6602]'>ParcelPilot</h2>
                            </div>
                            <p className="text-gray-400 w-3/4">
                                Your trusted partner for fast, reliable, and efficient parcel
                                delivery. Join us in simplifying logistics, one delivery at a
                                time.
                            </p>
                        </div>
                    </Fade>

                    {/* Quick Links */}
                    <Zoom>
                        <div>
                            <h3 className="text-xl font-bold mb-3">Quick Links</h3>
                            <ul className="text-gray-400 space-y-2">
                                <li className="hover:text-white transition-colors">
                                    <a href="/">Home</a>
                                </li>
                                <li className="hover:text-white transition-colors">
                                    <a href="/about">About Us</a>
                                </li>
                                <li className="hover:text-white transition-colors">
                                    <a href="/services">Services</a>
                                </li>
                                <li className="hover:text-white transition-colors">
                                    <a href="/contact">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </Zoom>

                    {/* Subscribe */}
                    <Fade delay={200}>
                        <div>
                            <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
                            <p className="text-gray-400 mb-3">
                                Subscribe to our newsletter for the latest updates and offers.
                            </p>
                            <form className="flex items-center">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="p-2 rounded-l-md outline-none bg-gray-700 text-white"
                                />
                                <button
                                    type="submit"
                                    className="p-2 bg-[#ca6602] rounded-r-md text-white hover:bg-[#a65201] transition-colors"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </Fade>
                </div>

                {/* Copyright */}
                <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-700 pt-5 relative z-10">
                    <Fade delay={400}>
                        <p>
                            © {new Date().getFullYear()} ParcelPilot. All Rights Reserved. Built
                            with ❤️ by your team.
                        </p>
                    </Fade>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

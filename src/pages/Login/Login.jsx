import { AuthContext } from '@/providers/AuthProvider';
import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import 'animate.css';
import { saveUser } from '@/api/utils';

const Login = () => {
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                const user = result.user;
                Swal.fire({
                    title: "Login Successful",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error("invalid Credential")
            });

    }
    const handleGoogleSignIn = async () => {
        try {
            const data = await signInWithGoogle()
            await saveUser(data?.user)
            navigate('/')
            toast.success('Signup Successful')
        } catch (err) {
            toast.error(err?.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center bg-[#1A202C]'>
            <div className="card w-full mx-auto max-w-2xl shadow-xl bg-white flex flex-row rounded-none">
                <div className='flex flex-col bg-[#9f6914] justify-center space-y-5 pl-6'>
                    <h1 className='text-2xl text-white font-bold'>Welcome Back to Parcel Pilot</h1>
                    <div className='bg-[#1A202C] w-32 h-2 rounded-full'></div>
                    <p className='text-white text-lg font-semibold'>Sign in to continue to your <br /> account.</p>
                </div>
                <form onSubmit={handleSubmit} className="card-body bg-white">
                    <div className="form-control">
                        <label className="label">
                            <span className="">Email</span>
                        </label>
                        <input
                            name='email'
                            type="email"
                            placeholder="Email"
                            className="input input-bordered text-white"
                            required />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="">Password</span>
                        </label>
                        <input
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="input input-bordered text-white"
                            required />
                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='btn btn-xs absolute right-2 top-[52px]'>
                            {
                                showPassword ? <FaEye /> : <FaEyeSlash />
                            }
                        </button>
                    </div>
                    <div className="form-control mt-4">
                        <button className="btn px-5 bg-[#FB923C] text-lg text-white rounded-full cursor-pointer hover:bg-[#ca6602] hover:text-gray-300">Login</button>
                    </div>
                    <div className="form-control mt-4">
                        <button onClick={handleGoogleSignIn} className="btn px-3 btn-outline border-blue-700/80 hover:bg-[#ca6602] text-lg text-black hover:text-white rounded-full cursor-pointer"><FcGoogle /> Continue With Google</button>
                    </div>
                    <div className='form-control mt-4 mx-auto text-lg font-medium'>
                        <p>Don't have an account yet? <NavLink to="/signup" className="text-[#FF6363]">Sign Up</NavLink></p>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
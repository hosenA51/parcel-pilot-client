import { imageUpload, saveUser } from "@/api/utils";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const { createUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext);

    const handleSubmit = async event => {
        event.preventDefault()
        const form = event.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const image = form.image.files[0]
        const phone = form.phone.value
        const role = form.role.value;

        const photoURL = await imageUpload(image)

        if (password.length < 6) {
            toast.error("Password must contain at least 6 characters");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one uppercase letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            toast.error("Password must contain at least one lowercase letter");
            return;
        }
        if (!/[!@#$&*]/.test(password)) {
            toast.error("Password must contain at least one special character");
            return false;
        }
        if (!/[0-9]/.test(password)) {
            toast.error("Password must contain at least one number");
            return false;
        }

        try {
            const result = await createUser(email, password)

            await updateUserProfile(name, photoURL)
            await saveUser({ ...result?.user, displayName: name, photoURL, role, phone })
            navigate('/')
            toast.success('Signup Successful')
        } catch (err) {
            toast.error(err?.message)
        }
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
            <div className="card w-full mx-auto max-w-2xl shadow-xl bg-white flex lg:flex-row md:flex-row rounded-none">
                <div className='flex flex-col bg-[#9f6914] justify-center space-y-5 py-6 pl-6'>
                    <h1 className='text-2xl text-white font-bold'>Your Reliable Delivery Partner</h1>
                    <div className='bg-[#1A202C] w-32 h-2 rounded-full'></div>
                    <p className='text-white text-lg font-semibold'>Seamless Booking, Smarter Delivery, <br /> Efficient Management – Experience <br /> the Future with ParcelPilot!</p>
                </div>
                <form onSubmit={handleSubmit} className="card-body bg-white">
                    <div className="form-control">
                        <input
                            name='name'
                            type="text"
                            placeholder="Name"
                            className="input input-bordered text-white"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <input
                            name='email'
                            type="email"
                            placeholder="Email"
                            className="input input-bordered text-white"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <input
                            name='phone'
                            type="number"
                            placeholder="Phone"
                            className="input input-bordered text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='image' className='block mb-2 text-sm'>
                            Select Image:
                        </label>
                        <input
                            required
                            type='file'
                            id='image'
                            name='image'
                            accept='image/*'
                        />
                    </div>
                    <div className="form-control">
                        <select name="role" className="select select-bordered w-full max-w-xs text-white" required>
                            <option>Role</option>
                            <option value="user">User</option>
                            <option value="delivery-men">Delivery Men</option>
                        </select>
                    </div>
                    <div className="form-control relative">
                        <input type={showPassword ? 'text' : 'password'} name="password" placeholder="password" className="input input-bordered text-white" required />
                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='btn btn-xs absolute right-2 top-[12px]'>
                            {
                                showPassword ? <FaEye /> : <FaEyeSlash />
                            }
                        </button>
                    </div>
                    <div className="form-control mt-3">
                        <button className="btn px-5 bg-[#FB923C] text-lg text-white rounded-full cursor-pointer hover:bg-[#ca6602] hover:text-gray-300">Sign Up</button>
                    </div>
                    <div className="form-control mt-4">
                        <button onClick={handleGoogleSignIn} className="btn px-3 btn-outline border-blue-700/80 hover:bg-[#ca6602] text-lg text-black hover:text-white rounded-full cursor-pointer"><FcGoogle /> Continue With Google</button>
                    </div>
                    <div className='form-control mt-3 mx-auto text-lg font-medium'>
                        <p>Already have an account? <NavLink to="/login" className="text-[#FF6363]">Login</NavLink></p>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;
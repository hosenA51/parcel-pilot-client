import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { AiOutlineBars } from 'react-icons/ai'
import useAuth from '../../../hooks/useAuth'
import logo from '../../../assets/logo1.png'
import AdminMenu from './Menu/AdminMenu'
import { Link, NavLink } from 'react-router-dom'
import UserMenu from './Menu/UserMenu'
import DeliveryMenMenu from './Menu/DeliveryMenMenu'
import useRole from '@/hooks/useRole'
import { FaHome } from 'react-icons/fa'
const Sidebar = () => {
    const { logOut } = useAuth()
    const [isActive, setActive] = useState(false)
    const [role, isLoading] = useRole();

    if (isLoading) return <p>Loading...</p>;

    console.log('Current role:', role);

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }
    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to='/'>
                            <div className='flex gap-2 items-center'>
                                <img src={logo} alt='logo' width='40' height='40' />
                                <h2 className='text-3xl font-bold text-[#ca6602]'>ParcelPilot</h2>
                            </div>
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-[#ca6602] mx-auto'>
                            <Link to='/'>
                                <div className='flex gap-2 items-center'>
                                    <img src={logo} alt='logo' width='40' height='40' />
                                    <h2 className='text-3xl font-bold text-white'>ParcelPilot</h2>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        <nav>
                            {/*  Menu Items */}
                            {role === 'admin' && <AdminMenu />}
                            {role === 'user' && <UserMenu />}
                            {role === 'delivery-men' && <DeliveryMenMenu />}
                        </nav>
                        <div className='h-1 w-60 bg-[#ca6602] rounded-full'></div>
                        <NavLink
                            to="/"
                            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors font-semibold text-lg duration-300 transform'
                        >
                            <FaHome />
                            <span className='ml-2'>Home</span>
                        </NavLink>
                    </div>
                </div>
                <div>
                    <hr />
                    <button
                        onClick={logOut}
                        className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform'
                    >
                        <GrLogout className='w-5 h-5' />

                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar

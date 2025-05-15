import Container from '../Container'
import { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../../assets/logo1.png'
import { Button } from '@/components/ui/button'
import './Navbar.css'
import { AuthContext } from '@/providers/AuthProvider'
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='fixed w-full z-50 backdrop-blur-md bg-white/40 shadow-sm'>
            <div className='py-4 border-b-[1px] bg-transparent'>
                <Container>
                    <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                        {/* Logo */}
                        <Link to='/'>
                            <div className='flex gap-2 items-center'>
                                <img src={logo} alt='logo' width='40' height='40' />
                                <h2 className='text-3xl font-bold text-[#ca6602]'>ParcelPilot</h2>
                            </div>
                        </Link>
                        <div className='flex items-center gap-5 justify-end'>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-lg font-semibold underline text-[#ca6602]"
                                        : "text-lg font-semibold"
                                }
                            >
                                Home
                            </NavLink>

                            {user ?
                                <div className='relative'>
                                    <div className='flex flex-row items-center gap-3'>
                                        <div
                                            onClick={() => setIsOpen(!isOpen)}
                                            className='md:py-1 md:px-1 md:border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                                        >
                                            <div className='rounded-full w-[30px] h-[30px] overflow-hidden border border-white'>
                                                <img
                                                    className='rounded-full w-full h-full'
                                                    referrerPolicy='no-referrer'
                                                    src={user && user.photoURL}
                                                    alt='profile'
                                                    
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {isOpen && (
                                        <div className='menu absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-[#ca6602] overflow-hidden right-0 top-12 text-sm'>
                                            <div className='flex flex-col cursor-pointer'>
                                                <Link
                                                    to='/'
                                                    className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                                >
                                                    Home
                                                </Link>

                                                {user ? (
                                                    <>
                                                        <p className='px-4 py-3 hover:bg-slate-400 transition rounded-xl font-semibold'>{user?.displayName}</p>
                                                        <Link
                                                            to='/dashboard'
                                                            className='px-4 py-3 hover:bg-slate-400 transition rounded-xl font-semibold'
                                                        >
                                                            Dashboard
                                                        </Link>
                                                        <div
                                                            onClick={logOut}
                                                            className='px-4 py-3
                                                            rounded-xl hover:bg-slate-400 transition font-semibold cursor-pointer'
                                                        >
                                                            Logout
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>

                                                        <Link
                                                            to='/signup'
                                                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                                        >
                                                            Sign Up
                                                        </Link>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div> :
                                <Link
                                    to='/login'
                                >
                                    <Button className="text-lg">Login</Button>
                                </Link>
                            }
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Navbar

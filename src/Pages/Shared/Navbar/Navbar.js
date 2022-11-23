import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../Assets/logo.jpg';
import profile from '../../../Assets/profile.jpg';
import { AuthContext } from '../../../Context/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const menuItems = <>
        <>
            <li className='font-semibold'><Link to={'/'}>Home</Link></li>
            <li className='font-semibold'><Link to={'/services'}>Services</Link></li>
            <li className='font-semibold'><Link to={'/blog'}>Blog</Link></li>
        </>
    </>
    const menuItems2 = <>
        <>
            <li className='font-semibold'><Link to={'/'}>Home</Link></li>
            <li className='font-semibold'><Link to={'/services'}>Services</Link></li>
            <li className='font-semibold'><Link to={'/myReviews'}>My Reviews</Link></li>
            <li className='font-semibold'><Link to={'/addService'}>Add Service</Link></li>
            <li className='font-semibold'><Link to={'/blog'}>Blog</Link></li>
        </>
    </>

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }
    return (
        /* navbar start */
        <div>
            {/* largest device navbar */}
            <div className="hidden lg:navbar bg-blue-800  text-white">
                <div className="navbar-start lg:ml-3">

                    <div className=' flex items-center'>
                        <img className='rounded-md object-cover h-full w-14  flex bg-white' src={logo} alt="" />
                        <Link to={'/'} className="btn btn-ghost normal-case text-xl font-bold ">
                            <span className='text-orange-600'>Ogerio</span><span>.</span><span className='text-yellow-500'>Phone</span>
                        </Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        <>
                            {
                                user?.uid ?
                                    <>{menuItems2}</>
                                    :
                                    <>{menuItems}</>
                            }
                        </>
                    </ul>

                </div>
                <div className="navbar-end hidden lg:flex lg:mr-3">
                    {/* user login or register */}

                    <>
                        {
                            user?.uid ?
                                <>
                                    <button className="py-2 md:mr-6 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" onClick={handleLogOut}>Log out</button>
                                    <button className="btn btn-ghost btn-circle">
                                        <Link to={'/profile'}>
                                            <div className="avatar online">
                                                <div className="w-12 rounded-full">
                                                    <abbr title={user?.displayName ? user?.displayName : user.email}>
                                                        <img src={user?.photoURL ? user?.photoURL : profile} alt='' />
                                                    </abbr>
                                                </div>
                                            </div>
                                        </Link>
                                    </button>
                                </>
                                :
                                <>
                                    <Link className="py-2 mx-1 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" to='/login'><button>LogIn</button></Link>

                                    <Link className="py-2 mx-1 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" to='/signup'><button>Register</button></Link>

                                </>
                        }

                    </>
                </div>
            </div>

            {/* medium device and small device nav bar */}
            <div className='navbar lg:hidden bg-blue-800 mb-12 text-white'>
                <div className='navbar-start ml-8'>
                    {/* all link here in dropdown */}
                    <div className=" dropdown  text-gray-900">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <>
                                {
                                    user?.uid ?
                                        <>{menuItems2}</>
                                        :
                                        <>{menuItems}</>
                                }
                            </>
                        </ul>
                    </div>
                </div>
                <div className='navbar-end mr-8'>
                    <div className=' flex items-center'>

                        {/* login or register dropdown here */}
                        <div className=" dropdown  text-gray-900">
                            <label tabIndex={0} className="lg:hidden">
                                <Link to={'/'} className="btn btn-ghost normal-case text-xl font-bold ">
                                    <span className='text-orange-600'>Ogerio</span><span>.</span><span className='text-yellow-500'>Phone</span>
                                </Link>

                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                <>
                                    {
                                        user?.uid ?
                                            <>
                                                <button className="btn btn-ghost btn-circle mx-auto mt-4">
                                                    <div className="avatar online">
                                                        <div className="w-12 rounded-full">
                                                            <abbr title={user?.displayName ? user?.displayName : user.email}>
                                                                <img src={user?.photoURL ? user?.photoURL : profile} alt='' />
                                                            </abbr>
                                                        </div>
                                                    </div>
                                                </button>
                                                <button className="py-2 mx-2 my-4 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" onClick={handleLogOut}>Log out</button>

                                            </>
                                            :
                                            <>
                                                <Link className="py-2 mt-4 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" to='/login'><button>LogIn</button></Link>

                                                <Link className="py-2 my-4 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" to='/signup'><button>Register</button></Link>

                                            </>
                                    }

                                </>

                            </ul>


                        </div>


                    </div>
                </div>
            </div>
        </div>

    );
};

export default Navbar;
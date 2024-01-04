import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ContactUs from './ContactUs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Header() {
    const handleLogout = () => {
        localStorage.removeItem("TOKEN")
        localStorage.removeItem("UserData")
        toast.success("User logout successfully")
        window.location.reload();
    }
    return (
        <>
            <ToastContainer />
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-3 shadow bg-base-100 rounded-box w-52 text-xl gap-3">
                            <li><Link>My Profile</Link></li>
                            <li><Link to={"/likedProducts"}>Liked Products</Link></li>
                            <li><Link to={"/MyProducts"}>My Products</Link></li>
                            <li><Link to={"/ContactUs"}>Contact Us</Link></li>
                            {
                                !localStorage.getItem("TOKEN") ? (
                                    <Link to={"/login"}><button className='px-4 bg-black text-white rounded-md text-center text-sm py-2 w-full'>Login</button></Link>
                                ) : (
                                    <button className='px-4 bg-black text-white rounded-md text-center text-sm py-2 w-full' onClick={handleLogout}>LogOut</button>
                                )
                            }

                            <Link to={"/register"}><button className='bg-slate-200 font-semibold px-3 py-2 rounded-md text-sm w-full'>Create Account</button></Link>

                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <Link to={"/"}><button className="btn btn-ghost text-xl">Exchange</button></Link>
                </div>
                <div className="navbar-end">
                    <Link to={"/sell"}><button className="btn px-8">Sell</button></Link>
                </div>
            </div>

        </>

    )
}

export default Header
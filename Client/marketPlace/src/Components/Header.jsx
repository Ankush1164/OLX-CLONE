import React, { useState } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import headerLogo from "../Assest/siteLogo.png"
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HamburgerMenu from './HamburgerMenu';
import ContactUs from './ContactUs';

function Header() {
    return (
        <>
            <header className='w-full p-2 bg-violet-200  flex justify-between items-center gap-2 header_Side'>
                <div className=' w-fit flex gap-2 items-center'>

                    <div className='w-40 p-2 flex items-center border-r-2 border-violet-400 site_heading'>
                        <h1 className='text-red-500 text-xl font-semibold pl-2'>Market<span className='text-green-500'>Place</span></h1>
                    </div>

                </div>
                <div className='w-12 p-2'>
                    <Link to={"/"}>
                        <img src={headerLogo} alt="" className='cursor-pointer' />
                    </Link>
                </div>

                <div className='w-fit p-2 gap-5 flex items-center usefull_buttons'>
                    <div className=' w-24 flex p-2 items-center justify-between'>
                        <span><ChatIcon /></span>
                        <PersonIcon />
                    </div>
                    {
                        !!localStorage.getItem("TOKEN") ? (
                            <Link to={"/sell"}><button className='px-7 bg-black text-white py-1.5 rounded-md font-semibold text-lg shadow-md'>
                                Sell
                            </button></Link>
                        ) : (
                            <button className='px-5 py-2 bg-black rounded-md shadow-md'>😪</button>
                        )
                    }


                </div>

            </header>

        </>

    )
}

export default Header
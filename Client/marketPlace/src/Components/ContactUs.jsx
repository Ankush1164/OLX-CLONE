import React from 'react'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

function ContactUs() {
    return (
        <>
            <div className='h-screen w-full bg-gradient-to-b from-violet-300 to-pink-300 flex justify-center items-center'>
                <div className='w-2/5 h-fit py-2 rounded-md drop-shadow-lg bg-black absolute flex flex-col'>
                    <div className='flex flex-col w-full p-2 px-5 gap-2'>
                        <label htmlFor="" className='text-white'>Your Registerd Name</label>
                        <input type="text" className='outline-none p-2  rounded-md  font-semibold'/>
                    </div>
                    <div className='flex flex-col w-full p-2 px-5 gap-2'>
                        <label htmlFor="" className='text-white'>Your Registerd Email.</label>
                        <input type="text" className='outline-none p-2  rounded-md  font-semibold'/>
                    </div>
                    <div className='flex flex-col w-full p-2 px-5 gap-2'>
                        <label htmlFor="" className='text-white'>Your Query</label>
                        <textarea className='outline-none p-2  rounded-md  font-semibold'/>
                    </div>

                    <div className='w-full flex justify-center p-2 mt-4'>
                        <button className='bg-violet-700 font-semibold w-72 px-9 py-2 rounded-md text-white'>Submit</button>
                    </div>
                    
                    <div className='w-full px-6 py-2 flex flex-col gap-1'>
                    <p className='text-emerald-400'>👉 We will resolve your Quary withing 24h</p>
                    <p className='text-emerald-400'>👉 We will inform your query status through mail. So please chek you mail or spam box of mail.</p>
                    <p className='text-white underline'><span className='text-white text-sm mr-2'><AlternateEmailIcon/></span>teamexchange10@gmail.com</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ContactUs
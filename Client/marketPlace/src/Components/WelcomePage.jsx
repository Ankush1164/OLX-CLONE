import React from 'react'
import "../Components/Loading.css"

function WelcomePage() {
  return (
    <>
    <div className='bg-violet-200 w-full h-screen flex gap-5 justify-center items-center flex-col'>
    <span class="loader"></span>
    <h1 className='text-lg font-semibold'>Wait...🙃</h1>
    </div>
    
    </>
  )
}

export default WelcomePage
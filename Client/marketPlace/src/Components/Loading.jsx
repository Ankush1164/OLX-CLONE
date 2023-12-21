import React from 'react'
import "../Components/Loading.css"

function Loading() {
    return (
        <div className='w-full h-full items-center justify-center flex flex-col gap-2'>
            <span class="loaders"></span>
            <p>Loading...</p>
        </div>

    )
}

export default Loading
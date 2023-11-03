import React from 'react'
import { Link } from 'react-router-dom'

const NewItems = () => {

    return (
        <>
            <div className="carousel carousel-center w-full p-4 space-x-4 bg-base-200 rounded-box">
                <div className="carousel-item relative h-[13em]">
                    <Link to="/product/1" className='w-full'>
                    <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" className="w-full h-full object-cover rounded-box" />
                    <p className='absolute text-xl text-white bottom-2 left-4'>Lorem ipsum dolor sit.</p>
                    </Link>
                </div>
                <div className="carousel-item relative h-[13em]">
                    <Link to="/product/1" className='w-full'>
                    <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" className="w-full h-full object-cover rounded-box" />
                    <p className='absolute text-xl text-white bottom-2 left-4'>Lorem ipsum dolor sit.</p>
                    </Link>
                </div>
                <div className="carousel-item relative h-[13em]">
                    <Link to="/product/1" className='w-full'>
                    <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" className="w-full h-full object-cover rounded-box" />
                    <p className='absolute text-xl text-white bottom-2 left-4'>Lorem ipsum dolor sit.</p>
                    </Link>
                </div>
                <div className="carousel-item relative h-[13em]">
                    <Link to="/product/1" className='w-full'>
                    <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" className="w-full h-full object-cover rounded-box" />
                    <p className='absolute text-xl text-white bottom-2 left-4'>Lorem ipsum dolor sit.</p>
                    </Link>
                </div>
                
            </div>
        </>
    )
}

export default NewItems
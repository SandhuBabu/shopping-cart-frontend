import React from 'react'
import { Link } from 'react-router-dom'

const NewItems = ({ data }) => {
    return (
        <div className="carousel carousel-center w-full p-4 space-x-4  rounded-box">
            {
                data.map((product, k) => (
                    <div key={k} className="carousel-item relative h-[13em] min-w-[25em] bg-base-200 py-3 rounded-lg hover:shadow-lg">
                        <Link to={`product/${product?.id}`} className='w-full '>
                            <figure className='h-full rounded-box flex justify-center'>
                                <img src={product?.imageUrl} className="h-full object-cover" />
                            </figure>
                            {/* <p className='absolute text-xl w-full px-5  bottom-2  overflow-hidden text-ellipsis whitespace-nowrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, et.</p> */}
                        </Link>
                    </div>
                ))
            }
        </div>
    )
    // return (
    //     <>
    //         <div className="carousel carousel-center w-full p-4 space-x-4 bg-base-200 rounded-box">
    //             <div className="carousel-item relative h-[13em]">
    //                 <Link to="/product/1" className='w-full'>
    //                     <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" className="w-full h-full object-cover rounded-box" />
    //                     <p className='absolute text-xl text-white bottom-2 left-4'>Lorem ipsum dolor sit.</p>
    //                 </Link>
    //             </div>
    //             <div className="carousel-item relative h-[13em]">
    //                 <Link to="/product/1" className='w-full'>
    //                     <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" className="w-full h-full object-cover rounded-box" />
    //                     <p className='absolute text-xl text-white bottom-2 left-4'>Lorem ipsum dolor sit.</p>
    //                 </Link>
    //             </div>
    //             <div className="carousel-item relative h-[13em]">
    //                 <Link to="/product/1" className='w-full'>
    //                     <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" className="w-full h-full object-cover rounded-box" />
    //                     <p className='absolute text-xl text-white bottom-2 left-4'>Lorem ipsum dolor sit.</p>
    //                 </Link>
    //             </div>
    //             <div className="carousel-item relative h-[13em]">
    //                 <Link to="/product/1" className='w-full'>
    //                     <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" className="w-full h-full object-cover rounded-box" />
    //                     <p className='absolute text-xl text-white bottom-2 left-4'>Lorem ipsum dolor sit.</p>
    //                 </Link>
    //             </div>

    //         </div>
    //     </>
    // )
}

export default React.memo(NewItems)
import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


const ProductsList = () => {

    const [imageLoad, setImageLoad] = useState(false);
    const content = useSelector(store => store.products.content)

    return (
        <div className='grid sm:grid-cols-[repeat(2,_1fr)] md:grid-cols-[repeat(3,_1fr)] lg:grid-cols-[repeat(5,_1fr)] gap-4'>
            {
                content.map((item, k) => (
                    <div
                        key={k}
                        className={`product-list-card h-[20em] p-[1em] overflow-hidden rounded-lg hover:shadow-lg cursor-pointer`}
                    >
                        <Link to={`/product/${item?.id}`} target='_blank'>
                            <figure
                                className='w-full h-[80%] flex justify-center items-center'>
                                <img
                                    src={item.imageUrl}
                                    onLoad={() => setImageLoad(true)}
                                    className={`${imageLoad ? 'opacity-[1]' : 'opacity-0 h-0'}  h-full max-w-full object-cover rounded-lg`}
                                    alt=""
                                />
                                {
                                    !imageLoad &&
                                    <div className='w-[14em] h-[16em]'>
                                        <Skeleton width='15em' height='16em' />
                                    </div>
                                }
                            </figure>
                        </Link>
                        <div className='mt-3'>
                            {
                                imageLoad ?
                                    <>
                                        <h4
                                            onClick={() => handleNavigate(item?.id)}
                                        >{item?.title}</h4>
                                        <div className='flex justify-between'>
                                            <p>₹  <span>{item?.price}</span></p>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 cursor-pointer"
                                                fill={item?.isLiked ? 'red' : 'none'}
                                                viewBox="0 0 24 24" stroke={item?.isLiked ? 'none' : 'currentColor'}
                                                onClick={() => alert()}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </div>
                                    </>
                                    :
                                    <div className='mt-[1em]'>
                                        <Skeleton width='14em' height='1em' count={2} />
                                    </div>
                            }
                        </div>
                    </div>

                ))
            }
        </div>
    )
}

export default React.memo(ProductsList)


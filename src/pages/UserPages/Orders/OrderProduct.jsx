import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { Count } from '../../../components';

const order = {
    id: 1,
    productId: 1001,
    title: "Product A",
    price: 19.99,
    rating: 0,
    status: 'Delivered',
    imageUrl: "https://rukminim1.flixcart.com/image/300/300/xif0q/shoe/7/2/m/6-tm-12-6-trm-white-original-imagjqyzz8z9jrgf.jpeg"
}

const OrderProduct = () => {
    const location = useLocation();
    const { address, product } = location.state
    const user = useSelector(store => store.user)

    const [count, setCount] = useState(1);

    const incrementCount = useCallback(() => {
        setCount(prev => prev === 5 ? 1 : prev + 1)
    }, [])

    const decrementCount = useCallback(() => {
        setCount(prev => prev === 1 ? 5 : prev - 1)
    }, [])

    return (
        <>
            <h1 className='text-2xl'>Order Product</h1>
            <div className='flex flex-col lg:flex-row gap-8 px-4 py-5'>
                <div className='flex flex-col sm:flex-row gap-8'>
                    <img
                        src={product.imageUrl}
                        alt=""
                        className='w-[15em] rounded'
                    />
                    <div>
                        <h1 className='text-lg font-bold flex'>
                            <span>{product?.title}</span>
                        </h1>
                        <p className='w-[25em] flex gap-[1em] mt-2'>
                            <span>Price:</span>
                            <span>Rs {product?.price} /-</span>
                        </p>
                        <p className='w-[25em] flex gap-[1em] mt-2'>
                            <span>Stock Available:</span>
                            <span>{product?.stockAvailable}</span>
                        </p>
                        <p className='w-[25em] flex gap-[1em] mt-2'>
                            <span>Delivery Charge:</span>
                            <span>₹ 49</span>
                        </p>

                        <Count
                            count={count}
                            handleIncrement={incrementCount}
                            handleDecrement={decrementCount}
                        />
                    </div>
                </div>

                <div className='md:w-[30%]'>
                    <h1 className='text-lg font-bold mb-4'>Delivery Address</h1>
                    <p className='font-medium'>{user?.username}</p>
                    <p className='mt-1'>
                        <span>{address?.houseName},</span>
                        <span className='ml-2'>{address?.locality},</span>
                    </p>
                    <p className='flex gap-1 mt-1'>
                        <span>{address?.district},</span>
                        <span>{address?.state}</span>
                        <span>-{address?.zip}</span>
                    </p>
                    <p className=' mt-1'>
                        <span className='font-medium'>Phone Number</span>
                        <span className='ml-4'>{user?.mobile}</span>
                    </p>
                </div>
            </div>

            <button className='my-6 ml-4 btn btn-primary'>Pay Now</button>
        </>
    )
}

export default OrderProduct
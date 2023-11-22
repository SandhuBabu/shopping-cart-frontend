import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Count } from '../../../components';


const OrderProduct = () => {
    const location = useLocation();
    const { state } = location
    const user = useSelector(store => store.user)
    const { id } = useParams()
    const navigate = useNavigate();

    const [count, setCount] = useState(1);

    useEffect(() => {
        if (!state?.address || !state?.product) {
            return navigate(`/product/${id}`)
        }
    }, [])

    const incrementCount = useCallback(() => {
        setCount(prev => prev === state?.product?.stockAvailable ? 1 : prev + 1)
    }, [])

    const decrementCount = useCallback(() => {
        setCount(prev => prev === 1 ? 1 : prev - 1)
    }, [])

    return (
        <>
            <h1 className='text-2xl'>Order Product</h1>
            <div className='flex flex-col lg:flex-row gap-8 px-4 py-5'>
                <div className='flex flex-col sm:flex-row gap-8'>
                    <img
                        src={state?.product.imageUrl}
                        alt=""
                        className='w-[15em] rounded'
                    />
                    <div>
                        <h1 className='text-lg font-bold flex'>
                            <span>{state?.product?.title}</span>
                        </h1>
                        <p className='w-[25em] flex gap-[1em] mt-2'>
                            <span>Price:</span>
                            <span>Rs {state?.product?.price} /-</span>
                        </p>
                        <p className='w-[25em] flex gap-[1em] mt-2'>
                            <span>Stock Available:</span>
                            <span>{state?.product?.stockAvailable}</span>
                        </p>
                        <p className='w-[25em] flex gap-[1em] mt-2'>
                            <span>Delivery Charge:</span>
                            <span>₹ 49</span>
                        </p>

                        <Count
                            count={count}
                            max={state?.product?.stockAvailable}
                            handleIncrement={incrementCount}
                            handleDecrement={decrementCount}
                        />
                    </div>
                </div>

                <div className='md:w-[30%]'>
                    <h1 className='text-lg font-bold mb-4'>Delivery Address</h1>
                    <p className='font-medium'>{user?.username}</p>
                    <p className='mt-1'>
                        <span>{state?.address?.houseName},</span>
                        <span className='ml-2'>{state?.address?.locality},</span>
                    </p>
                    <p className='flex gap-1 mt-1'>
                        <span>{state?.address?.district},</span>
                        <span>{state?.address?.state}</span>
                        <span>-{state?.address?.zip}</span>
                    </p>
                    <p className=' mt-1'>
                        <span className='font-medium'>Phone Number</span>
                        <span className='ml-4'>{user?.mobile}</span>
                    </p>
                </div>
            </div>

            <button
                className='my-6 ml-4 btn btn-primary btn-wide'
            >Pay Now</button>
        </>
    )
}

export default OrderProduct
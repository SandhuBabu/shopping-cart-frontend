import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { copyText, getOrderStatusTextColor } from '../../../utils/utils'

const order = {
    id: 1,
    productId: 1001,
    title: "Product A",
    price: 19.99,
    rating: 0,
    status: 'Delivered',
    imageUrl: "https://rukminim1.flixcart.com/image/300/300/xif0q/shoe/7/2/m/6-tm-12-6-trm-white-original-imagjqyzz8z9jrgf.jpeg"
}

const OrderSummaryPage = () => {

    const { id } = useParams();
    const [copy, setCopy] = useState(true)

    return (
        <div className='flex flex-col lg:flex-row gap-8 px-4 py-5'>
            <div className='flex flex-col sm:flex-row w-[40%] gap-8'>
                <img
                    src={order.imageUrl}
                    alt=""
                    className='w-[10em] rounded'
                />
                <div className=''>
                    <h1 className='text-lg font-bold flex'>
                        <span>{order?.title}</span>
                    </h1>
                    <p className='w-[10em] flex items-center gap-[1em] mt-2'>
                        <span>Order ID:</span>
                        <span>{order?.id}</span>
                        {
                            copy ?
                                <button
                                    onClick={() => {
                                        copyText("Order ID : " + order?.id)
                                        setCopy(false)
                                        setTimeout(() => {
                                            setCopy(true)
                                        }, 2000)
                                    }}
                                    className="material-symbols-outlined text-[1em] btn btn-sm btn-circle"
                                >
                                    content_copy
                                </button>
                                :
                                <span className="material-symbols-outlined text-green-400 text-[1em] btn btn-sm btn-circle">
                                    done_all
                                </span>
                        }
                    </p>
                    <p className='w-[10em] flex gap-[1em] mt-2'>
                        <span>Price:</span>
                        <span>{order?.price}</span>
                    </p>
                    <p className='w-[10em] flex gap-[1em] mt-2'>
                        <span>Status:</span>
                        <span className={`${getOrderStatusTextColor(order?.status)}`}>{order?.status}</span>
                    </p>

                    <Link
                        to={`/product/${order?.productId}`}
                        className='btn-link font-medium block mt-4'
                    >
                        View Product
                    </Link>
                </div>
            </div>

            <div className='w-[30%]'>
                <h1 className='text-lg font-bold mb-4'>Delivery Address</h1>
                <p className='font-medium'>Sandhu Babu</p>
                <p className='mt-1'>
                    {/* house name */}
                    <span>Vettikavumkal(H)</span>
                    {/* locality */}
                    <span className='ml-2'>Pulickalkavala P.O Vazhoor,</span>
                </p>
                <p className='flex gap-1 mt-1'>
                    {/* district */}
                    <span>Kottayam,</span>

                    {/* state */}
                    <span>Kerala</span>

                    {/* zip */}
                    <span>- 686515</span>
                </p>
                <p className=' mt-1'>
                    <span className='font-medium'>Phone Number</span>
                    <span className='ml-4'>8086267521</span>
                </p>
            </div>

            {
                order?.status === "Delivered" &&
                <div className='flex-1'>
                    <h1 className='text-lg font-bold'>Invoice</h1>

                    <button
                        className='btn btn-outline btn-primary mt-5'
                    >
                        Download Invoice
                    </button>
                </div>
            }
        </div>
    )
}

export default OrderSummaryPage
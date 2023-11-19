import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '../../../components'
import Confetti from 'react-confetti'
import { getOrderStatusTextColor } from '../../../utils/utils'

const ordersData = [
    {
        id: 1,
        productId: 1001,
        title: "Product A",
        price: 19.99,
        rating: 0,
        status: 'Delivered',
        imageUrl: "https://rukminim1.flixcart.com/image/300/300/xif0q/shoe/7/2/m/6-tm-12-6-trm-white-original-imagjqyzz8z9jrgf.jpeg"
    },
    {
        id: 2,
        productId: 1002,
        title: "Product B",
        price: 29.99,
        rating: 1,
        status: 'Cancelled',
        imageUrl: "https://rukminim1.flixcart.com/image/300/300/xif0q/shoe/7/2/m/6-tm-12-6-trm-white-original-imagjqyzz8z9jrgf.jpeg"
    },
    {
        id: 3,
        productId: 1003,
        title: "Product C",
        price: 9.99,
        rating: 3,
        status: 'Delivered',
        imageUrl: "https://rukminim1.flixcart.com/image/300/300/xif0q/shoe/7/2/m/6-tm-12-6-trm-white-original-imagjqyzz8z9jrgf.jpeg"
    },
    {
        id: 4,
        productId: 1004,
        title: "Product D",
        price: 14.99,
        rating: 4,
        status: 'Cancelled',
        imageUrl: "https://rukminim1.flixcart.com/image/300/300/xif0q/shoe/7/2/m/6-tm-12-6-trm-white-original-imagjqyzz8z9jrgf.jpeg"
    },
    {
        id: 5,
        productId: 1005,
        title: "Product E",
        price: 24.99,
        rating: 5,
        status: 'Shipped',
        imageUrl: "https://rukminim1.flixcart.com/image/300/300/xif0q/shoe/7/2/m/6-tm-12-6-trm-white-original-imagjqyzz8z9jrgf.jpeg"
    },
]

const OrdersPage = () => {


    const [orders, setOrders] = useState(ordersData)
    const [showConfetti, setShowConfetti] = useState(false)


    const handleRating = (e, orderId) => {
        const val = Number(e.target.value);

        const newOrders = orders.map(order => {
            if (order?.id === orderId) {
                return { ...order, rating: val }
            }
            return order
        })
        setShowConfetti(true)
        setTimeout(() => {
            setShowConfetti(false)
        }, 3000)
        setOrders(newOrders)
    }


    return (
        <>
            <div className='flex flex-col gap-[3em] md:gap-4 items-center w-full px-[1em] pt-6'>
                {
                    orders.map((item, k) => (
                        <div key={k} className='flex flex-col w-full md:w-[50%] md:flex-row justify-between items-center px-6 py-6 shadow-md hover:bg-base-300'>
                            <Link 
                            to={`/orders/${item?.id}`}
                            className='flex-1 flex flex-col md:flex-row md:items-start items-center'
                            >
                                <img
                                    src={item?.imageUrl}
                                    alt="product"
                                    className='w-[7em] rounded'
                                />
                                <div className='flex flex-1 flex-col items-center mt-2 justify-center'>
                                    <h1>{item?.title}</h1>
                                    <p>₹  {item?.price}</p>
                                </div>
                            </Link>
                            <div>
                                <p className={`${getOrderStatusTextColor(item?.status)} text-center`}>{item?.status}</p>
                                {
                                    item?.status === 'Delivered' &&
                                    <div className='text-center mt-5'>
                                        <Rating rating={item?.rating} orderId={item?.id} handleRating={handleRating} />
                                    </div>
                                }
                            </div>
                        </div>
                    ))
                }

            </div>
            {
                showConfetti &&
                <Confetti
                    width={window.innerWidth - 50}
                    gravity={0.9}
                    height={window.innerHeight}
                />
            }
        </>

    )
}

export default OrdersPage
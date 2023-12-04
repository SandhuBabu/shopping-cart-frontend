import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatDate } from '../../../utils/utils'


const OrdersTable = ({ orders = [] }) => {

    const navigate = useNavigate();

    return (
        <div className="flex-1 mt-[4em]">
            <h1 className='mt-3 text-lg font-medium'>Recent Orders</h1>
            <table className="w-full table-sm overflow-x-scroll">
                <thead>
                    <tr className='text-left text-sm text-gray-500'>
                        <th>Order ID</th>
                        <th>Product</th>
                        <th>Date</th>
                        <th>View</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orders.map((order, k) => (
                            <tr key={k} className="w-full hover:bg-base-200 cursor-pointer text-left">
                                <th>{order?.razorpayOrderId.slice(6)}</th>
                                <td className='flex items-center gap-1'>
                                    <img
                                        src={order?.product?.imageUrl}
                                        className='w-[4em] rounded max-h-[4em]'
                                        alt="" />
                                    <p className='flex flex-col'>
                                        <span className='font-semibold'>{order?.product?.title}</span>
                                        <span className='text-gray-400'>{order?.product?.category}</span>
                                    </p>
                                </td>
                                <td>{formatDate(order?.createdAt)}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            navigate(`/orders/${order?.id}`, {
                                                state: { order }
                                            })
                                        }}
                                        className='link text-primary font-medium'
                                    >View</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Link
                to='/orders'
                className='mt-4 block link ml-[1em] text-primary font-medium text-sm'
            >View More</Link>
        </div>
    )
}

export default OrdersTable
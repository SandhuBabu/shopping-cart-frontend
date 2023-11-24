import React from 'react'
import { Link } from 'react-router-dom'

const orders = [
    {
        "orderId": "1",
        "productTitle": "Product A",
        "date": "2021-01-01",
        "price": "10"
    },
    {
        "orderId": "2",
        "productTitle": "Product B",
        "date": "2021-01-02",
        "price": "20"
    },
    {
        "orderId": "3",
        "productTitle": "Product C",
        "date": "2021-01-03",
        "price": "30"
    },
    {
        "orderId": "4",
        "productTitle": "Product D",
        "date": "2021-01-04",
        "price": "40"
    },
    {
        "orderId": "5",
        "productTitle": "Product E",
        "date": "2021-01-05",
        "price": "50"
    },
    {
        "orderId": "6",
        "productTitle": "Product F",
        "date": "2021-01-06",
        "price": "60"
    },
    {
        "orderId": "7",
        "productTitle": "Product G",
        "date": "2021-01-07",
        "price": "70"
    },
    {
        "orderId": "8",
        "productTitle": "Product H",
        "date": "2021-03-07",
        "price": "70"
    },
]


const OrdersTable = () => {
    return (
        <div className="flex-1">
            <h1 className='mt-3 ml-14 text-lg font-medium'>Recent Orders</h1>
            <table className="w-full table-sm">
                <thead>
                    <tr className='text-left text-sm text-gray-500'>
                        <th className='text-center'>Order ID</th>
                        <th>Product</th>
                        <th>Date</th>
                        <th>View</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orders.map((order, k) => (
                            <tr key={k} className="w-full hover:bg-base-200 cursor-pointer text-left">
                                <th className='text-center'>{order?.orderId}</th>
                                <td>{order?.productTitle}</td>
                                <td>{order?.date}</td>
                                <td>
                                    <Link
                                        to={`/order/${order?.orderId}`}
                                        className='link text-primary font-medium'
                                    >View</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
                <Link
                    to='/orders'
                    className='mt-4 block link ml-[5em] text-primary font-medium text-sm'
                >View More</Link>
        </div>
    )
}

export default OrdersTable
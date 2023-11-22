import React from 'react'
import { Link } from 'react-router-dom'

const orders = [
    {
        "id": "1",
        "title": "Product 1",
        "customer": "Customer 1"
    },
    {
        "id": "2",
        "title": "Product 2",
        "customer": "Customer 2"
    },
    {
        "id": "3",
        "title": "Product 3",
        "customer": "Customer 3"
    },
    {
        "id": "4",
        "title": "Product 4",
        "customer": "Customer 4"
    },
    {
        "id": "5",
        "title": "Product 5",
        "customer": "Customer 5"
    },
    {
        "id": "6",
        "title": "Product 6",
        "customer": "Customer 6"
    },
    {
        "id": "7",
        "title": "Product 7",
        "customer": "Customer 7"
    },
]


const OrdersTable = () => {
    return (
        <div className="md:w-[30em] overflow-x-auto bg-base-300 rounded-xl mt-4">
            <h1 className='ml-3 mt-3 font-medium'>Last 7 Orders</h1>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>SlNo</th>
                        <th>Product</th>
                        <th>Customer</th>
                        <th>View Ordder</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, k) => (
                            <tr key={k} className="hover">
                                <th>{k + 1}</th>
                                <td>{order?.title}</td>
                                <td>{order?.customer}</td>
                                <td>
                                    <Link
                                        to={`/order/${order?.id}`}
                                        className='bg-primary px-4 py-1 rounded text-white'
                                    >View</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrdersTable
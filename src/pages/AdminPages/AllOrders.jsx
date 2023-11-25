import React, {
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react'
import { Link } from 'react-router-dom'
import {
    getOrderStatusBg,
    copyText,
    orderStatusOptions
} from '../../utils/utils'
import Toast from '../../components/CommonComponents/Alert/Toast'
import { BreadCrumb, Select } from '../../components'


const breadCrumbsOptions = [
    { title: "Dashboard", path: "/" },
    { title: "Orders" }
]

const allOrders = [
    {
        "orderId": "order_1a2b3c",
        "productTitle": "Example Product 1",
        "productCategory": "Electronics",
        "price": "19.99",
        "quantity": "2",
        "status": "placed"
    },
    {
        "orderId": "order_4d5e6f",
        "productTitle": "Example Product 2",
        "productCategory": "Clothing",
        "price": "29.99",
        "quantity": "1",
        "status": "shipped"
    },
    {
        "orderId": "order_7g8h9i",
        "productTitle": "Example Product 3",
        "productCategory": "Home & Kitchen",
        "price": "9.99",
        "quantity": "3",
        "status": "delivered"
    },
    {
        "orderId": "order_j1k2l3",
        "productTitle": "Example Product 4",
        "productCategory": "Toys & Games",
        "price": "14.99",
        "quantity": "1",
        "status": "cancelled"
    },
    {
        "orderId": "order_m4n5o6",
        "productTitle": "Example Product 5",
        "productCategory": "Beauty",
        "price": "24.99",
        "quantity": "2",
        "status": "placed"
    },
    {
        "orderId": "order_p7q8r9",
        "productTitle": "Example Product 6",
        "productCategory": "Sports & Outdoors",
        "price": "39.99",
        "quantity": "1",
        "status": "shipped"
    },
    {
        "orderId": "order_s1t2u3",
        "productTitle": "Example Product 7",
        "productCategory": "Automotive",
        "price": "49.99",
        "quantity": "3",
        "status": "delivered"
    },
    {
        "orderId": "order_v4w5x6",
        "productTitle": "Example Product 8",
        "productCategory": "Books",
        "price": "9.99",
        "quantity": "1",
        "status": "cancelled"
    },
    {
        "orderId": "order_y7z8a9",
        "productTitle": "Example Product 9",
        "productCategory": "Electronics",
        "price": "79.99",
        "quantity": "2",
        "status": "placed"
    },
    {
        "orderId": "order_b1c2d3",
        "productTitle": "Example Product 10",
        "productCategory": "Clothing",
        "price": "49.99",
        "quantity": "1",
        "status": "shipped"
    },
    {
        "orderId": "order_e4f5g6",
        "productTitle": "Example Product 11",
        "productCategory": "Home & Kitchen",
        "price": "29.99",
        "quantity": "3",
        "status": "delivered"
    },
    {
        "orderId": "order_h7i8j9",
        "productTitle": "Example Product 12",
        "productCategory": "Toys & Games",
        "price": "19.99",
        "quantity": "1",
        "status": "cancelled"
    },
    {
        "orderId": "order_k1l2m3",
        "productTitle": "Example Product 13",
        "productCategory": "Beauty",
        "price": "34.99",
        "quantity": "2",
        "status": "placed"
    },
    {
        "orderId": "order_n4o5p6",
        "productTitle": "Example Product 14",
        "productCategory": "Sports & Outdoors",
        "price": "59.99",
        "quantity": "1",
        "status": "shipped"
    },
    {
        "orderId": "order_q7r8s9",
        "productTitle": "Example Product 15",
        "productCategory": "Automotive",
        "price": "69.99",
        "quantity": "3",
        "status": "delivered"
    },
    {
        "orderId": "order_t1u2v3",
        "productTitle": "Example Product 16",
        "productCategory": "Books",
        "price": "14.99",
        "quantity": "1",
        "status": "cancelled"
    },
    {
        "orderId": "order_w4x5y6",
        "productTitle": "Example Product 17",
        "productCategory": "Electronics",
        "price": "99.99",
        "quantity": "2",
        "status": "placed"
    },
    {
        "orderId": "order_z7a8b9",
        "productTitle": "Example Product 18",
        "productCategory": "Clothing",
        "price": "69.99",
        "quantity": "1",
        "status": "shipped"
    },
    {
        "orderId": "order_c1d2e3",
        "productTitle": "Example Product 19",
        "productCategory": "Home & Kitchen",
        "price": "39.99",
        "quantity": "3",
        "status": "delivered"
    },
    {
        "orderId": "order_f4g5h6",
        "productTitle": "Example Product 20",
        "productCategory": "Toys & Games",
        "price": "24.99",
        "quantity": "1",
        "status": "cancelled"
    }
]


const AllOrders = () => {

    const selectRef = useRef()

    const [orders, setOrders] = useState([]);
    const [copy, setCopy] = useState(false);

    const handleOrderIDCopy = (orderId) => {
        copyText(orderId)
        setCopy(true);
        setTimeout(() => {
            setCopy(false)
        }, 1500)
    }

    useEffect(() => {
        const newOrders = allOrders.filter(item => item.status === "placed")
        setOrders(newOrders)
    }, [])

    const handleFilterChange = useCallback(({ target }) => {
        const val = target.value

        if (val === "all") {
            setOrders(allOrders)
            return
        }

        const filterProducts = allOrders.filter(order => order?.status === val)
        setOrders(filterProducts)
    }, [])

    const handleSearch = ({ target }) => {
        const text = target.value

        if (selectRef.current.value === "all") {
            const searchedOrders = allOrders.filter(order => {
                if (order?.orderId.slice(6).includes(text)) {
                    return order
                }
            })
            setOrders(searchedOrders)
            return
        }

        const searchedOrders = allOrders.filter(order => {
            if (
                (order?.orderId.slice(6).includes(text)) &&
                (order.status === selectRef.current.value)
            ) {
                return order
            }
        })
        setOrders(searchedOrders)
    }

    return (
        <>
            <div className='min-h-screen'>

                <BreadCrumb breadCrumbsOptions={breadCrumbsOptions} />

                <div className='mb-6 ml-3 flex items-center justify-between'>
                    <div>
                        <h1 className='text-2xl font-semibold'>Orders</h1>
                        <span className='font-[500] text-sm text-primary'>100+ new orders found</span>

                    </div>
                    <div className="tooltip text-xs mr-6 lg:mr-[4.5em]" data-tip="Export as Excel">
                        <button className="btn btn-square btn-outline btn-primary">
                            <span className="material-symbols-outlined">
                                download
                            </span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <div className='flex flex-col md:flex-row justify-between md:mb-0 mb-4'>
                        <div className='flex items-center mt-[-2em] gap-2'>
                            <p className='translate-y-4 w-[6em]'>Filters : </p>
                            <Select
                                ref={selectRef}
                                name="orderFilter"
                                options={[{ title: "all" }, ...orderStatusOptions]}
                                classNames="w-[9em_!important] custom-select"
                                defaultValue="placed"
                                onChange={handleFilterChange}
                            />
                        </div>

                        <p className='flex items-center gap-2 mr-6 lg:mr-[3.5em]'>
                            <input
                                type="search"
                                placeholder="Search with order id"
                                className="input input-primary w-full max-w-xs"
                                onChange={handleSearch}
                            />
                        </p>
                    </div>
                    <table className="table">
                        <thead><TableHeadFoot /></thead>
                        <tbody>
                            {
                                orders.map((order, k) => (
                                    <tr key={k}>
                                        <td>{k + 1}</td>
                                        <td>
                                            <p className='tooltip' data-tip="Copy ID">
                                                <span
                                                    className='cursor-pointer'
                                                    onClick={() => handleOrderIDCopy(order?.orderId)}
                                                >{order?.orderId.slice(6)}</span>
                                            </p>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/orders/${order?.orderId}`}
                                                className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src="https://img.freepik.com/premium-photo/neon-green-white-nike-shoes-with-neon-green-lights_439473-92.jpg" alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-bold md:tooltip" data-tip="View order">
                                                        <span>{order?.productTitle}</span>
                                                    </p>
                                                    <p className="text-sm opacity-50">{order?.productCategory}</p>
                                                </div>
                                            </Link>
                                        </td>
                                        <td>₹ {order?.price}</td>
                                        <td className='text-center'>{order?.quantity}</td>
                                        <th className='flex items-center justify-center'>
                                            <Status variant={order?.status} bg={getOrderStatusBg(order?.status)} />
                                        </th>
                                    </tr>
                                ))
                            }
                        </tbody>

                        <tfoot><TableHeadFoot /></tfoot>
                    </table>
                </div>
            </div>

            {copy && <Toast variant="green" children="Order Id Copied Successfully" />}
        </>
    )
}

export default AllOrders


const TableHeadFoot = () => {
    return (
        <tr>
            <th>SlNo</th>
            <th>Order ID</th>
            <th>Product</th>
            <th>Price ₹</th>
            <th className='text-center'>Quantity</th>
            <th className='text-center'>Status</th>
        </tr>
    )
}


const Status = ({ variant, bg }) => {
    return (
        <span
            style={{ background: bg }}
            className={`flex items-center cursor-default capitalize text-[10px] rounded-xl btn-xs`}
        >
            {variant || 'unavailable'}
        </span>
    )
}
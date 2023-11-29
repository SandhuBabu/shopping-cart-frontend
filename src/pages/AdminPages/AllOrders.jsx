import React, {
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    getOrderStatusBg,
    copyText,
    orderStatusOptions
} from '../../utils/utils'
import Toast from '../../components/CommonComponents/Alert/Toast'
import { BreadCrumb, Select } from '../../components'
import { getAllOrdersForAdmin } from '../../services/adminService'


const breadCrumbsOptions = [
    { title: "Dashboard", path: "/" },
    { title: "Orders" }
]

// let allOrders = [
//     {
//         "orderId": "order_1a2b3c",
//         "productTitle": "Example Product 1",
//         "productCategory": "Electronics",
//         "price": "19.99",
//         "quantity": "2",
//         "status": "placed"
//     },
//     {
//         "orderId": "order_4d5e6f",
//         "productTitle": "Example Product 2",
//         "productCategory": "Clothing",
//         "price": "29.99",
//         "quantity": "1",
//         "status": "shipped"
//     },
// ]

let allOrders = []

const AllOrders = () => {

    const selectRef = useRef();
    const navigate = useNavigate();
    const controller = new AbortController();

    
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
        handleGetOrders();
        
        return () => {
            controller.abort();
        }
    }, [])

    const handleGetOrders = async () => {

        const data = await getAllOrdersForAdmin(controller.signal);
        allOrders = [...allOrders, ...data]
        const newOrders = allOrders.filter(item => item?.status === "placed")
        setOrders(newOrders)
        console.log("ALL_ORDERS", allOrders);
    }

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
                if (order?.razorpayOrderId.slice(6).includes(text)) {
                    return order
                }
            })
            setOrders(searchedOrders)
            return
        }

        const searchedOrders = allOrders.filter(order => {
            if (
                (order?.razorpayOrderId.slice(6).includes(text)) &&
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

                        <p className='flex w-[16em] justify-end gap-2 mr-6 lg:mr-[3.5em]'>
                            <input
                                type="search"
                                placeholder="Search with razorpay order id"
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
                                                    onClick={() => handleOrderIDCopy(`Razorpay order Id: ${order?.razorpayOrderId}, order Id: ${order?.id}`)}
                                                >{order?.razorpayOrderId.slice(6)} | {order?.id}</span>
                                            </p>
                                        </td>
                                        <td>
                                            <button
                                                // to={`/orders/${order?.id}`}
                                                onClick={() => {
                                                    navigate(`/orders/${order?.id}`, {state: {order}})
                                                }}
                                                className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={order?.product?.imageUrl} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-bold md:tooltip" data-tip="View order">
                                                        <span>{order?.product?.title}</span>
                                                    </p>
                                                    <p className="text-sm opacity-50">{order?.product?.category}</p>
                                                </div>
                                            </button>
                                        </td>
                                        <td>
                                            <p>₹ {order?.totalAmount}</p>
                                            <p className='text-xs text-gray-500'>Deliviery Fee ₹ 49</p>
                                        </td>
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
            <th>Razorpay ID | Order ID</th>
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
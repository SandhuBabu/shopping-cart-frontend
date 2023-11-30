import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react'
import { useNavigate } from 'react-router-dom'
import {
    getOrderStatusBg,
    copyText,
    orderStatusOptions,
    formatDate
} from '../../utils/utils'
import Toast from '../../components/CommonComponents/Alert/Toast'
import { BreadCrumb, Select } from '../../components'
import { getAllOrdersForAdmin, getOrdersCountByStatus } from '../../services/adminService'


const breadCrumbsOptions = [
    { title: "Dashboard", path: "/" },
    { title: "Orders" }
]


let allOrders = []

const AllOrders = () => {

    const selectRef = useRef();
    const pageNo = useRef(1);
    const navigate = useNavigate();
    const controller = new AbortController();

    const [isLastPage, setIsLastPage] = useState(false);
    const [orders, setOrders] = useState([]);
    const [copy, setCopy] = useState(false);
    const [newOrdersCount, setNewOrdersCount] = useState(0);

    useEffect(() => {
        handleGetOrders();
        handleNewOrdersCount();
        return () => {
            controller.abort();
        }
    }, [])

    const handleNewOrdersCount = useCallback(async () => {
        const data = await getOrdersCountByStatus("placed", controller.signal)
        setNewOrdersCount(data)
    }, [])

    const handleOrderIDCopy = (orderId) => {
        copyText(orderId)
        setCopy(true);
        setTimeout(() => {
            setCopy(false)
        }, 1500)
    }

    const handleGetOrders = async () => {
        // selectRef.current.value = "placed"
        const data = await getAllOrdersForAdmin(pageNo.current, controller.signal);
        allOrders = [...allOrders, ...data.content]
        const newOrders = allOrders.filter(item => {
            if (selectRef.current.value === "all")
                return item
            if (item?.status === selectRef.current.value)
                return item
        })
        setOrders(newOrders)
        setIsLastPage(data.last)
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
                if (order['razorpayOrderId'].slice(6).includes(text)) {
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
                        <span className='font-[500] text-sm text-primary'>{newOrdersCount} new orders found</span>

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

                        <p className='flex w-[16em] justify-end gap-2 mr-6 lg:mr-[3.25em]'>
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
                                    <tr key={k} className='hover'>
                                        <td>{k + 1}</td>
                                        <td className='w-[14em]'>
                                            <p className='tooltip' data-tip="Copy Order ID">
                                                <span
                                                    className='cursor-pointer'
                                                    onClick={() => handleOrderIDCopy(`Razorpay order Id: ${order?.razorpayOrderId}, order Id: ${order?.id}`)}
                                                >{order?.razorpayOrderId.slice(6)} | {order?.id}</span>
                                            </p>
                                        </td>
                                        <td>{formatDate(order?.createdAt)}</td>
                                        <td>
                                            <button
                                                // to={`/orders/${order?.id}`}
                                                onClick={() => {
                                                    navigate(`/orders/${order?.id}`, { state: { order } })
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

                    <p className='flex justify-center my-8'>
                        <button
                            onClick={() => {
                                pageNo.current += 1;
                                handleGetOrders();
                            }}
                            disabled={isLastPage}
                            className='btn btn-primary btn-outline text-[12px] min-h-0 max-h-[3.5em] w-[9em] py-0'
                        >
                            Load More
                        </button>
                    </p>
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
            <th>Created At</th>
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
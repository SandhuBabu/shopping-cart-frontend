import React, { useEffect, useState } from 'react'
import { BreadCrumb, Select } from '../../components'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getOrderStatusBg, orderStatusOptions } from '../../utils/utils'

const breadCrumbsOptions = [
    { title: "Dashboard", path: "/" },
    { title: "Orders", path: '/orders' },
    { title: "Orders Details" },
]


const OrderDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    // let order = location.state?.order;
    const [order, setOrder] = useState(location.state?.order)

    useEffect(() => {
        if (!order) {
            navigate("/orders")
        }
    }, [])

    const hndleStatusChange = ({ target }) => {
        setOrder(prev => ({
            ...prev,
            status: target.value
        }))
    }

    return (
        <>
            {/* <pre>{JSON.stringify(order, undefined, 4)}</pre> */}
            <div className='min-h-screen'>
                <BreadCrumb breadCrumbsOptions={breadCrumbsOptions} />
                <h1 className='indicator text-2xl font-semibold pr-5'>
                    <span>Order Details #{id.slice(6)}</span>
                    <span
                        style={{ background: getOrderStatusBg(order?.status) }}
                        className="indicator-item badge p-[0.85em] cursor-default"
                    >{order?.status}</span>
                </h1>

                <div className='flex items-center gap-2'>
                    <p className='translate-y-4 w-[12em]'>Change Status :</p>
                    <Select
                        name="orderFilter"
                        options={orderStatusOptions}
                        classNames="w-[9em_!important] custom-select"
                        defaultValue={order?.status}
                        onChange={hndleStatusChange}
                        disabled={false}
                    />
                </div>

                <div className='mt-8 flex sm:flex-row flex-col gap-8 bg-base-200 rounded-md p-4'>
                    <img
                        src={order?.product?.imageUrl}
                        className='max-h-[15em] object-contain'
                        alt="ordered-product"
                    // onLoad={()=>console.log("img load complt")}
                    />
                    <div>
                        <h1 className='text-xl font-semibold'>{order?.product?.title}</h1>
                        <p className='flex gap-3 mt-2'>
                            <span className='w-[6em]'>Category</span>
                            <span>{order?.product?.category}</span>
                        </p>
                        <p className='flex gap-3 mt-2'>
                            <span className='w-[6em]'>Quantity</span>
                            <span>{order?.quantity}</span>
                        </p>
                        <p className='flex gap-3 mt-2'>
                            <span className='w-[6em]'>Price</span>
                            <span>₹ {order?.totalAmount}</span>
                            <span>- Delivery Fee ₹ 49</span>
                        </p>

                        <Link
                            to={`/product/${order?.product?.id}`}
                            target='_blank'
                            className='btn-link font-medium my-4 block'
                        >View Product</Link>
                    </div>
                </div>

                <p className='mt-8 text-success flex gap-2 bg-base-200 rounded-md p-4'>
                    <span className='font-medium'>Total Price :</span>
                    <span className='text-lg'>₹ {order?.totalAmount}</span>
                </p>

                <div className='mt-8 bg-base-200 rounded-md p-4'>
                    <h1 className='font-semibold'>Delivery Address</h1>

                    <p className='mt-2 font-medium'>{order?.fullName}</p>
                    <p className='mt-2'>
                        <span>{order.address?.houseName}</span>
                        <span>, {order.address?.locality}</span>
                    </p>
                    <p>
                        <span>{order.address?.district}</span>
                        <span>, {order.address?.state}</span>
                        <span> - {order.address?.zip}</span>
                    </p>
                    <p className='mt-2 flex gap-2'>
                        <span className='font-medium'>Phone Number</span>
                        <span>{order?.mobile}</span>
                    </p>
                    <p className='mt-2 flex gap-2'>
                        <span className='font-medium'>Email Address</span>
                        <span>{order?.email}</span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default OrderDetails
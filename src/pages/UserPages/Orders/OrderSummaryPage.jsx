import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
    copyText,
    formatDate,
    getDateDifference,
    getOrderStatusTextColor
} from '../../../utils/utils'
import Modal from '../../../components/CommonComponents/Modal/Modal'
import { cancelOrder, returnorder } from '../../../services/orderService'
import Alert from '../../../components/CommonComponents/Alert/Alert'


const OrderSummaryPage = () => {

    const [copy, setCopy] = useState({ id: true, payment: true })
    const navigate = useNavigate();
    const location = useLocation();
    const [modalOpen, setModalOpen] = useState(false)
    const [alert, setAlert] = useState({
        text: '',
        type: 'bg-primary'
    })
    const [modal, setModal] = useState({
        actionLabel: '',
        actionText: '',
        actionLabelVariant: ''
    })
    const [order, setOrder] = useState(location?.state?.order)
    const vaildForCancelOrReturn = getDateDifference(order.createdAt) <= 10;

    const closeModal = () => {
        setModalOpen(false)
    }

    useEffect(() => {
        if (!order) {
            navigate("/orders")
        }
    }, [])

    const handleCancel = useCallback(async () => {

        const { message, error } = await cancelOrder(order?.id)

        console.log(message);
        if (error)
            setAlert({ text: message, type: 'bg-error' })
        if (!error) {
            setAlert({ text: message, type: 'bg-primary' })
            setOrder(prev => ({ ...prev, status: "cancelled" }))
        }

    }, [])

    const handleReturn = useCallback(async () => {
        const { message, error } = await returnorder(order?.id)

        if (error)
            setAlert({ text: message, type: 'bg-error' })
        if (!error) {
            setAlert({ text: message, type: 'bg-primary' })
            setOrder(prev => ({ ...prev, status: "returned" }))
        }
    }, [])

    const confirmCancel = useCallback(() => {
        setModalOpen(true)
        setModal({
            actionLabel: 'Yes, Cancel',
            actionLabelVariant: 'btn btn-error',
            action: handleCancel,
            body: <>
                <h1 className='text-xl'>Are you sure to cancel</h1>
                <p className='text-[14px] text-slate-400 my-2'>Delivery fee is not refundable</p>
            </>
        })
    }, [])

    const confirmReturn = useCallback(() => {
        setModalOpen(true)
        setModal({
            actionLabel: 'Yes, Return',
            actionLabelVariant: 'btn btn-warning',
            action: handleReturn,
            body: <h1 className='text-xl'>Are you sure to return?</h1>
        })
    }, [])

    return (
        <>
            {
                modalOpen &&
                <Modal
                    isOpen={modalOpen}
                    cancel={closeModal}
                    action={modal.action}
                    actionLabel={modal?.actionLabel}
                    actionText={modal?.actionText}
                    actionLabelVariant={modal?.actionLabelVariant}
                >
                    {modal.body}
                </Modal>
            }

            {
                alert.text &&
                <Alert
                    text={alert.text}
                    type={alert.type}
                    close={() => setAlert(prev => ({ ...prev, text: '' }))}
                />
            }

            <div className='flex flex-col gap-[5em] px-4 py-5'>
                <div className='flex flex-col sm:flex-row w-[40%] gap-8'>
                    <img
                        src={order?.product?.imageUrl}
                        alt=""
                        className='w-[10em] max-h-[10em] rounded'
                    />
                    <div className=''>
                        <h1 className='text-lg font-bold flex'>
                            <span>{order?.product?.title}</span>
                        </h1>
                        <p className='w-max flex items-center gap-[1em] mt-2'>
                            <span>Order ID:</span>
                            <span>{order?.id} | {order?.razorpayOrderId}</span>
                            {
                                copy.id ?
                                    <button
                                        onClick={() => {
                                            copyText("Order ID: " + order?.id + ", Razorpay Order ID: " + order?.razorpayOrderId)
                                            setCopy({ id: false, payment: true })
                                            setTimeout(() => {
                                                setCopy({ id: true, payment: true })
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
                        <p className='w-max flex gap-[1em] mt-2'>
                            <span>Price:</span>
                            <span>{order?.totalAmount + 49} , Delivery Fee 49 included</span>
                        </p>
                        <p className='w-[10em] flex gap-[1em] mt-2'>
                            <span>Quantity:</span>
                            <span>{order?.quantity}</span>
                        </p>
                        <p className='w-max flex gap-[1em] mt-2'>
                            <span>Payment Id:</span>
                            <span>{order?.paymentId}</span>
                            {
                                copy?.payment ?
                                    <button
                                        onClick={() => {
                                            copyText("Payment ID: " + order?.paymentId)
                                            setCopy({ id: true, payment: false })
                                            setTimeout(() => {
                                                setCopy({ id: true, payment: true })
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
                        <p className='w-max flex gap-[1em] mt-2'>
                            <span>Ordered At:</span>
                            <span>{formatDate(order?.createdAt)}</span>
                        </p>
                        <p className='w-[10em] flex gap-[1em] mt-2'>
                            <span>Status:</span>
                            <span className={`${getOrderStatusTextColor(order?.status)}`}>{order?.status}</span>
                        </p>

                        <p className='flex flex-col'>
                            <Link
                                to={`/product/${order?.product?.id}`}
                                className='btn-link font-medium inline-block mt-6'
                            >
                                View Product
                            </Link>


                        </p>
                    </div>
                </div>

                <div className='w-[30%] mt-[4em]'>
                    <h1 className='text-lg font-bold mb-4'>Delivery Address</h1>
                    <p className='font-medium'>Sandhu Babu</p>
                    <p className='mt-1'>
                        {/* house name */}
                        <span>{order.address?.houseName}</span>
                        {/* locality */}
                        <span className='ml-2'>{order.address?.locality}</span>
                    </p>
                    <p className='flex gap-1 mt-1'>
                        {/* district */}
                        <span>{order.address?.district}</span>

                        {/* state */}
                        <span>{order?.address?.state}</span>

                        {/* zip */}
                        <span>- {order?.address?.zip}</span>
                    </p>
                    <p className=' mt-1'>
                        <span className='font-medium'>Phone Number</span>
                        <span className='ml-4'>8086267521</span>
                    </p>

                </div>

                <div className='flex items-center gap-6'>
                    {
                        order.status !== "cancelled" && order.status !== "returned" && vaildForCancelOrReturn &&
                        <button
                            onClick={confirmCancel}
                            className='btn btn-error btn-outline '
                        >
                            Cancel Order
                        </button>
                    }
                    {
                        order.status == "delivered" && vaildForCancelOrReturn &&
                        <button
                            onClick={confirmReturn}
                            className='btn btn-warning btn-outline '
                        >
                            Return Order
                        </button>
                    }
                    {
                        order?.status === "delivered" &&
                        <button
                            className='btn btn-primary'
                        >
                            Download Invoice
                        </button>
                    }
                </div>
            </div>
        </>
    )
}

export default OrderSummaryPage
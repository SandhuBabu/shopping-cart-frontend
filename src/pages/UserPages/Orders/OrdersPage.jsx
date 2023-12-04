import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Rating } from '../../../components'
import Confetti from 'react-confetti'
import { formatDate, getDateDifference, getOrderStatusTextColor } from '../../../utils/utils'
import { allOrders, rateProduct } from '../../../services/orderService'


const OrdersPage = () => {

    const controller = new AbortController();
    const navigate = useNavigate();

    const [orders, setOrders] = useState([])
    const [showConfetti, setShowConfetti] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const [alert, setAlert] = useState({
        text: "",
        close: () => setAlertOpen(false),
        type: "bg-primary"
    })

    useEffect(() => {
        getAllOrders();

        return () => {
            controller.abort();
        }
    }, [])



    const getAllOrders = useCallback(async () => {
        const data = await allOrders(controller.signal);
        setOrders(data.reverse())
    }, [])

    const navigateToOrder = useCallback((orderId) => {
        // const data = orders.filter(order => order?.id === orderId)
        const data = orders.find(o => o.id===orderId)
        navigate(`/orders/${orderId}`, {
            state: { order: data }
        })
    }, [orders])

    const handleRating = useCallback(async (e, orderId) => {
        const val = Number(e.target.value);
        const { error, message } = await rateProduct(orderId, val);
        setAlertOpen(true)
        if (error) {
            setAlert(prev => ({
                ...prev,
                type: "bg-error",
                text: message
            }))
            return
        }

        setAlert(prev => ({
            ...prev,
            type: "bg-success",
            text: message
        }))

        const updatedOrders = orders.map(order => {
            if (order?.id === orderId) {
                return { ...order, rating: val }
            }
            return order
        })

        setShowConfetti(true)
        setTimeout(() => {
            setAlertOpen(false)
        }, 3000)

        setTimeout(() => {
            setShowConfetti(false)
        }, 5000)
        setOrders(updatedOrders)
    }, [orders])


    return (
        <>

            {
                alertOpen &&
                <Alert
                    text={alert?.text}
                    close={alert.close}
                    type={alert?.type}
                />
            }
            <div className='flex flex-col gap-[3em] md:gap-4 items-center w-full px-[1em] pt-6'>

                <h1 className='text-2xl relative font-medium'>
                    <span>Orders</span>
                    <div className="badge text-[12px] absolute top-[-0.5em] w-[2em] h-[2em] text-center bg-secondary text-black">{orders?.length}</div>
                </h1>

                {
                    orders.map((order, k) => (
                        <div key={k} className='flex flex-col w-full md:w-[50%] md:flex-row justify-between items-center px-6 py-6 shadow-md hover:bg-base-300'>
                            <div
                                to={`/orders/${order?.id}`}
                                onClick={() => navigateToOrder(order?.id)}
                                className='flex-1 flex flex-col cursor-pointer md:flex-row md:items-start items-center'
                            >
                                <img
                                    src={order?.product?.imageUrl}
                                    alt="product"
                                    className='w-[7em] rounded'
                                />
                                <div className='flex flex-1 flex-col items-center mt-2 justify-center'>
                                    <h1>{order?.product?.title}</h1>
                                    <p>₹  {order?.product?.price}</p>
                                </div>
                            </div>
                            <div className='w-[15em]'>
                                <p
                                    // style={{color:getOrderStatusTextColor(order?.status)}}
                                    className={`${getOrderStatusTextColor(order?.status)} text-center`}
                                >{order?.status}</p>
                                {
                                    order?.status === 'delivered' &&
                                    <div className='text-center mt-5'>
                                        <Rating rating={order?.rating??0} orderId={order?.id} handleRating={handleRating} />
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
                    gravity={1}
                    numberOfPieces={1000}
                    height={Math.max(
                        document.body.scrollHeight,
                        document.documentElement.scrollHeight
                    )}
                />
            }
        </>

    )
}

export default OrdersPage
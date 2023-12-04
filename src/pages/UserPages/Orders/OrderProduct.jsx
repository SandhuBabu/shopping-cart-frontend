import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Alert, Count } from '../../../components';
import Confetti from 'react-confetti';
import { createOrder, orderSuccess, paymentFailure } from '../../../services/orderService';
import useRazorpay from 'react-razorpay';


const OrderProduct = () => {
    const location = useLocation();
    const { state } = location
    const user = useSelector(store => store.user)
    const { id } = useParams()
    const navigate = useNavigate();
    useRazorpay();

    const [count, setCount] = useState(1);
    const [error, setError] = useState('');
    const [confetti, setConfetti] = useState(false)

    useEffect(() => {
        if (!state?.address || !state?.product) {
            return navigate(`/product/${id}`)
        }

        // return () => {
        //     if (orderStatus.clicked && !orderStatus.orderId) {

        //     }
        // }
    }, [])

    const handlePaymentSuccess = async (data) => {
        const { error, message } = await orderSuccess(data)
        if (error) {
            setError(message)
            return
        }

        setConfetti(true)
        setTimeout(() => {
            navigate("/orders")
        }, 2500)
    }

    const incrementCount = useCallback(() => {
        setCount(prev => prev === state?.product?.stockAvailable ? 1 : prev + 1)
    }, [])

    const decrementCount = useCallback(() => {
        setCount(prev => prev === 1 ? 1 : prev - 1)
    }, [])

    const handlePayNow = useCallback(async () => {
        const data = {
            addressId: state?.address?.id,
            totalAmount: state?.product?.price * count,
            products: [
                {
                    id: state?.product?.id,
                    quantity: count
                }
            ]
        }

        const { error, order } = await createOrder(data)


        if (error) {
            alert("Failed to create order")
            return
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order?.amount,
            currency: order?.currency,
            order_id: order?.orderId,
            name: "Shopping Cart",
            description: "Test Transaction",
            image: "https://i.pinimg.com/originals/aa/70/8d/aa708d1f97a04f6f5a208213f89e1e67.png",
            handler: function (res) {
                /**
                 * razorpay_order_id is different from order id created at server
                 */
                const data = {
                    razorpayOderId: res?.razorpay_order_id,
                    paymentId: res?.razorpay_payment_id,
                    razorpaySignature: res?.razorpay_signature,
                }
                handlePaymentSuccess(data);
            },
            prefill: {
                name: user?.username,
                email: user?.email,
                contact: user?.mobile
            },
            theme: {
                color: "#4a00ff",
            },
        }

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", async function ({ error }) {
            const data = {
                orderId: error?.metadata.order_id,
                paymentId: error?.metadata?.payment_id,
            }
            await paymentFailure(data)
        });

        rzp1.on("payment.cancel", (res) => console.log("Cancelled"))

        rzp1.open();
    }, [count])

    return (
        <>
            {
                error &&
                <Alert
                    text={error}
                    close={() => setError('')}
                />

            }
            <h1 className='text-2xl'>Order Product</h1>
            <div className='flex flex-col lg:flex-row gap-8 px-4 py-5'>
                <div className='flex flex-col sm:flex-row gap-8'>
                    <img
                        src={state?.product.imageUrl}
                        alt=""
                        className='w-[15em] rounded'
                    />
                    <div>
                        <h1 className='text-lg font-bold flex'>
                            <span>{state?.product?.title}</span>
                        </h1>
                        <p className='w-[25em] flex gap-[1em] mt-2'>
                            <span>Price:</span>
                            <span>Rs {state?.product?.price} /-</span>
                        </p>
                        <p className='w-[25em] flex gap-[1em] mt-2'>
                            <span>Stock Available:</span>
                            <span>{state?.product?.stockAvailable}</span>
                        </p>
                        <p className='w-[25em] flex gap-[1em] mt-2'>
                            <span>Delivery Charge:</span>
                            <span>₹ 49</span>
                        </p>

                        <Count
                            count={count}
                            max={state?.product?.stockAvailable}
                            handleIncrement={incrementCount}
                            handleDecrement={decrementCount}
                        />
                        <h1 className='text-success my-8'>Total Price: &nbsp;  ₹ {count * state?.product?.price + 49}</h1>
                    </div>
                </div>

                <div className='md:w-[30%]'>
                    <h1 className='text-lg font-bold mb-4'>Delivery Address</h1>
                    <p className='font-medium'>{user?.username}</p>
                    <p className='mt-1'>
                        <span>{state?.address?.houseName},</span>
                        <span className='ml-2'>{state?.address?.locality},</span>
                    </p>
                    <p className='flex gap-1 mt-1'>
                        <span>{state?.address?.district},</span>
                        <span>{state?.address?.state}</span>
                        <span>-{state?.address?.zip}</span>
                    </p>
                    <p className=' mt-1'>
                        <span className='font-medium'>Phone Number</span>
                        <span className='ml-4'>{user?.mobile}</span>
                    </p>
                </div>
            </div>

            <button
                onClick={handlePayNow}
                className='my-6 ml-4 btn btn-primary btn-wide'
            >Pay Now</button>

            {
                confetti &&
                <div className='w-[100%] h-screen absolute flex items-center justify-center top-0 left-0'>
                    <Confetti
                        width={window.innerWidth - 20}
                        gravity={0.9}
                        height={window.innerHeight}
                    />
                    <h1 className='text-5xl font-bold text-success'>Order Placed</h1>
                </div>
            }
        </>
    )
}

export default OrderProduct
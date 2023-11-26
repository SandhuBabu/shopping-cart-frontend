import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Count } from '../../../components';
import { createOrder } from '../../../services/orderService';
import useRazorpay from 'react-razorpay';


const OrderProduct = () => {
    const location = useLocation();
    const { state } = location
    const user = useSelector(store => store.user)
    const { id } = useParams()
    const navigate = useNavigate();

    const [count, setCount] = useState(1);
    useRazorpay();

    useEffect(() => {
        if (!state?.address || !state?.product) {
            return navigate(`/product/${id}`)
        }
    }, [])

    const incrementCount = useCallback(() => {
        setCount(prev => prev === state?.product?.stockAvailable ? 1 : prev + 1)
    }, [])

    const decrementCount = useCallback(() => {
        setCount(prev => prev === 1 ? 1 : prev - 1)
    }, [])

    const handlePayNow = useCallback(async () => {
        const data = {
            addressId: state.address?.id,
            productId: state?.product?.id,
            price: state?.product?.price,
            quantity: count
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
            handler: function ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
                /**
                 * razorpay_order_id is different from order id created at server
                 */
                const data = {
                    razorpayOrderId: razorpay_order_id,
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature
                }
                console.log(data);
                navigate("/orders")
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

        rzp1.on("payment.failed", function ({ error }) {
            const data = {
                orderId: error?.metadata.order_id,
                paymentId: error?.metadata?.payment_id
            }
            console.log(data);
        });

        rzp1.on("payment.cancel", (res)=>console.log(res))

        rzp1.open();
    }, [count])

    return (
        <>
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
                        <h1>Total Price: {count * state?.product?.price}</h1>
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
        </>
    )
}

export default OrderProduct
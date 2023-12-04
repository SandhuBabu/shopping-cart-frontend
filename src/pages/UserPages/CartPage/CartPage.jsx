import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useRazorpay from 'react-razorpay';
import { Alert, CartCard, Modal } from '../../../components'
import Confetti from 'react-confetti'
import { updateCartCount } from '../../../features/userSlice';
import { getCartItems, removeAll, removeFromCart } from '../../../services/cartService';
import { createOrder, orderSuccess } from '../../../services/orderService';
import { scrollToTop } from '../../../utils/utils';

const CartPage = () => {

    useRazorpay();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user)
    const controller = new AbortController();

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confetti, setConfetti] = useState(false)
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState({
        action: undefined,
        actionText: "",
        actionLabel: "",
        actionLabelVariant: "",
    })


    const [alertOpen, setAlertOpen] = useState({ text: 'dsdsd', open: false })

    useEffect(() => {
        setLoading(true)
        scrollToTop()
        handleGetCart();

        return () => {
            controller.abort();
            document.querySelector('body').style.overflowY = "auto";
            scrollToTop();
        }
    }, [])

    const closeModal = () => {
        setModalOpen(false)
    }

    const totalAmount = cart.reduce((acc, product) => {
        return product?.price + acc
    }, 0)

    const handleGetCart = async () => {
        const { error, data } = await getCartItems(controller.signal);

        if (!error) {
            setCart(data.reverse());
        }
        setLoading(false)
    }

    const handleRemoveAll = useCallback(async () => {
        const res = await removeAll();
        if (res) {
            setCart([])
            dispatch(updateCartCount({ type: "empty" }))

            setAlertOpen({ text: "Removed all items from cart", open: true })

            setTimeout(() => {
                setAlertOpen({ text: "", open: false })
            }, 3000)
        }
    }, [])

    const removeOneItem = useCallback(async (productId) => {
        const { error, ...data } = await removeFromCart(productId);
        if (!error) {
            let items = cart.filter(i => i.id !== productId)
            setCart(items)
            dispatch(updateCartCount({ type: "decrement" }))
        }
        setAlertOpen({ text: data?.message, open: true })
        setTimeout(() => {
            setAlertOpen({ text: "", open: false })
        }, 3000)
    }, [cart])

    const handleCheckout = useCallback(async () => {
        setModalOpen(true)
        setModalData(prev => ({
            ...prev,
            action: handlePayNow,
            actionText: "Sure to checkout",
            actionLabel: "Yes, Continue",
            actionLabelVariant: "btn btn-primary",
        }))

    }, [cart])

    const handlePayNow = useCallback(async () => {
        const products = cart.map(({ id, stockAvailable }) => {
            if (stockAvailable > 1) {
                return { id, quantity: 1 }
            }
        })

        const data = {
            totalAmount: totalAmount,
            products
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
    }, [cart])

    const handlePaymentSuccess = useCallback(async (data) => {
        const { error, message } = await orderSuccess(data)
        if (error) {
            setError(message)
            return
        }

        setConfetti(true)
        setTimeout(() => {
            handleRemoveAll();
            navigate("/orders")
        }, 2500)
    }, [cart])


    if (loading) {
        return <>Loading...</>
    }

    return (
        cart.length > 0 ?
            <>

                {
                    alertOpen.open &&
                    <Alert
                        text={alertOpen.text}
                        close={() => setAlertOpen({ text: '', open: false })}
                        type="bg-info rounded-xl"
                    />
                }

                <button
                    className='btn btn-error btn-outline btn-wide my-8 ml-8'
                    onClick={() => {
                        setModalOpen(true)
                        setModalData(prev => ({
                            ...prev,
                            action: handleRemoveAll,
                            actionText: "Delete all products from cart?",
                            actionLabel: "Yes, Delete",
                            actionLabelVariant: "btn bg-red-500 hover:bg-red-600 text-white",
                        }))
                    }}
                >
                    Delete Cart
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                </button>

                <div className='flex flex-col-reverse md:flex-row gap-3'>
                    <div className='flex-1 p-[1em] min-h-[100vh]'>
                        {
                            cart.map((item, k) => (
                                <CartCard
                                    key={k}
                                    product={item}
                                    remove={removeOneItem}
                                />
                            ))
                        }


                        {/* <div> */}
                        <button
                            className='btn btn-primary btn-wide float-right mt-8 mr-3'
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                        {/* </div> */}
                    </div>

                    <div className='md:sticky shadow-md rounded-md p-[2em] top-[7em] right-0 w-full md:w-[25em] h-[35vh]'>
                        <h1 className='font-medium uppercase'>Price Details</h1>

                        <p className='flex mt-5 justify-between '>
                            <span>Price ({cart.length} items)</span>
                            <span>₹ {totalAmount}</span>
                        </p>

                        <p className='flex mt-5 justify-between '>
                            <span>Delivery Charge</span>
                            <span>₹ 49</span>
                        </p>

                        <p className='flex mt-5 justify-between '>
                            <span>Total Amount</span>
                            <span className='text-success text-lg'>₹ {totalAmount + 49}</span>
                        </p>
                    </div>
                </div>


                {
                    modalOpen &&
                    <Modal
                        isOpen={modalOpen}
                        cancel={closeModal}
                        action={modalData.action}
                        actionText={modalData.actionText}
                        actionLabel={modalData.actionLabel}
                        actionLabelVariant={modalData.actionLabelVariant}
                    />
                }

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
            :
            <div className='grid place-items-center h-[80vh]'>
                <div>
                    <h1
                        className='text-3xl font-medium text-center'
                    >Cart Is Empty</h1>
                    <Link
                        to='/'
                        className='btn btn-primary btn-wide my-5 rounded-full'
                    >Go Home</Link>
                </div>
            </div>
    )
}

export default CartPage
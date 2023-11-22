import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, CartCard, Modal } from '../../../components'
import { scrollToTop } from '../../../utils/utils';
import { checout, getCartItems, removeAll, removeFromCart } from '../../../services/cartService';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCartCount } from '../../../features/userSlice';


const CartPage = () => {

    const controller = new AbortController();
    const dispatch = useDispatch();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false)
    const [alertOpen, setAlertOpen] = useState({ text: 'dsdsd', open: false })

    useEffect(() => {
        setLoading(true)
        scrollToTop()
        handleGetCart();

        return () => {
            controller.abort();
            scrollToTop();
        }
    }, [])

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
        const res = await checout(controller.signal);
    }, [])

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
                    onClick={() => setModalOpen(true)}
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
                        cancel={() => setModalOpen(false)}
                        action={handleRemoveAll}
                        actionText="Delete all products from cart?"
                        actionLabel="Yes, Delete"
                        actionLabelVariant="btn bg-red-500 hover:bg-red-600 text-white"
                    />
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
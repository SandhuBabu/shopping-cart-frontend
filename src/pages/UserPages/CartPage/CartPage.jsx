import React, { useEffect, useMemo, useState } from 'react'
import { CartCard } from '../../../components'
import { scrollToTop } from '../../../utils/utils';
import { getCartItems, removeAll } from '../../../services/cartService';
import { Link } from 'react-router-dom';


const CartPage = () => {

    const controller = new AbortController();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

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
            setCart(data);
        }
        setLoading(false)
    }

    const handleRemoveAll = async () => {
        const res = await removeAll();
        if (res) {
            setCart([])
        }
    }

    if(loading){
        return <>Loading...</>
    }

    return (
        cart.length > 0 ?
            <>
                <button
                    className='btn btn-wide my-8'
                    onClick={handleRemoveAll}
                >Delete Cart</button>

                <div className='flex flex-col md:flex-row gap-3'>
                    <div className='flex-1 p-[1em] min-h-[100vh]'>
                        {
                            cart.map((item, k) => (
                                <CartCard product={item} key={k} />
                            ))
                        }


                        {/* <div> */}
                        <button
                            className='btn btn-primary btn-wide float-right mt-8 mr-3'
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
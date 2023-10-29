import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

const ProductPageImage = () => {

    const user = useSelector(store => store.user)

    useEffect(() => {
        console.log("Product image mount");

        return () => console.log("Product image unmount");
    }, [])

    const handleBuy = useCallback(() => {
        console.log("CLICKED_BUY");
        if (!user?.id) {
            console.log(user);
            document.getElementById("login_modal")
            return
        }
        console.log("CLICKED_BUY_END");
    }, [user])

    const handleAddCart = useCallback(() => {
        console.log("CLICKED_CART");
        if (!user?.id) {
            document.getElementById("login_modal")
            return
        }
        console.log("CLICKED_CART_END");
    }, [user])

    return (
        <div className='flex bg-neutral-300 select-none flex-col items-center my-7 justify-center relative md:sticky top-[5em]  md:w-[50%] lg:w-40% max-h-[80vh] py-4 rounded-xl'>
            <img
                loading='lazy'
                draggable={false}
                className='max-h-[30em] max-w-[80%] mix-blend-multiply'
            src='https://m.media-amazon.com/images/I/71NrUXG01QL._AC_UF1000,1000_QL80_.jpg'
            />
            <div className='flex gap-3 mt-5 w-[80%]'>
                <button onClick={handleAddCart} className='btn flex-1 btn-outline btn-primary z-[1]'>Add To Cart</button>
                <button onClick={handleBuy} className='btn flex-1 btn-primary z-[1]'>Buy Now</button>
            </div>
        </div>
    )
}

export default React.memo(ProductPageImage)
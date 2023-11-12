import React, { useCallback, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useSelector } from 'react-redux'

const ProductPageImage = ({ src }) => {

    const [imageLoad, setImageLoad] = useState(false)
    const user = useSelector(store => store.user)

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
        // <div className='flex bg-neutral-300 select-none flex-col items-center my-7 justify-center relative md:sticky top-[6em]  md:w-[50%] lg:w-40% max-h-[80vh] py-4 rounded-xl'>
        <div className='flex  select-none flex-col items-center my-7 justify-center relative md:sticky top-[6em]  md:w-[50%] lg:w-40% max-h-[80vh] py-4 rounded-xl'>
            <img
                loading='lazy'
                onLoad={() => setImageLoad(true)}
                draggable={false}
                className={`max-h-[30em] ${imageLoad?'opacity-[1]':'opacity-0 h-0'} max-w-[80%] mix-blend-multiply`}
                src={src}
            />

            {!imageLoad && <Skeleton width='30em' height='30em' />}

            {
                user?.role !== "ADMIN" && imageLoad &&
                <div className='flex gap-3 mt-5 w-[80%]'>
                    <button onClick={handleAddCart} className='btn flex-1 btn-outline btn-primary z-[1]'>Add To Cart</button>
                    <button onClick={handleBuy} className='btn flex-1 btn-primary z-[1]'>Buy Now</button>
                </div>
            }
        </div>
    )
}

export default React.memo(ProductPageImage)
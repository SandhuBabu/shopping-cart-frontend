import React from 'react'
import { Link } from 'react-router-dom'

const CartCard = ({ product }) => {
    return (
        <div className='flex gap-4 p-[1em] shadow-sm hover:shadow-md mt-2'>
            <img
                className='h-[10em] w-[10em] object-cover rounded-md'
                src={product?.imageUrl}
                alt="product-image"
            />
            <div className='flex-1'>
                <Link to={`/product/${product.id}`}>
                    <div className="md:tooltip" data-tip="Go to product page">
                        <h1 className='text-xl font-medium uppercase'>{product?.title}</h1>
                    </div>
                </Link>
                <p className='mt-2'>₹ {product?.price}</p>
                <p className='mt-2'>{product?.stockAvailable}</p>


                <button
                    className='btn  mt-4 w-[9em]'
                >Remove</button>
            </div>
        </div>
    )
}

export default React.memo(CartCard)
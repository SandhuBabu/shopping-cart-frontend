import React from 'react'
import { Link } from 'react-router-dom'

const CartCard = ({ product, remove }) => {
    return (
        <div className='flex gap-4 p-[1em] shadow-sm hover:shadow-md hover:bg-base-200 mt-4'>
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
                <p className='mt-2'>{product?.stockAvailable} Stocks left</p>


                <button
                    className='btn  mt-4 w-[9em]'
                    onClick={()=>remove(product?.id)}
                >Remove</button>
            </div>
        </div>
    )
}

export default React.memo(CartCard)
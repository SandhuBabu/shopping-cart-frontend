import React from 'react'
import { Link } from 'react-router-dom'

const ItemCard = ({ item, width }) => {
    return (
        <Link to={`product/${item?.id}`}>
            <div className={`card w-[${width}] h-[25em] bg-base-100 hover:shadow-xl p-3`}>
                <figure className='rounded-lg'>
                    <img src={item?.imageUrl} alt="Shoes" className='w-full object-cover' />
                </figure>
                <div className="card-body h-auto px-3 py-5">
                    <h2 className="text-xl overflow-hidden text-ellipsis whitespace-nowrap">
                        {item?.title}
                    </h2>
                    <p className='text-lg'>₹ <span className='font-bold'>{item.price}</span></p>
                </div>
            </div>
        </Link>

    )
}

export default React.memo(ItemCard)
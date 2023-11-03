import React from 'react'
import { Link } from 'react-router-dom'

const ItemCard = () => {
    return (
        <Link to="/product/1">
            <div className="card w-full bg-base-100 hover:bg-base-300 hover:shadow-xl p-3">
                <figure style={{ borderRadius: '.5em' }}>
                    <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-center">
                        Lorem, ipsum dolor
                    </h2>
                    <p>₹ 877</p>
                </div>
            </div>
        </Link>

    )
}

export default ItemCard
import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Stats = ({
    newOrdersCount,
    outOfStock,
    todaysEarning,
    totalEarnings
}) => {

    const navigate = useNavigate();
    const today = new Date().toDateString();

    const navigateToOutOfStock = useCallback(() => {
        if (outOfStock.length === 0) return
        
        navigate('/products/outofstock', {
            state: { products: outOfStock }
        })
    }, [
        newOrdersCount,
        outOfStock,
        todaysEarning,
        totalEarnings
    ])

    return (
        <div className="stats gap-2 w-full text-white stats-vertical md:stats-horizontal shadow">
            <div className="flex items-center gap-6 stat md:w-[100%%] bg-green-500 rounded-2xl">
                <span className="text-3xl lg:text-6xl material-symbols-outlined">
                    deployed_code_alert
                </span>
                <div>
                    <div className="stat-title text-white font-medium text-xl">New Orders</div>
                    <div className="stat-value">{newOrdersCount}</div>
                    <div className="stat-desc text-white">Till {today}</div>
                </div>
            </div>

            <div
                onClick={navigateToOutOfStock}
                className="flex cursor-pointer items-center stat md:w-[100%%] bg-orange-400 rounded-2xl"
            >
                <span className="text-3xl lg:text-6xl material-symbols-outlined">
                    warning
                </span>
                <div>
                    <div className="stat-title text-white font-medium text-xl">Out Of Stock</div>
                    <div className="stat-value tooltip w-full" data-tip="View Products">{outOfStock?.length}</div>
                    <div className="stat-desc text-white">Update products quickly</div>
                </div>
            </div>

            <div className="flex items-center stat md:w-[100%%] bg-secondary rounded-2xl">
                <span className="text-3xl lg:text-6xl material-symbols-outlined">
                    price_check
                </span>
                <div>
                    <div className="stat-title text-white font-medium text-xl">Today's Earnings</div>
                    <div className="stat-value">{todaysEarning}</div>
                    <div className="stat-desc text-white">{today}</div>
                </div>
            </div>

            <div className="flex items-center stat md:w-[100%%] bg-blue-400 rounded-2xl">
                <span className="text-3xl lg:text-6xl material-symbols-outlined">
                    trending_up
                </span>
                <div>
                    <div className="stat-title text-white font-medium text-xl">Total Earnings</div>
                    <div className="stat-value">{totalEarnings}</div>
                    <div className="stat-desc text-white">Till {today}</div>
                </div>
            </div>

        </div>
    )
}

export default React.memo(Stats)
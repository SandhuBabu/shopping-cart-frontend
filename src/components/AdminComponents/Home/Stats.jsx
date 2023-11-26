import React from 'react'
import { Link } from 'react-router-dom'

const Stats = () => {
    return (
        <div className="stats gap-2 w-full text-white stats-vertical md:stats-horizontal shadow">
            <div className="flex items-center gap-6 stat md:w-[100%%] bg-green-500 rounded-2xl">
                <span className="text-3xl lg:text-6xl material-symbols-outlined">
                    deployed_code_alert
                </span>
                <div>
                    <div className="stat-title text-white font-medium text-xl">Today's Orders</div>
                    <div className="stat-value">300+</div>
                    <div className="stat-desc text-white">Jan 21, 2023</div>
                </div>
            </div>

            <Link
                to='/products/outofstock'
                className="flex items-center stat md:w-[100%%] bg-amber-500 rounded-2xl"
            >
                <span className="text-3xl lg:text-6xl material-symbols-outlined">
                    warning
                </span>
                <div>
                    <div className="stat-title text-white font-medium text-xl">Stockout </div>
                    <div className="stat-value">40</div>
                    <div className="stat-desc text-white">30+ products has less stocks</div>
                </div>
            </Link>

            <div className="flex items-center stat md:w-[100%%] bg-secondary rounded-2xl">
                <span className="text-3xl lg:text-6xl material-symbols-outlined">
                    price_check
                </span>
                <div>
                    <div className="stat-title text-white font-medium text-xl">Today's Earnings</div>
                    <div className="stat-value">400+</div>
                    <div className="stat-desc text-white">Jan 21, 2023</div>
                </div>
            </div>

            <div className="flex items-center stat md:w-[100%%] bg-error rounded-2xl">
                <span className="text-3xl lg:text-6xl material-symbols-outlined">
                    trending_up
                </span>
                <div>
                    <div className="stat-title text-white font-medium text-xl">Total Earnings</div>
                    <div className="stat-value">4000+</div>
                    <div className="stat-desc text-white">Jan 2023</div>
                </div>
            </div>

        </div>
    )
}

export default React.memo(Stats)
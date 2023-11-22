import React from 'react'

const Stats = () => {
    return (
        <div className="stats gap-6 w-full text-white stats-vertical md:stats-horizontal shadow">
            <div className="flex items-center gap-6 stat min-w-[13em] bg-green-500 rounded-2xl">
                <span class="text-6xl material-symbols-outlined">
                    deployed_code_alert
                </span>
                <div>
                    <div className="stat-title text-white font-medium text-xl">Today's Orders</div>
                    <div className="stat-value">300+</div>
                    <div className="stat-desc text-white">Jan 21 2023</div>
                </div>
            </div>

            <div className="flex items-center stat min-w-[13em] bg-amber-500 rounded-2xl">
                <span class="text-6xl material-symbols-outlined">
                    warning
                </span>
                <div>
                    <div className="stat-title text-white font-medium text-xl">Stockout </div>
                    <div className="stat-value">40</div>
                    <div className="stat-desc text-white">30+ products has less stocks</div>
                </div>
            </div>

            <div className="flex items-center stat min-w-[13em] bg-secondary rounded-2xl">
                <span class="text-6xl material-symbols-outlined">
                    price_check
                </span>
                <div>
                    <div className="stat-title text-white font-medium text-xl">Earnings</div>
                    <div className="stat-value">4000</div>
                    <div className="stat-desc text-white">Jan 2023</div>
                </div>
            </div>

        </div>
    )
}

export default Stats
import React, { useEffect, useState } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'


const data = [
    {
        name: "Jan",
        amount: 10400,
    },
    {
        name: "Feb",
        amount: 8398,
    },
    {
        name: "Mar",
        amount: 12800,
    },
    {
        name: "Apr",
        amount: 3908,
    },
    {
        name: "May",
        amount: 6800,
    },
    {
        name: "Jun",
        amount: 9800,
    },
    {
        name: "Jul",
        amount: 9000,
    },
    {
        name: "Aug",
        amount: 12000,
    },
    {
        name: "Sep",
        amount: 9300,
    },
    {
        name: "Oct",
        amount: 8300,
    },
    {
        name: "Nov",
        amount: 2300,
    },
    {
        name: "Dec",
        amount: 10000,
    },
];

const getIntroOfPage = (label) => {
    if (label === "Page A") {
        return "Page A is about men's clothing";
    }
    if (label === "Page B") {
        return "Page B is about women's dress";
    }
    if (label === "Page C") {
        return "Page C is about women's bag";
    }
    if (label === "Page D") {
        return "Page D is about household goods";
    }
    if (label === "Page E") {
        return "Page E is about food";
    }
    if (label === "Page F") {
        return "Page F is about baby food";
    }
    return "";
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-base-300 shadow-md rounded text-sm">
                <p className="label">{`${label} : ${payload[0].value}`}</p>
                {/* <p className="intro">{getIntroOfPage(label)}</p> */}
            </div>
        );
    }

    return null;
};

const Chart = () => {

    return (
        <BarChart
            width={450}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            barSize={15}
        >
            <XAxis dataKey="name" scale="auto" padding={{ left: 10, right: 10 }} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <Bar dataKey="amount" fill="#9784d2" background={{ fill: 'transparent' }} />
        </BarChart>
    )
}

export default React.memo(Chart)
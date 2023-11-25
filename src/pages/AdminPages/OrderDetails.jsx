import React from 'react'
import { BreadCrumb, Select } from '../../components'
import { useParams } from 'react-router-dom'
import { getOrderStatusBg, orderStatusOptions } from '../../utils/utils'

const breadCrumbsOptions = [
    { title: "Dashboard", path: "/" },
    { title: "Orders", path: '/orders' },
    { title: "Orders Details" },
]


const OrderDetails = () => {

    const { id } = useParams();

    const hndleStatusChange = ({ target }) => {

    }

    return (
        <>
            <div className='min-h-screen'>
                <BreadCrumb breadCrumbsOptions={breadCrumbsOptions} />
                <h1 className='indicator text-2xl font-semibold pr-5'>
                    <span>Order Details #{id.slice(6)}</span>
                    <span
                        style={{ background: getOrderStatusBg("placed") }}
                        className="indicator-item badge p-[0.85em] cursor-default"
                    >placed</span>
                </h1>

                <div className='flex items-center gap-2'>
                    <p className='translate-y-4 w-[12em]'>Change Status :</p>
                    <Select
                        name="orderFilter"
                        options={orderStatusOptions}
                        classNames="w-[9em_!important] custom-select"
                        defaultValue="placed"
                        onChange={hndleStatusChange}
                        disabled={false}
                    />
                </div>

                <div className='mt-8 flex sm:flex-row flex-col gap-8 bg-base-200 rounded-md p-4'>
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/009/664/904/original/3d-render-sport-shoes-illustration-png.png"
                        className='max-h-[15em] object-contain'
                        alt="ordered-product"
                        onLoad={()=>console.log("img load complt")}
                    />
                    <div>
                        <h1 className='text-xl font-semibold'>Men's Shoes</h1>
                        <p className='flex gap-3 mt-2'>
                            <span className='w-[6em]'>Category</span>
                            <span>Footwear</span>
                        </p>
                        <p className='flex gap-3 mt-2'>
                            <span className='w-[6em]'>Quantity</span>
                            <span>1</span>
                        </p>
                        <p className='flex gap-3 mt-2'>
                            <span className='w-[6em]'>Price</span>
                            <span>₹ 1590</span>
                        </p>
                        <p className='flex gap-3 mt-2'>
                            <span className='w-[6em]'>Availability</span>
                            <span>50+</span>
                        </p>
                    </div>
                </div>

                <p className='mt-8 text-success flex gap-2 bg-base-200 rounded-md p-4'>
                    <span className='font-medium'>Total Price :</span>
                    <span className='text-lg'>₹1590</span>
                </p>

                <div className='mt-8 bg-base-200 rounded-md p-4'>
                    <h1 className='font-semibold'>Delivery Address</h1>

                    <p className='mt-2 font-medium'>Sandhu Babu</p>
                    <p className='mt-2'>
                        <span>Vettikavumkal (H)</span>
                        <span>, Pulickalkavala P.O, Vazhoor</span>
                    </p>
                    <p>
                        <span>Kottayam</span>
                        <span>, Kerala</span>
                        <span> - 686515</span>
                    </p>
                    <p className='mt-2 flex gap-2'>
                        <span className='font-medium'>Phone Number</span>
                        <span>8086267521</span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default OrderDetails
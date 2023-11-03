import React from 'react'
import { useSelector } from 'react-redux'
import { ProductPageImage } from '../../components'
import { Button } from '../../components/CommonComponents'
import { Link } from 'react-router-dom'

const ProductPage = () => {

    const user = useSelector(store => store.user)

    return (
        <section className='flex md:flex-row flex-col px-4'>

            <ProductPageImage />

            <div className="divider lg:divider-horizontal sm:opacity-0"></div>

            <div className='md:w-[50%] lg:w-[60%] text-justify py-[3em]'>
                <h1 className='text-3xl mb-3 font-semibold flex items-center'>
                    Smart Watch 239 Blue
                </h1>

                {
                    user?.role === "ADMIN" &&
                    <Link
                    to='/product/212/edit'
                        className='my-2 flex w-[6em] font-semibold text-red-500 bg-transparent hover:bg-[#ed7b7b5a] px-6 py-2 rounded-full  ease-linear duration-200 opacity-90'
                    >
                        <span>Edit</span>
                        <span className="font-normal material-symbols-outlined text-[20px] ml-2">edit</span>
                    </Link>
                }

                <p className='flex items-center gap-2 leading-10'>
                    <span className="material-symbols-outlined">category</span>
                    <span>Category : &nbsp;</span>
                    <span>Watches</span>
                </p>
                <p className='flex items-center gap-2 leading-10'>
                    <span className="material-symbols-outlined">person</span>
                    <span>Gender : &nbsp;</span>
                    <span>Unisex</span>
                </p>
                <p className='flex items-center gap-2 leading-10'>
                    <span className="material-symbols-outlined">currency_rupee</span>
                    <span>Price : &nbsp;</span>
                    <span>4000.00</span>
                </p>
                <p className='flex items-center gap-2 text-red-400 leading-10'>
                    <span className="material-symbols-outlined">production_quantity_limits</span>
                    <span>In Stock : &nbsp;</span>
                    <span>40</span>
                </p>
                <p className='flex items-center gap-2 leading-10'>
                    <span className="material-symbols-outlined">keyboard_return</span>
                    <span>Return Policy : &nbsp;</span>
                    <span>3 Days</span>
                </p>
                <p className='flex items-center gap-2 leading-10'>
                    <span className="material-symbols-outlined">local_shipping</span>
                    <span>Delivery Time : &nbsp;</span>
                    <span>5-7 Days</span>
                </p>

                <p className='mt-7'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe facilis accusantium beatae tenetur dolorum molestiae fugiat corporis eveniet porro at quae dicta, asperiores, aperiam eum eos vel illo dolores architecto tempore, voluptatibus sapiente? Consectetur quasi accusantium, nostrum officia error fugiat nemo saepe dolor porro tenetur quibusdam in exercitationem veniam pariatur ducimus suscipit, at ipsum dolores. Veritatis odit nostrum dignissimos error aliquid recusandae, natus laboriosam? Delectus voluptas unde minima iure nulla cupiditate nostrum eius expedita dicta repellendus repudiandae blanditiis qui ad earum reprehenderit vitae esse, consequatur maiores debitis, et quibusdam quis! Laborum reprehenderit eveniet reiciendis quidem quibusdam eligendi beatae doloremque aliquid.</p>
            </div>
        </section>
    )
}

export default ProductPage
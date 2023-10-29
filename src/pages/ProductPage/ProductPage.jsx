import React, { Suspense } from 'react'
import { ProductPageImage } from '../../components'

const ProductPage = () => {
    return (
           <Suspense fallback={<>loading...product page</>}>
             <section className='flex md:flex-row flex-col px-4'>
                <ProductPageImage />
                
                <div className="divider lg:divider-horizontal sm:opacity-0"></div>

                <div className='md:w-[50%] lg:w-[60%] text-justify py-[3em]'>
                    <h1 className='text-3xl mb-3 font-semibold'>Smart Watch 239 Blue</h1>

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
           </Suspense>
    )
}

export default ProductPage
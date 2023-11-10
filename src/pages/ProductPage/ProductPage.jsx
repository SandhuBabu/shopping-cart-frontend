import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BreadCrumb, ProductPageImage } from '../../components'
import { scrollToTop } from '../../utils/utils'
import { getProductById } from '../../services/productService'
import { NotFound404 } from '..'

const breadCrumbsOptions = [
    { title: "Dashboard", path: "/" },
    { title: "Products", path: '/products' },
    { title: "Product" }
]

const ProductPage = () => {

    const { id } = useParams();
    const user = useSelector(store => store.user)
    const navigate = useNavigate();
    const controller = new AbortController();
    const signal = controller.signal;

    const [product, setProduct] = useState({});
    const [error, setError] = useState(false)


    useEffect(() => {
        handleGetProductData();
        scrollToTop()
        if (user?.role === "ADMIN")
            document.getElementById('Products').classList.add('active')
        return () => {
            if (user?.role === "ADMIN")
                document.getElementById('Products').classList.remove('active')
            scrollToTop()
            controller.abort();
        }

    }, [])

    const handleGetProductData = async () => {
        const { error, ...data } = await getProductById(id, signal);
        if (error) {
            setError(true)
            return
        }
        setProduct(data);
    }


    if(error) {
        return <NotFound404 />
    }

    return (
        <>
            {
                user?.role === "ADMIN" &&
                <BreadCrumb breadCrumbsOptions={breadCrumbsOptions} />
            }

            <section className='flex md:flex-row min-h-screen flex-col px-4'>

                <ProductPageImage src={product?.imageUrl} />

                <div className="divider lg:divider-horizontal sm:opacity-0"></div>

                <div className='md:w-[50%] lg:w-[60%] text-justify py-[3em]'>
                    <h1 className='text-3xl mb-3 font-semibold flex items-center'>
                        {product?.title}
                    </h1>


                    <p className='flex items-center gap-2 leading-10'>
                        <span className="material-symbols-outlined">category</span>
                        <span>Category : &nbsp;</span>
                        <span>{product?.category}</span>
                    </p>
                    <p className='flex items-center gap-2 leading-10'>
                        <span className="material-symbols-outlined">person</span>
                        <span>Gender : &nbsp;</span>
                        <span>{product?.gender}</span>
                    </p>
                    <p className='flex items-center gap-2 leading-10'>
                        <span className="material-symbols-outlined">currency_rupee</span>
                        <span>Price : &nbsp;</span>
                        <span>{product?.price}</span>
                    </p>
                    <p className='flex items-center gap-2 text-red-400 leading-10'>
                        <span className="material-symbols-outlined">production_quantity_limits</span>
                        <span>In Stock : &nbsp;</span>
                        <span>{product?.stockAvailable}</span>
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

                    <p className='mt-7'>{product?.description}</p>
                    
                    <p className='mt-7'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe facilis accusantium beatae tenetur dolorum molestiae fugiat corporis eveniet porro at quae dicta, asperiores, aperiam eum eos vel illo dolores architecto tempore, voluptatibus sapiente? Consectetur quasi accusantium, nostrum officia error fugiat nemo saepe dolor porro tenetur quibusdam in exercitationem veniam pariatur ducimus suscipit, at ipsum dolores. Veritatis odit nostrum dignissimos error aliquid recusandae, natus laboriosam? Delectus voluptas unde minima iure nulla cupiditate nostrum eius expedita dicta repellendus repudiandae blanditiis qui ad earum reprehenderit vitae esse, consequatur maiores debitis, et quibusdam quis! Laborum reprehenderit eveniet reiciendis quidem quibusdam eligendi beatae doloremque aliquid.</p>
                </div>
            </section>
        </>
    )
}

export default ProductPage
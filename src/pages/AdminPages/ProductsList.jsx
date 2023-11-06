import React, { useCallback, useEffect, useState } from 'react'
import { getAllProductsPaginated } from '../../services/productService'
import { Pagination, ProductsTable } from '../../components'
import { setAdminTitle } from '../../utils/utils'

const heading = [
    "ID",
    "Image",
    "Title",
    "Category",
    "Price (Rs)",
    "Stock Available",
]

let page = 1

const ProductsList = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [pageMetaData, setPageMetaData] = useState({});

    setAdminTitle("Admin All Products")

    useEffect(() => {
        console.log("mount prd list");
        handleGetProduct();
    }, [])

    const handleGetProduct = useCallback(async () => {
        const { error, data, ...rest } = await getAllProductsPaginated(page);
        if (error) {
            setError(error)
            return
        }
        setPageMetaData(rest)

        const filterProducts = data.map(item => {
            return {
                id: item.id,
                imageUrl: item.imageUrl,
                title: item.title,
                category: item.category,
                price: item.price,
                stockAvailable: item.stockAvailable
            }
        })

        setProducts(filterProducts)
    }, [products])

    const handleNext = useCallback(() => {
        page = page + 1
        handleGetProduct();
    }, [])

    const handlePrev = useCallback(() => {
        page = page - 1
        handleGetProduct();
    }, [])

    const handleDelete = useCallback((id) => {
        const newProducts = products.filter(item => item.id !== id);
        setProducts(newProducts)
    }, [products])
    
    return (
        <>
            <section className='w-[100%] min-h-[70vh] flex justify-center p-3 rounded-lg'>
                {!error && <ProductsTable heading={heading} body={products} handleDelete={handleDelete} />}
            </section>
            <Pagination details={pageMetaData} handlePrev={handlePrev} handleNext={handleNext} />

        </>
    )
}

export default ProductsList
import React, { useCallback, useEffect, useState } from 'react'
import { getAllProductsPaginated } from '../../services/productService'
import { Alert, BreadCrumb, Modal, Pagination, ProductsTable, Select } from '../../components'
import { setAdminTitle } from '../../utils/utils'
import { deleteProductById } from '../../services/adminService'

const heading = [
    "Image",
    "Title",
    "Category",
    "Price (Rs)",
    "Stock Available",
]

const breadCrumbsOptions = [
    { title: "Dashboard", path: "/" },
    { title: "All Products" }
]

let deleteData = {
    active: false,
    id: -1
}

let page = 1;

const ProductsList = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ message: '', type: '' });
    const [modalOpen, setModalOpen] = useState(false);
    const [pageMetaData, setPageMetaData] = useState({});

    const controller = new AbortController();
    const signal = controller.signal;
    setAdminTitle("Admin All Products")

    useEffect(() => {
        handleGetProduct();

        return () => controller.abort()
    }, [])

    const handleGetProduct = useCallback(async () => {
        const { error, data, ...rest } = await getAllProductsPaginated(page, true, signal);
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

    const handleFirstOrLastPageClick = useCallback(async (pageNo) => {
        const { error, data, ...rest } = await getAllProductsPaginated(pageNo, true, signal);
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
        deleteData = { active: true, id: id }
        if (id < 1) return
        setModalOpen(true)
    }, [products])

    const confirmDelete = useCallback(async () => {
        const { id } = deleteData
        setModalOpen(false)

        const { error, message } = await deleteProductById(id);

        console.log(message);

        if (error) {
            setAlertMessage({ type: 'bg-red-400', message })
        } else {
            setAlertMessage({ type: 'bg-green-300', message })
        }

        const newProducts = products.filter(item => item.id !== id);

        setProducts(newProducts)
        deleteData = { active: false, id: -1 }

    }, [products])

    const closeAlert = () => {
        setError(false);
        setAlertMessage('');
    }
    return (
        <>
            {
                alertMessage.message &&
                <Alert
                    text={alertMessage.message}
                    close={closeAlert}
                    type={alertMessage.type}
                />
            }

            <BreadCrumb breadCrumbsOptions={breadCrumbsOptions} />


            <section className='w-[100%] min-h-[70vh] flex justify-center p-3 rounded-lg'>
                {
                    !error &&
                    <ProductsTable
                        heading={heading}
                        body={products}
                        handleDelete={handleDelete}
                        currentPage={pageMetaData?.pageNo}
                        totalPages={pageMetaData?.totalPages}
                    />
                }
            </section>
            <Pagination
                details={pageMetaData}
                handlePrev={handlePrev}
                handleNext={handleNext}
                handleFirstOrLastPageClick={handleFirstOrLastPageClick}
            />

            <Modal
                isOpen={modalOpen}
                cancel={() => setModalOpen(false)}
                actionText="Are you sure to delete"
                actionLabel="Yes, Delete"
                action={confirmDelete}
                actionLabelVariant="text-red-400"
            />
        </>
    )
}

export default ProductsList
import React, { useCallback, useEffect, useState } from 'react'
import { getAllProductsPaginated } from '../../services/productService'
import { Alert, BreadCrumb, Modal, Pagination, ProductsTable } from '../../components'
import { setAdminTitle } from '../../utils/utils'
import { deleteProductById } from '../../services/adminService'
import { Link, useNavigate } from 'react-router-dom'
import { scrollToTop } from '../../utils/utils'

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


let page = 1;

const ProductsList = () => {

    const [products, setProducts] = useState([]);
    const [alertMessage, setAlertMessage] = useState({ message: '', type: '' });
    const [modalOpen, setModalOpen] = useState(false);
    const [pageMetaData, setPageMetaData] = useState({});
    const [modalData, setModalData] = useState({
        isOpen: false,
        actionText: "",
        actionLabel: "",
        action: null,
        actionLabelVariant: ""
    })

    const controller = new AbortController();
    const signal = controller.signal;
    const navigate = useNavigate();
    setAdminTitle("Admin All Products")

    useEffect(() => {
        handleGetProduct();

        return () => controller.abort()
    }, [])

    const handleGetProduct = useCallback(async () => {
        scrollToTop();
        const { error, data, ...rest } = await getAllProductsPaginated(page, true, signal);
        if (error) {
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
        page = pageNo;
        handleGetProduct();
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
        setModalData({
            actionText: "Are you sure to delete",
            actionLabel: "Yes, Delete",
            action: () => confirmDelete(id),
            actionLabelVariant: "text-red-400"
        })

        if (id < 1) return
        setModalOpen(true)
    }, [products])

    const handleEdit = useCallback((id) => {
        console.log(id);
        setModalOpen(true)
        setModalData({
            actionText: "Are you sure to edit",
            actionLabel: "Yes, Edit",
            action: () => {
                setModalOpen(false)
                setTimeout(() => {
                    navigate(`/products/edit/${id}`)
                }, [1])
            },
            actionLabelVariant: "text-primary"
        })
    }, [])

    const confirmDelete = useCallback(async (id) => {
        setModalOpen(false)
        setModalData({
            actionText: "",
            actionLabel: "",
            action: null,
            actionLabelVariant: ""
        })

        const { error, message } = await deleteProductById(id);

        if (error) {
            setAlertMessage({ type: 'bg-red-400', message })
        } else {
            setAlertMessage({ type: 'bg-green-300', message })
        }

        const newProducts = products.filter(item => item.id !== id);

        setProducts(newProducts)

    }, [products])

    const closeAlert = () => {
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



            <section className='w-full min-h-[70vh] flex flex-col justify-center  p-3 md:px-[5em] rounded-lg'>

                <Link to='/addProduct' className='btn btn-primary  w-[10em] '>Add Product</Link>

                <ProductsTable
                    heading={heading}
                    body={products}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    currentPage={pageMetaData?.pageNo}
                    totalPages={pageMetaData?.totalPages}
                />
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
                actionText={modalData.actionText}
                actionLabel={modalData.actionLabel}
                action={modalData.action}
                actionLabelVariant={modalData.actionLabelVariant}
            />
        </>
    )
}

export default ProductsList
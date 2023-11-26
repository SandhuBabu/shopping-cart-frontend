import React, { useCallback, useState } from 'react'
import { Alert, BreadCrumb, Modal } from '../../components'
import ProductsTable from '../../components/AdminComponents/DataTable/ProductsTable'
import { useNavigate } from 'react-router-dom'
import { deleteProductById } from '../../services/adminService'

const breadCrumbsOptions = [
    { title: "Dashboard", path: "/" },
    { title: "Products", path: "/products" },
    { title: "Out of Stock" },
]

const heading = [
    "Image",
    "Title",
    "Category",
    "Price (Rs)",
    "Stock Available",
]

const allProducts = [
    {
        "title": "Backpack",
        "category": "Bags",
        "price": "59.99",
        "stockAvailable": "0",
        "id": "123456",
        "imageUrl": "https://pngimg.com/d/backpack_PNG6343.png"
    },
    {
        "title": "Messenger Bag",
        "category": "Bags",
        "price": "39.99",
        "stockAvailable": "0",
        "id": "234567",
        "imageUrl": "https://pngimg.com/d/backpack_PNG6343.png"
    },
    {
        "title": "Tote Bag",
        "category": "Bags",
        "price": "29.99",
        "stockAvailable": "0",
        "id": "345678",
        "imageUrl": "https://pngimg.com/d/backpack_PNG6343.png"
    },
    {
        "title": "Laptop Sleeve",
        "category": "Accessories",
        "price": "19.99",
        "stockAvailable": "0",
        "id": "456789",
        "imageUrl": "https://pngimg.com/d/backpack_PNG6343.png"
    },
    {
        "title": "Camera Strap",
        "category": "Accessories",
        "price": "9.99",
        "stockAvailable": "0",
        "id": "567890",
        "imageUrl": "https://pngimg.com/d/backpack_PNG6343.png"
    },
    {
        "title": "Phone Case",
        "category": "Accessories",
        "price": "14.99",
        "stockAvailable": "0",
        "id": "678901",
        "imageUrl": "https://pngimg.com/d/backpack_PNG6343.png"
    },
    {
        "title": "Wallet",
        "category": "Accessories",
        "price": "24.99",
        "stockAvailable": "0",
        "id": "789012",
        "imageUrl": "https://pngimg.com/d/backpack_PNG6343.png"
    },
    {
        "title": "Headphones",
        "category": "Accessories",
        "price": "49.99",
        "stockAvailable": "0",
        "id": "890123",
        "imageUrl": "https://pngimg.com/d/backpack_PNG6343.png"
    },
    {
        "title": "Sunglasses",
        "category": "Accessories",
        "price": "34.99",
        "stockAvailable": "0",
        "id": "901234",
        "imageUrl": "https://pngimg.com/d/backpack_PNG6343.png"
    },
    {
        "title": "Watch",
        "category": "Accessories",
        "price": "79.99",
        "stockAvailable": "0",
        "id": "012345",
        "imageUrl": "https://pngimg.com/d/backpack_PNG6343.png"
    }
]

const StockOutList = () => {

    const navigate = useNavigate()

    const [products, setProducts] = useState(allProducts);
    const [alertMessage, setAlertMessage] = useState({ message: '', type: '' });
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({
        isOpen: false,
        actionText: "",
        actionLabel: "",
        action: null,
        actionLabelVariant: ""
    })

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
            <div className='min-h-screen'>
                <BreadCrumb breadCrumbsOptions={breadCrumbsOptions} />

                <h1 className='text-2xl font-semibold'>Out Of Stocks</h1>

                <ProductsTable
                    heading={heading}
                    body={products}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />

            </div>
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

export default StockOutList


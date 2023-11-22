import React, { useCallback, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
import { getAddress } from '../../../services/userService'
import Modal from '../Modal/Modal'
import { Link, useNavigate } from 'react-router-dom'

const ProductPageImage = ({
    product,
    handleAddToCart,
    handleRemoveFromCart,
    inCart,
    cartLoading,
}) => {

    const controller = new AbortController();

    const [imageLoad, setImageLoad] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [address, setAddress] = useState({})
    const user = useSelector(store => store.user)
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            controller.abort();
        }
    }, [])

    const handleBuy = useCallback(async () => {
        if (!user?.id) {
            console.log(user);
            document.getElementById("login_modal")
            return
        }

        const { error, res } = await getAddress(controller.signal);
        if (!error) {
            setAddress(res)
        }
        setModalOpen(true)
    }, [user])

    const confirmAddress = () => {
        document.querySelector('body').style.overflowY = "auto"
        if (!address?.id) {
            navigate("/profile")
            return
        }

        navigate(`/orders/confirm/${product?.id}`, {
            state: {
                address: address,
                product
            }
        })
    }


    return (
        <>
            <div className='flex select-none flex-col items-center my-7 justify-center relative md:sticky top-[6em]  md:w-[50%] lg:w-40% max-h-[80vh] py-4 rounded-xl'>
                <img
                    loading='lazy'
                    onLoad={() => setImageLoad(true)}
                    draggable={false}
                    className={`max-h-[30em] ${imageLoad ? 'opacity-[1]' : 'opacity-0 h-0'} max-w-[80%]`}
                    src={product?.imageUrl}
                />

                {!imageLoad && <Skeleton width='30em' height='30em' />}

                {
                    user?.role !== "ADMIN" && user?.username && imageLoad &&
                    <div className='flex gap-3 mt-5 w-[80%]'>

                        {
                            inCart ?
                                <button
                                    onClick={handleRemoveFromCart}
                                    disabled={cartLoading}
                                    className='btn flex-1 btn-outline btn-primary z-[1]'>
                                    {
                                        cartLoading ?
                                            <span className='flex items-center gap-1'>
                                                <span>Removing From Cart</span>
                                                <span className="loading loading-spinner"></span>
                                            </span>
                                            :
                                            <span>Remove From Cart</span>
                                    }
                                </button>
                                :
                                <button
                                    onClick={handleAddToCart}
                                    disabled={cartLoading}
                                    className='btn flex-1 btn-outline btn-primary z-[1]'>
                                    {
                                        cartLoading ?
                                            <span className='flex items-center gap-1'>
                                                <span>Adding To Cart</span>
                                                <span className="loading loading-spinner"></span>
                                            </span>
                                            :
                                            <span>Add To Cart</span>
                                    }
                                </button>
                        }
                        <button
                            onClick={handleBuy}
                            className='btn flex-1 btn-primary z-[1]'
                            disabled={product.stockAvailable < 1}
                        >Buy Now</button>
                    </div>
                }
            </div>

            <Modal
                isOpen={modalOpen}
                cancel={() => setModalOpen(false)}
                action={confirmAddress}
                actionLabel="Yes, continue"
                actionLabelVariant="text-green-400"
            >
                <div>
                    {
                        address?.id ?
                            <>
                                <h1 className='font-medium'>Delivery Address</h1>
                                <p>{address?.houseName}, {address?.locality}</p>
                                <p>{address?.district}, {address?.state} - {address?.zip}</p>
                                <button
                                    onClick={() => {
                                        document.querySelector("body").style.overflowY = "auto"
                                        navigate("/profile/address")
                                    }}
                                    className='btn-link font-medium my-2 block'
                                >
                                    Manage Address
                                </button>
                                <p className='text-sm  text-gray-500 my-3 '>Name and phone number is autmatically taken from user data</p>
                            </>
                            :
                            <p>No saved address found, please add one</p>
                    }
                </div>
            </Modal>
        </>
    )
}

export default React.memo(ProductPageImage)
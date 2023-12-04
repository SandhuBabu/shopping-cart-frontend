import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { BreadCrumb, Input, Select } from '../../components';
import { refresh } from '../../services/authService';
import { categories, scrollToTop, setAdminTitle } from '../../utils/utils';
import { editProductEndpoint } from '../../services/adminService';
import { getProductById } from '../../services/productService';
import { NotFound404 } from '..';

const genderOptions = [
    { title: "unisex" },
    { title: "female" },
    { title: "male" }
]

const breadCrumbsOptions = [
    { title: "Dashboard", path: "/" },
    { title: "Products", path: '/products' },
    { title: "Edit" }
]

const EditProduct = () => {


    const navigate = useNavigate();
    const { id } = useParams();

    const [error, setError] = useState(false);
    const [load, setLoad] = useState(false);
    const [updating, setUpdating] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [savedImageUrl, setSavedImageUrl] = useState('')
    const [product, setProduct] = useState({
        id: id,
        title: '',
        category: '',
        gender: '',
        imageUrl: '',
        image: '',
        price: 0,
        stockAvailable: 0,
        description: ''
    })

    useEffect(() => {
        scrollToTop()
        loadProduct();

        document.getElementById('Products').classList.add('active')
        return () => {
            document.getElementById('Products').classList.remove('active')
            scrollToTop()
        }
    }, [])

    const loadProduct = async () => {
        const { error, ...data } = await getProductById(id)
        if (error) {
            if (error?.status === 403) {
                refresh();
                window.location.reload();
            }
            setError(true)
            setLoad(true)
            return
        }
        setAdminTitle(`Edit Product ${data.title}`)
        setError(false)
        setProduct(prev => ({ ...prev, ...data }))
        setSavedImageUrl(data?.imageUrl)
        setLoad(true)
    }

    const handleSubmit = async (e) => {
        setUpdating(true)
        e.preventDefault();

        const formData = new FormData();
        Object.entries(product).forEach(([key, value]) => {
            if (key !== "imageUrl")
                formData.append(key, value)
        })

        try {
            await editProductEndpoint(formData, id)
            setErrorMessage("");
            navigate("/");
        } catch (err) {
            if (err === "no_user") {
                refresh();
                setErrorMessage("Can't create new product, try again.");
                return
            }
            setErrorMessage(err);
        } finally {
            setUpdating(false)
        }
    }

    const handleChange = useCallback((e) => {
        if (e.target.files && e.target.files.length > 0) {
            console.log(e.target.files);
            setSavedImageUrl(URL.createObjectURL(e.target.files[0]))
            setProduct(prev => ({ ...prev, image: e.target.files[0] }))
        } else {
            const { name, value } = e.target;
            setProduct(prev => ({ ...prev, [name]: value }))
        }
    }, [])

    if (error) {
        return <NotFound404 />
    }


    return (
        load &&
        <>
            <BreadCrumb breadCrumbsOptions={breadCrumbsOptions} />

            <section className='w-full px-4 flex justify-center pb-16'>
                <form onSubmit={handleSubmit} className='w-full lg:w-[40em]'>
                    <h1 className='text-center text-3xl my-3 capitalize'>Edit Product - {product?.title}</h1>

                    <Input type="text" value={product.title} onChange={handleChange} title="title" name="title" />

                    <Select onChange={handleChange} defaultValue={product.category} options={categories} title="Category" name="category" />

                    <Select onChange={handleChange} defaultValue={product.gender.toLowerCase()} options={genderOptions} title="Gender" name="gender" />


                    <figure className='px-3 py-3 mt-14 w-[max-content] rounded-lg bg-base-300'>
                        <img
                            src={savedImageUrl}
                            alt="product"
                            className="rounded-xl w-[15em]"
                        />
                    </figure>
                    <Input type="file" onChange={handleChange} title="Image" accept="image/*" name="image" />

                    <Input type="number" value={product.price} onChange={handleChange} title="price" name="price" />

                    <Input type="number" value={product.stockAvailable} onChange={handleChange} title='Stocks Available' name='stockAvailable' />

                    <Input type='textarea' value={product.description} onChange={handleChange} title="Description" name="description" />

                    {
                        errorMessage &&
                        <p className='flex gap-1 text-sm my-3 text-red-400'>

                            <span className="material-symbols-outlined text-[20px]">error</span>
                            <span>{errorMessage}</span>
                        </p>
                    }

                    <div className='flex justify-center mt-12'>
                        <button
                            className="btn btn-primary w-full"
                            type='submit'
                            disabled={updating}
                        >
                            {updating && <span className="loading loading-spinner"></span>}
                            Update product
                        </button>
                    </div>


                </form>
            </section>
        </>
    )
}

export default EditProduct
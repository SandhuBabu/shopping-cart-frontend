import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Select } from '../../components';
import { refresh } from '../../services/authService';
import { setAdminTitle } from '../../utils/utils';
import { editProductEndpoint } from '../../services/adminService';
import { getProductById } from '../../services/productService';
import { NotFound404 } from '..';

const genderOptions = ["male", "female", "unisex"]

const EditProduct = () => {

    /**
     * fetch product data and set image url to another variable for seeing image when input handle change works
     */

    const navigate = useNavigate();
    const { id } = useParams();

    const [error, setError] = useState(false);
    const [load, setLoad] = useState(false);
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
        loadProduct();
    }, [])

    const loadProduct = async () => {
        const { error, ...data } = await getProductById(id)
        if (error) {
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
        e.preventDefault();

        const formData = new FormData();
        Object.entries(product).forEach(([key, value]) => {
            if (key !== "imageUrl")
                formData.append(key, value)
        })



        formData.forEach((val, key) => {
            console.log(key, val);
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
        <section className='w-full px-4 flex justify-center pb-16'>
            <form onSubmit={handleSubmit} className='w-full lg:w-[40em]'>
                <h1 className='text-center text-3xl my-3'>Edit Product - {product.title}</h1>

                <Input type="text" value={product.title} onChange={handleChange} title="title" name="title" />

                <Input type="text" value={product.category} onChange={handleChange} title="category" name="category" />

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
                        <span>{error}, </span>
                    </p>
                }

                <div className='flex justify-center mt-12'>
                    <button className="btn btn-primary w-full" type='submit'>Create new product</button>
                </div>
            </form>
        </section>
    )
}

export default EditProduct
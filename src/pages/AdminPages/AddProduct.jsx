import React, { useCallback, useState } from 'react'
import { addProductEndpoint } from '../../services/adminService';
import { BreadCrumb, Input, Select } from '../../components';
import { refresh } from '../../services/authService';
import { setAdminTitle } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';


const genderOptions = ["unisex", "female", "male"]

const breadCrumbsOptions = [
    { title: "Dashboard", path: "/" },
    { title: "Products", path: '/products' },
    { title: "Add Product" }
]

const AddProduct = () => {

    setAdminTitle("Add Product");

    const [updating, setUpdating] = useState(false)
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: '',
        category: '',
        gender: 'unisex',
        image: '',
        price: 0,
        stockAvailable: 0,
        description: ''
    })

    const handleChange = useCallback((e) => {
        if (e.target.files) {
            setProduct(prev => ({ ...prev, image: e.target.files[0] }))
        } else {
            const { name, value } = e.target;
            setProduct(prev => ({ ...prev, [name]: value }))
        }
    }, [])

    const handleSubmit = async (e) => {
        setUpdating(true);
        e.preventDefault();

        const formData = new FormData();
        Object.entries(product).forEach(([key, value]) => {
            formData.append(key, value)
        })

        try {
            await addProductEndpoint(formData);
            setError("");
            navigate("/");
        } catch (err) {
            if (err === "no_user") {
                refresh();
                setError("Can't create new product, try again.");
                return
            }
            setError(err);
        } finally {
            setUpdating(false)
        }
    }



    return (
        <>
            <BreadCrumb breadCrumbsOptions={breadCrumbsOptions} />
            <section className='w-full min-h-screen px-4 flex justify-center pb-16'>
                <form onSubmit={handleSubmit} className='w-full lg:w-[40em]'>
                    <h1 className='text-center text-3xl my-3'>Create Account</h1>

                    <Input type="text" value={product.title} onChange={handleChange} title="title" name="title" />

                    <Input type="text" value={product.category} onChange={handleChange} title="category" name="category" />

                    <Select onChange={handleChange} defaultValue={product.gender.toLowerCase()} options={genderOptions} title="Gender" name="gender" />

                    <Input type="file" onChange={handleChange} title="Image" accept="image/*" name="image" />

                    <Input type="number" value={product.price} onChange={handleChange} title="price" name="price" />

                    <Input type="number" value={product.stockAvailable} onChange={handleChange} title='Stocks Available' name='stockAvailable' />

                    <Input type='textarea' value={product.description} onChange={handleChange} title="Description" name="description" />

                    {
                        error &&
                        <p className='flex gap-1 text-sm my-3 text-red-400'>

                            <span className="material-symbols-outlined text-[20px]">error</span>
                            <span>{error}, </span>
                        </p>
                    }

                    <div className='flex justify-center mt-12'>
                        <button
                            className="btn btn-primary w-full"
                            type='submit'
                            disabled={updating}
                        >
                            {updating && <span className="loading loading-spinner"></span>}
                            Add product
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}


export default AddProduct

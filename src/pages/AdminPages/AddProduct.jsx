import React, { useCallback, useState } from 'react'
import { addProductEndpoint } from '../../services/adminService';
import { Input, Select } from '../../components';
import { refresh } from '../../services/authService';
import { setAdminTitle } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';


const genderOptions = ["male", "female", "unisex"]


const AddProduct = () => {

    setAdminTitle("Add Product");

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: '',
        category: '',
        gender: '',
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
        e.preventDefault();
        // const formData = new FormData(e.target);
        e.preventDefault();

        const formData = new FormData();
        Object.entries(product).forEach(([key, value]) => {
            formData.append(key, value)
        })

        try {
            const res = await addProductEndpoint(formData);
            setError("");
            navigate("/");
        } catch (err) {
            if (err === "no_user") {
                refresh();
                setError("Can't create new product, try again.");
                return
            }
            setError(err);
        }
    }



    return (
        <section className='w-full px-4 flex justify-center pb-16'>
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
                    <button className="btn btn-primary w-full" type='submit'>Create new product</button>
                </div>
            </form>
        </section>
    )
}


export default AddProduct

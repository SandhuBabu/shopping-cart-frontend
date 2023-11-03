import React, { useState } from 'react'
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

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
            <form onSubmit={handleSubmit} className='w-full lg:w-[40em]' enctype="multipart/form-data">
                <h1 className='text-center text-3xl my-3'>Create Account</h1>

                <Input type="text" title="title" name="title" />

                <Input type="text" title="category" name="category" />

                <Select type="select" options={genderOptions} title="Gender" name="gender" />

                <Input type="file" title="Image" accept="image/*" name="image" />

                <Input type="number" title="price" name="price" />

                <Input type="number" title='Stocks Available' name='stockAvailable' />

                <Input type='textarea' title="Description" name="description" />

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

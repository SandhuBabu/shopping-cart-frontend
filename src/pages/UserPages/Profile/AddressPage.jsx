import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { addAddress, getAddress } from '../../../services/userService'

const AddressPage = () => {

    const controller = new AbortController();

    const user = useSelector(store => store.user)
    const [edit, setEdit] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [address, setAddress] = useState({
        id: undefined,
        houseName: "",
        locality: "",
        district: "",
        state: "",
        zip: ""
    })



    useEffect(() => {
        handleGetAddress();
        return () => {
            controller.abort();
        }
    }, [])

    const handleGetAddress = async () => {
        const { res, error } = await getAddress(controller.signal);
        if (!error)
            setAddress(res)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        const { res, error } = await addAddress(address);

        setSaving(false)
        if (!error) {
            setAddress(res);
            setEdit(false)
            return
        }

        setError(res)
    }

    const handleChange = (e) => {
        setError('')
        const { name, value } = e.target;
        if (name === "zip" && String(value).trim().length > 6) {
            setError("Zip code, max length 6")
            return
        }

        setAddress(prev => ({ ...prev, [name]: value }))
    }

    return (
        <>
            {/* <pre>
                {JSON.stringify(address, undefined, 4)}
            </pre> */}

            <div className='flex justify-center items-center gap-4 my-8'>
                <h1 className='text-2xl font-medium'>
                    Manage Address
                </h1>
                <button
                    className='bg-blue-400 badge py-4 px-3 text-gray-800 font-medium'
                    onClick={() => setEdit(prev => !prev)}
                >
                    {edit ? "Cancel" : "Edit"}
                </button>
            </div>

            <div className="form-control w-full md:w-[50%] lg:w-[40%] mx-auto mt-3">
                <p className='label'>Name</p>
                <p className='border border-gray-500 opacity-[0.6] px-3 py-4 rounded cursor-default'>{user.username}</p>
            </div>

            <div className="form-control w-full md:w-[50%] lg:w-[40%] mx-auto mt-3">
                <p className='label'>Phone Number</p>
                <p className='border border-gray-500 opacity-[0.6] px-3 py-4 rounded cursor-default'>{user.mobile}</p>
            </div>


            <form onSubmit={handleSubmit} className='w-full  md:w-[50%] lg:w-[40%] mx-auto'>
                <div className='lg:flex gap-4'>
                    <div className="form-control w-full mt-3">
                        <label className="label">
                            <span className="label-text">House Name</span>
                        </label>
                        <input
                            type="text"
                            name='houseName'
                            value={address?.houseName}
                            onChange={handleChange}
                            className="px-4 bg-transparent border border-primary rounded py-[1em] w-full disabled:border disabled:border-gray-500 opacity-[0.6]"
                            required
                            disabled={!edit}
                        />
                    </div>
                    <div className="form-control w-full mt-3">
                        <label className="label">
                            <span className="label-text">Locality</span>
                        </label>
                        <input
                            type="text"
                            name='locality'
                            value={address?.locality}
                            onChange={handleChange}
                            className="px-4 bg-transparent border border-primary rounded py-[1em] w-full disabled:border disabled:border-gray-500 opacity-[0.6]"
                            required
                            disabled={!edit}
                        />
                    </div>


                </div>
                <div className='lg:flex gap-4'>
                    <div className="form-control w-full mt-3">
                        <label className="label">
                            <span className="label-text">District</span>
                        </label>
                        <input
                            type="text"
                            name='district'
                            value={address?.district}
                            onChange={handleChange}
                            className="px-4 bg-transparent border border-primary rounded py-[1em] w-full disabled:border disabled:border-gray-500 opacity-[0.6]"
                            required
                            disabled={!edit}
                        />
                    </div>

                    <div className="form-control w-full mt-3">
                        <label className="label">
                            <span className="label-text">State</span>
                        </label>
                        <input
                            type="text"
                            name='state'
                            value={address?.state}
                            onChange={handleChange}
                            className="px-4 bg-transparent border border-primary rounded py-[1em] w-full disabled:border disabled:border-gray-500 opacity-[0.6]"
                            required
                            disabled={!edit}
                        />
                    </div>

                    <div className="form-control w-full mt-3">
                        <label className="label">
                            <span className="label-text">Zip Code</span>
                        </label>
                        <input
                            type="number"
                            name='zip'
                            value={address?.zip}
                            onChange={handleChange}
                            className="px-4 bg-transparent border border-primary rounded py-[1em] w-full disabled:border disabled:border-gray-500 opacity-[0.6]"
                            required
                            disabled={!edit}
                        />
                    </div>
                </div>

                {
                    error && edit &&
                    <p className='my-6 text-red-400'>{error}</p>
                }

                {
                    edit &&
                    <div className='flex justify-center mt-5'>
                        <button
                            className="btn btn-primary w-full"
                            type='submit'
                            disabled={saving}
                        >
                            {

                                saving ?
                                    <>
                                        <span>Saving Address</span>
                                        <span className="loading loading-spinner"></span>
                                    </>
                                    :
                                    <span>Save Address</span>
                            }
                        </button>
                    </div>
                }
            </form>
        </>
    )
}

export default AddressPage
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../features/userSlice'
import { updateUser } from '../../../services/userService';
import { Toast } from '../../../components'
import { Link } from 'react-router-dom';

const ProfilePage = () => {

    const user = useSelector(store => store.user)
    const dispatch = useDispatch();

    const initialNewUserData = {
        username: user?.username,
        mobile: user?.mobile
    }


    const [edit, setEdit] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")
    const [newUserData, setNewUserData] = useState(initialNewUserData)
    const [toast, setToast] = useState({ open: false, message: '', variant: '' })

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            (newUserData.username === user?.username) &&
            (newUserData.mobile === user?.mobile)
        ) {
            console.log("NO_CHANGE");
            setEdit(false)
            return
        }

        setSaving(true)

        const mobileNumber = e.target.mobile.value
        if (mobileNumber.trim().length !== 10) {
            setError("Invalid mobile number - max length 10")
            return
        } else {
            setError('')
        }

        const formData = new FormData();
        formData.append("username", newUserData.username)
        formData.append("mobile", newUserData.mobile)

        const { error, message } = await updateUser(formData)

        setToast({
            open: true,
            message,
            variant: error ? 'red' : 'green'
        })

        setTimeout(() => {
            setToast({ open: false, message: '' })
        }, 2500)

        if (error) {
            setError(error)
            setSaving(false)

            return
        }
        dispatch(setUser({ ...user, username: newUserData.username, mobile: newUserData.mobile }))
        setSaving(false)
        setEdit(false)
    }

    const handleChange = e => {
        setError('')
        const { name, value } = e.target
        setNewUserData(prev => ({ ...prev, [name]: value }))
    }

    const cancelEdit = () => {
        setError('')
        setEdit(prev => !prev)
        setNewUserData(initialNewUserData)
    }

    return (
        <>
            <div className='p-6'>
                <div className='flex items-center gap-4'>
                    <h1 className='text-xl font-medium'>Personal Informations</h1>
                    <button
                        onClick={cancelEdit}
                        className='text-primary font-semibold'
                    >
                        {edit ? "Cancel" : "Edit"}
                    </button>
                </div>

                <Link
                    to="/profile/address"
                    className='btn-link font-medium mt-4 block'
                >
                    Manage Address</Link>

                <form onSubmit={handleSubmit} className='w-full mt-[3em] md:w-[40%]'>
                    <div className="form-control w-full mt-3">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            name='username'
                            value={newUserData?.username}
                            onChange={handleChange}
                            className="px-4 disabled:px-0 bg-transparent border border-primary rounded py-[1em] w-full disabled:border-0 disabled:text-gray-400"
                            required
                            disabled={!edit}
                        />
                    </div>
                    <div className="form-control w-full mt-3">
                        <label className="label">
                            <span className="label-text">Email Address</span>
                        </label>
                        <input
                            type="email"
                            name='email'
                            value={user?.email}
                            onChange={handleChange}
                            className="px-4 disabled:px-0 bg-transparent border border-primary rounded py-[1em] w-full disabled:border-0 disabled:text-gray-400"
                            required
                            disabled
                        />
                    </div>
                    <div className="form-control w-full mt-3">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input
                            type="number"
                            name='mobile'
                            value={newUserData?.mobile}
                            onChange={handleChange}
                            className="px-4 disabled:px-0 bg-transparent border border-primary rounded py-[1em] w-full disabled:border-0 disabled:text-gray-400"
                            required
                            disabled={!edit}
                        />
                    </div>

                    {
                        error &&
                        <p className='flex gap-1 text-sm my-3 text-red-400'>
                            {error}
                        </p>
                    }


                    {
                        edit &&
                        <div className='flex justify-center mt-5'>
                            <button
                                className="btn btn-primary w-full"
                                type='submit'
                                disabled={saving}
                            >
                                <span>Save</span>
                                {
                                    saving &&
                                    <span className="loading loading-spinner"></span>
                                }
                            </button>
                        </div>
                    }
                </form>
            </div>

            {
                toast?.open &&
                <Toast variant={toast?.variant}>
                    <span>{toast?.message}</span>
                </Toast>
            }
        </>
    )
}

export default ProfilePage
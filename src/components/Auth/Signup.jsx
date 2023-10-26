import React, { useEffect, useRef } from 'react'

const Signup = () => {

    const passwordRef = useRef();

    useEffect(() => {
        const prevTitle = document.querySelector("title").innerHTML;
        document.querySelector("title").innerHTML = "Sign Up"
       
        return () => {
            document.querySelector("title").innerHTML = prevTitle
        }
    }, [])

    const handleSignup = () => {

    }

    const handleShowPassword = () => {
        const { type } = passwordRef.current
        if (type === "password")
            passwordRef.current.type = "text"
        else
            passwordRef.current.type = "password"
    }


    return (
        <section className='w-full px-4 flex justify-center'>
            <form onSubmit={handleSignup} className='w-full lg:w-[40em]'>
                <h1 className='text-center text-3xl my-3'>Create Account</h1>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        name='fullName'
                        placeholder="Enter full name"
                        className="input input-primary w-full capitalize"
                        required
                    />
                </div>

                <div className="form-control w-full mt-4">
                    <label className="label">
                        <span className="label-text">Email Address</span>
                    </label>
                    <input
                        type="email"
                        name='email'
                        placeholder="Enter email address"
                        className="input input-primary w-full"
                        required
                    />
                </div>

                <div className="form-control w-full mt-4">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        ref={passwordRef}
                        type="password"
                        name='password'
                        placeholder="Enter password"
                        className="input input-primary w-full"
                        required
                    />

                    <div className='flex items-center gap-2 mt-4'>
                        <input type="checkbox" onChange={handleShowPassword} className="checkbox checkbox-xs checkbox-primary" />
                        <span> Show Password</span>
                    </div>
                </div>

                <p className='flex gap-1 text-sm my-3 text-red-400'>
                    <span className="material-symbols-outlined text-[20px]">error</span>
                    <span>Email already registered</span>
                </p>

                <div className='flex justify-center mt-7'>
                    <button className="btn btn-primary w-full" type='submit'>Signup</button>
                </div>
            </form>
        </section>
    )
}

export default Signup
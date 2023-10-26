import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginModal = () => {

    const naviagate = useNavigate();
    const passwordRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault();
    }

    const handleNavigateSignUp = () => {
        naviagate("/signup", { replace: true });
    }

    const handleShowPassword = () => {
        const { type } = passwordRef.current
        if (type === "password")
            passwordRef.current.type = "text"
        else
            passwordRef.current.type = "password"
    }


    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="text-2xl  absolute right-4 top-3">✕</button>
                </form>

                <h3 className="font-bold text-center text-2xl my-3">Login Now</h3>

                <form onSubmit={handleLogin}>
                    <div className="form-control w-full">
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
                        <span>Invalid username or password</span>
                    </p>

                    <div className='flex justify-center mt-5'>
                        <button className="btn btn-primary w-full" type='submit'>Login</button>
                    </div>
                </form>

                <div className='text-center mt-7'>
                    <form method="dialog">
                        Don't have an account?
                        <button className="underline" onClick={handleNavigateSignUp}>&nbsp; signup</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default LoginModal
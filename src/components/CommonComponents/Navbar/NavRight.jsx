import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../Buttons/Button';
import { logout } from '../../../services/authService';
import { handleUserLogout } from '../../../features/userSlice';
import ThemeToggle from './ThemeToggle';


const NavRight = () => {

    const user = useSelector(state => state.user);
    const [load, setLoad] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setLoad(true);

    }, [])


    const handleLoginModal = () => {
        document.getElementById('login_modal').showModal()
    }

    const handleLogout = () => {
        logout().then(() => {
            dispatch(handleUserLogout())
            navigate("/", { replace: true })
        }).catch((err) => {
            console.log(err);
            alert("can't perform logout")
        })
    }

    if (!user.id && !localStorage.getItem("refreshToken")) {
        // if (!user.id) {
        return (
            <Button
                classNames="btn btn-primary"
                onClick={handleLoginModal}
            >
                Login
            </Button>
        )
    }

    return (
        user.id && load &&
        <div className="flex-none gap-3">
            {
                user?.role === "USER" && user?.cartCount > 0 &&
                <div className="dropdown dropdown-end ">
                    <Link to='/cart'>
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm badge-primary indicator-item">{user?.cartCount}</span>
                            </div>
                        </label>
                    </Link>
                </div>
            }

            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn">
                    <div>
                        <p>{user?.username.split(" ")[0]}</p>
                    </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li className='h-[3em] mt-2'>
                        <Link to="/profile" className='flex w-full h-full items-center'>Profile</Link>
                    </li>
                    <li className='h-[3em] mt-2'>
                        <Link to="/orders" className='flex w-full h-[3em] items-center'>Orders</Link>
                    </li>
                    <li className='h-[3em] mt-2'>
                        <ThemeToggle />
                    </li>
                    <Button
                        classNames="flex items-center justify-start gap-1 pl-3 py-3 rounded hover:bg-base-200"
                        onClick={handleLogout}>
                        <span className="material-symbols-outlined">
                            power_settings_new
                        </span>
                        Logout
                    </Button>
                </ul>
            </div>
        </div>
    )
}

export default NavRight
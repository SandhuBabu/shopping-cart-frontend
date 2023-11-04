import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../Buttons/Button';
import { logout } from '../../../services/authService';
import { handleUserLogout } from '../../../features/userSlice';
import { ButtonSkeleton } from '../../skeletons/ButtonSkeleton';
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

    if (!user.id) {
        return <ButtonSkeleton />
    }

    return (
        user.id && load &&
        <div className="flex-none gap-3">
            {
                user?.role === "USER" &&
                <div className="dropdown dropdown-end ">
                    <Link to='/cart'>
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm badge-primary indicator-item">8</span>
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
                    <li>
                        <Link to="/profile" className='h-[2em]'>Profile</Link>
                    </li>
                    <li>
                        <Link to="/settings" className='h-8'>Settings</Link>
                    </li>
                    <li>
                        <ThemeToggle />
                    </li>
                    <Button
                        classNames="btn btn-outline btn-sm btn-primary h-[2em] w-[7em] ml-2 mt-3"
                        onClick={handleLogout}>
                        Logout
                    </Button>
                </ul>
            </div>
        </div>
    )
}

export default NavRight
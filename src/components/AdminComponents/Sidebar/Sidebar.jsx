import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const navLinks = [
    { title: 'Dashboard', icon: 'dashboard', path: '/' },
    { title: 'Products', icon: 'category', path: '/products' },
    { title: 'Orders', icon: 'package_2', path: '/orders' },
    { title: 'Add', icon: 'add', path: '/addProduct' },
    { title: 'Manage', icon: 'display_settings', path: '/manage' },
]


const Sidebar = () => {

    return (
        <aside id='sidebar' className='bg-base-100 shadow overflow-y-scroll'>
            <div>
                <ul className='mt-10 px-1'>
                    {
                        navLinks.map((obj, k) => (
                            <li key={k} className='mt-3'>
                                <NavLink
                                    to={obj.path}
                                    id={obj.title}
                                    className='nav-link flex  items-center hover:bg-base-200'
                                >
                                    <span className="material-symbols-outlined">
                                        {obj.icon}
                                    </span>
                                    <p className='text-[13px]'>{obj.title}</p>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </aside>
    )



    return (
        <aside
            id='admin-sidebar'
            style={{ transition: 'left 200ms' }}
            className={`w-[17em] z-[99] fixed top-0 md:top-[5em] h-screen left-[${pos}em] md:left-0  bg-base-100 shadow-2xl`}
        >
            <button
                className='bg-primary md:hidden rounded-lg w-10 h-10 grid place-items-center absolute top-5 right-1'
                onClick={close}
            >
                <span className="material-symbols-outlined h-6 w-6">
                    keyboard_double_arrow_left
                </span>
            </button>

            <ul>
                <NavLink to='/' className={menuLi}><li>Home</li></NavLink>
                <NavLink to='/' className={menuLi}><li>Add Product</li></NavLink>
                <NavLink to='/' className={menuLi}><li>All Products</li></NavLink>

            </ul>
        </aside>
    )
}

export default React.memo(Sidebar)
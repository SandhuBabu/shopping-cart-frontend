import React from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../../../utils/utils'
import './Header.scss'



const Header = () => {
    return (
        <header
            id='header-scrollbar'
            className='w-full h-[3em] flex items-center px-2 gap-6 overflow-x-auto my-1'
        >

            {
                categories.map((cat, k) => (
                    <Link
                        to={cat.link}
                        key={k}
                        className='hover:bg-primary hover:text-white shadow-xl min-w-max cursor-pointer px-5 py-1 rounded'
                    >{cat.title}</Link>
                ))
            }
        </header>
    )
}

export default React.memo(Header)
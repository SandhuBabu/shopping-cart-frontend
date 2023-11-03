import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

const categories = [
    { title: "Smartwatches", link: "/category/smartwatches" },
    { title: "Bags", link: "/category/bags" },
    { title: "Shoes", link: "/category/shoes" },
    { title: "T-Shirts", link: "/category/t-shirts" },
    { title: "Shirts", link: "/category/shirts" },
    { title: "Jeans", link: "/category/jeans" },
    { title: "Sneakers", link: "/category/sneakers" },
    { title: "Backpacks", link: "/category/backpacks" },
    { title: "Hoodies", link: "/category/hoodies" },
    { title: "Dresses", link: "/category/dresses" },
    { title: "Accessories", link: "/category/accessories" },
    { title: "Skateboards", link: "/category/skateboards" },
    { title: "Headphones", link: "/category/headphones" },
    { title: "Sunglasses", link: "/category/sunglasses" },
    { title: "Watches", link: "/category/watches" },
]

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
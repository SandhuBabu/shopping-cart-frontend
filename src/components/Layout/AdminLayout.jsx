import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Navbar } from '..'

const AdminLayout = () => {
    return (
        <main>
            <Navbar />

            <div className="drawer z-[99]">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>

                    </ul>
                </div>
            </div>



            <div className='w-full px-5 pb-[4em] pt-2' style={{ minHeight: "calc(100vh - 5em)" }}>
                <Outlet />
            </div>
            <Footer />
        </main>
    )
}

export default AdminLayout
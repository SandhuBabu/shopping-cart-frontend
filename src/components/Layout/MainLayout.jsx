import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const MainLayout = () => {
  return (
    <main>
      <Navbar />
      <div className='w-full px-5 py-8' style={{ minHeight: "calc(100vh - 5em)" }}>
        <Outlet />
      </div>
    </main>
  )
}

export default MainLayout
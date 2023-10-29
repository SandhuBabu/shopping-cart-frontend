import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Navbar } from '..'

const MainLayout = () => {
  return (
    <main>
      <Navbar />
      <div className='w-full px-5 pb-[4em] pt-2' style={{ minHeight: "calc(100vh - 5em)" }}>
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}

export default MainLayout
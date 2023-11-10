import React from 'react'
import { Outlet } from 'react-router-dom'

import { Navbar, Footer } from '..'

const MainLayout = () => {
  return (
      <main>
        <Navbar />
        <div className='w-full min-h-screen px-5 pb-[4em] pt-2' style={{ minHeight: "calc(100vh - 5em)" }}>
          <Outlet />
        </div>
        <Footer />
      </main>
  )
}

export default MainLayout
import React, { useEffect } from 'react'
import { scrollToTop, setAdminTitle } from '../../utils/utils'
import { useSelector } from 'react-redux'
import {
  AdminHomeChart,
  AdminHomeOrdersTable,
  AdminStats,
} from '../../components'
import { Link } from 'react-router-dom'

const HomePage = () => {

  const user = useSelector(store => store.user)
  setAdminTitle("Admin")

  useEffect(() => {
    scrollToTop()
    return () => scrollToTop()
  }, [])




  return (
    <div className='min-h-screen'>
      <h2 className='text-lg mb-4'>Welcome {user?.username},</h2>

      <Link
        to="/addProduct"
        className='btn btn-primary mt-2 mb-6'
      >Add New Product</Link>
      <AdminStats />
      <div className='flex flex-col gap-4 xl:flex-row'>
        <AdminHomeOrdersTable />
        <div className='flex items-center justify-center'>
          <AdminHomeChart />
        </div>
      </div>

    </div>
  )
}

export default HomePage
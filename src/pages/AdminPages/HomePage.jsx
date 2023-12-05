import React, { useCallback, useEffect, useState } from 'react'
import { scrollToTop, setAdminTitle } from '../../utils/utils'
import { useSelector } from 'react-redux'
import {
  AdminHomeChart,
  AdminHomeOrdersTable,
  AdminStats,
} from '../../components'
import { Link } from 'react-router-dom'
import { dashboardDetails } from '../../services/adminService'

const HomePage = () => {
  const controller = new AbortController();
  const user = useSelector(store => store.user)
  const [data, setData] = useState();
  setAdminTitle("Admin")

  useEffect(() => {
    getDashboardDetails()
    scrollToTop()
    return () => {
      controller.abort()
      scrollToTop()
    }
  }, [])


  const getDashboardDetails = useCallback(async () => {
    const res = await dashboardDetails(controller.signal)
    setData(res)
  }, [])


  return (
    <div className='min-h-screen'>
      <h2 className='text-lg mb-4'>Welcome {user?.username},</h2>

      <Link
        to="/addProduct"
        className='btn btn-primary mt-2 mb-6'
      >Add New Product</Link>
      <AdminStats
        newOrdersCount={data?.newOrdersCount}
        outOfStock={data?.outOfStock}
        todaysEarning={data?.todaysEarning}
        totalEarnings={data?.totalEarnings}
      />
      <div className='flex flex-col gap-4 xl:flex-row'>
        <AdminHomeOrdersTable
          orders={data?.recentOrders}
        />
        <div className='flex items-center min-h-[35em] mt-[4em] lg:mt-[-4.5em] justify-center'>
          <AdminHomeChart />
        </div>
      </div>

    </div>
  )
}

export default HomePage
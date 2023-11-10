import React, { useEffect } from 'react'
import { scrollToTop, setAdminTitle } from '../../utils/utils'
import { useSelector } from 'react-redux'

const HomePage = () => {

  const user = useSelector(store => store.user)
  setAdminTitle("Admin")

  useEffect(() => {
    scrollToTop()
    return () => scrollToTop()
  }, [])




  return (
    <div className='min-h-screen'>
      <h2 className='text-xl'>Welcome {user?.username},</h2>
    </div>
  )
}

export default HomePage
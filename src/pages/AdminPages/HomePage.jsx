import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setAdminTitle } from '../../utils/utils'

const HomePage = () => {

  setAdminTitle("Admin")

  return (
    <div>
      <h1 className='text-3xl my-4 mx-3'>Admin Home Page</h1>
      <Link to='/product/1' className='link text-blue-500 m-4'>products</Link>
      <Link to='/addProduct' className='link text-blue-500 m-4'>add products</Link>


    </div>
  )
}

export default HomePage
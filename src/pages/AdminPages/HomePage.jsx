import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { setAdminTitle } from '../../utils/utils'
import { getAllProductsPaginated } from '../../services/productService'
import { refresh } from '../../services/authService'


const heading = [
  "ID",
  "Image",
  "Title",
  "Category",
  "Price (Rs)",
  "Stock Available",
]

const HomePage = () => {

  setAdminTitle("Admin")

  


  return (
    <div>
      <h1 className='text-3xl my-4 mx-3'>Admin Home Page</h1>
      <Link to='/product/1' className='link text-blue-500 m-4'>products 1</Link>
      <Link to='/addProduct' className='link text-blue-500 m-4'>add products</Link>
      <Link to='/products' className='link text-blue-500 m-4'>All Products</Link>


    </div>
  )
}

export default HomePage
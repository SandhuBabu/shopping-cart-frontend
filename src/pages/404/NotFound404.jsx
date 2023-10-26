import React from 'react'
import Logo from "../../assets/not_found.svg"
import { Link } from 'react-router-dom'

const NotFound404 = () => {
  return (
    <div className='w-full h-[80vh] flex flex-col items-center justify-center'>
      <img
        className='w-full h-[50%]'
        src={Logo}
      />
      <p className='text-center my-3'>
        "The page you're looking for is like a hidden treasure – not found here. Let's navigate home together!"
      </p>
      <Link
        to="/"
        className='btn btn-primary rounded-full px-8'
      >Go Home</Link>
    </div>
  )
}

export default NotFound404
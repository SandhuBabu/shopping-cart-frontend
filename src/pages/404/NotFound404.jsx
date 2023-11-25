import React from 'react'
import Logo from "../../assets/not_found.svg"
import { Link, useNavigate } from 'react-router-dom'

const NotFound404 = ({ message }) => {

  const navigate = useNavigate();

  const handleNavigate = path => {
    if (path === "prev") {
      navigate(-1, { replace: true })
      return
    }

    navigate(path, {replace:true})
  }

  return (
    <div className='w-full h-[80vh] flex flex-col items-center justify-center'>
      <img
        className='w-full h-[50%]'
        src={Logo}
      />
      <p className='text-center my-3'>
        {
          !message ?
            <span>
              The page you're looking for is like a hidden treasure – not found here. Let's navigate home together!
            </span>
            :
            <span>{message}</span>
        }
      </p>
      <div className='flex gap-4'>
        <button
          onClick={() => handleNavigate("prev")}
          className='btn btn-primary btn-outline rounded-full px-8'
        >
          Go Back
        </button>
        <button
          onClick={() => handleNavigate("/")}
          className='btn btn-primary rounded-full px-8'
        >Go Home</button>
      </div>
    </div>
  )
}

export default NotFound404
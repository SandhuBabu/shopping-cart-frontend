import React from 'react'
import { useSelector } from 'react-redux'
import { refresh } from '../../services/authService'
import { getUser } from '../../services/userService'

const HomePage = () => {

  const user = useSelector(store => store.user)

  return (
    <div>
      <h1 className='text-3xl text-center'>HomePage</h1>

      <pre>
        {JSON.stringify(user, undefined, 4)}
      </pre>

    </div>
  )
}

export default HomePage
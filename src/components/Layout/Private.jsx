import React, {useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const Private = ({children}) => {
    const user = useSelector(store => store.user)
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (!user?.username && !user?.id) {
            return navigate("/", { replace: true })
        }
    }, [])

    return children??<Outlet />
    
}

export default Private
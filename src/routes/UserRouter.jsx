import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/Layout/MainLayout'
import { HomePage, NotFound404 } from '../pages'
import { Signup } from '../components'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route
                    index
                    element={<HomePage />}
                />
                <Route
                    path='cart'
                    element={<p>Cart</p>}
                />
                <Route
                    path='signup'
                    element={<Signup />}
                />
                <Route
                    path='/*'
                    element={<NotFound404 />}
                />
            </Route>
        </Routes>
    )
}

export default Router
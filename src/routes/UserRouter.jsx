import React, {Suspense, lazy} from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/Layout/MainLayout'
import { HomePage, NotFound404 } from '../pages'
import { Signup } from '../components'

const ProductPage = lazy(() => import('../pages/ProductPage/ProductPage'))

const Router = () => {
    return (
       <Suspense fallback={<>loading in user router</>}>
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
                    path='/product/:id'
                    element={<ProductPage />}
                />
                <Route
                    path='/*'
                    element={<NotFound404 />}
                />
            </Route>
        </Routes>
       </Suspense>
    )
}

export default Router
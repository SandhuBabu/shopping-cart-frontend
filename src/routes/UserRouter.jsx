import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/Layout/MainLayout'
import {
    CategoryPage,
    HomePage,
    NotFound404,
    ProductPage,
    SearchFilterPage
} from '../pages'
import { Signup } from '../components'
import { ProductPageSkeleton, ProductsSkeleton } from '../components/skeletons'


const UserRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route
                    index
                    element={
                        <Suspense fallback={<>User Home Loading</>}>
                            <HomePage />
                        </Suspense>
                    }
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
                    element={
                        <Suspense fallback={<ProductPageSkeleton />}>
                            <ProductPage />
                        </Suspense>
                    }
                />
                <Route
                    path='/products'
                    element={
                        <Suspense fallback={<ProductsSkeleton />}>
                            <SearchFilterPage />
                        </Suspense>
                    }
                />
                <Route
                    path='/category/:cat'
                    element={
                        <Suspense fallback={<ProductsSkeleton />}>
                            <CategoryPage />
                        </Suspense>
                    }
                />
                <Route
                    path='/*'
                    element={
                        <NotFound404 />
                    }
                />
            </Route>
        </Routes>
    )
}

export default UserRouter
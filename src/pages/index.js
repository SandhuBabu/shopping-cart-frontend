import { lazy } from 'react';

// user pages
const LazyHomePage = lazy(() => import('./UserPages/HomePage/HomePage'));
const LazyProductPage = lazy(() => import('./ProductPage/ProductPage'));

export {
  LazyHomePage as HomePage,
  LazyProductPage as ProductPage,
};



// admin pages
const LazyAdminHomePage = lazy(() => import('./AdminPages/HomePage'))
const LazyAddProductPage = lazy(() => import('./AdminPages/AddProduct'))
const LazyEditProductPage = lazy(() => import('./AdminPages/EditProduct'))
export {
  LazyAdminHomePage as AdminHomePage,
  LazyAddProductPage as AddProductPage,
  LazyEditProductPage as EditProductPage,
}



//  common pages
const LazyNotFound404 = lazy(() => import('./404/NotFound404'));
export {
  LazyNotFound404 as NotFound404,
};


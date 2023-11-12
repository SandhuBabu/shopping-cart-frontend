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
const LazyProductList = lazy(() => import('./AdminPages/ProductsList'))
export {
  LazyAdminHomePage as AdminHomePage,
  LazyAddProductPage as AddProductPage,
  LazyEditProductPage as EditProductPage,
  LazyProductList as AdminProductsList,
}



//  common pages
const LazyNotFound404 = lazy(() => import('./404/NotFound404'));
const LazySearchWithFilter = lazy(() => import('./ProductPage/Search'))
const LazyCategory= lazy(() => import('./ProductPage/Category'))
export {
  LazyNotFound404 as NotFound404,
  LazySearchWithFilter as SearchFilterPage,
  LazyCategory as CategoryPage
};


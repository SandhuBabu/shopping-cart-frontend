import React, { lazy } from 'react';

// Lazy load components with the "Lazy" prefix
const LazyHomePage = lazy(() => import('./HomePage/HomePage'));
const LazyProductPage = lazy(() => import('./ProductPage/ProductPage'));
const LazyNotFound404 = lazy(() => import('./404/NotFound404'));

// Export components without the "Lazy" prefix
export {
  LazyHomePage as HomePage,
  LazyProductPage as ProductPage,
  LazyNotFound404 as NotFound404,
};

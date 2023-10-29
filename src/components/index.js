import React, { lazy } from 'react';

// Lazy load components with the "Lazy" prefix
const LazyLoginModal = lazy(() => import('./Auth/LoginModal'));
const LazySignup = lazy(() => import('./Auth/Signup'));
const LazyNavbar = lazy(() => import('./Navbar/Navbar'));
const LazyHeader = lazy(() => import('./Header/Header'));
const LazyCarousal = lazy(() => import('./Home/Carousal'));
const LazyNewItems = lazy(() => import('./Home/NewItems'));
const LazyItemCard = lazy(() => import('./Card/ItemCard'));
const LazyProductPageImage = lazy(() => import('./Card/ProductPageImage'));
const LazyFooter = lazy(() => import('./Footer/Footer'));

// Export components without the "Lazy" prefix
export {
  LazyLoginModal as LoginModal,
  LazySignup as Signup,
  LazyNavbar as Navbar,
  LazyHeader as Header,
  LazyCarousal as Carousal,
  LazyNewItems as NewItems,
  LazyItemCard as ItemCard,
  LazyProductPageImage as ProductPageImage,
  LazyFooter as Footer,
};

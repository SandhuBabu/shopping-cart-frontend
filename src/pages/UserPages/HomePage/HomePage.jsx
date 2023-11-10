import React, { Suspense, useEffect, useCallback, useState } from 'react'

import {
  UserHeader,
  ItemCard,
  Carousal,
  NewItems
} from '../../../components'


import { Link } from 'react-router-dom'
import WomesSale from '../../../assets/images/womens_fashion_sale.png'
import { getBudgetFriendlyProducts, getNewArrivals } from '../../../services/productService'

const HomePage = () => {

  const [newArrivals, setNewArrivals] = useState([]);
  const [budgetItems, setBudgetItems] = useState([])

  useEffect(() => {
    handleNewArrivals();
    handleBudgetProducts();
  }, [])

  const handleNewArrivals = useCallback(async () => {
    const data = await getNewArrivals();
    setNewArrivals(data);
  }, [])

  const handleBudgetProducts = useCallback(async () => {
    const data = await getBudgetFriendlyProducts();
    setBudgetItems(data);
  }, [])

  return (
    <>
      <Suspense fallback={<>Loading...Home...</>}>
        <UserHeader />
        <Carousal />

        {/* new arrivals */}
        <section className='mt-[3em]'>
          {
            newArrivals.length > 0 &&
            <>
              <h1 className='text-2xl mt-7 ml-4'>New Arrivals</h1>
              <NewItems data={newArrivals} />
            </>
          }
        </section>

        {/* womens collection */}
        <section className='w-full mt-[3em]'>
          <h1 className='text-2xl mt-7 mb-4'>Womens Collections</h1>
          <Link to='/category/womens'>
            <div className="carousel-item relative w-full h-[18em] rounded-xl overflow-hidden">
              <img src={WomesSale} className="w-full" />
            </div>
          </Link>
        </section>

        {/* budget products */}
        <section className='mt-[3em]'>
          <h1 className='text-2xl ml-4'>Budget Friendly</h1>

          <div className='carousel carousel-center w-full p-4 space-x-4 rounded-box'>
            {
              budgetItems.map((item, k) => (
                <div key={k} className="carousel-item relative w-[22em]">
                  <ItemCard item={item} width="22em" />
                </div>
              ))
            }
          </div>
          <p className='text-right mt-3 mb-6'>
            <Link to="/">Show More</Link>
          </p>
        </section>

        {/* mens collections */}
        <section className='w-full px-3 mt-[3em]'>
          <h1 className='text-2xl mb-4'>Mens Collections</h1>
          <Link to="/category/mens">
            <div className="carousel-item relative w-full h-[18em] rounded-xl overflow-hidden">
              <img src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2023/10/25/913049a9-7bfe-450f-a09e-84eccf2482f21698217415424-Dussehra_Banner-MEN-Without-Date.jpg" className="w-full" />
            </div>
          </Link>
        </section>

        {/* under price */}
        <section className='w-full px-3 mt-[3em]'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
            <Link to="/">
              <div className='h-44 rounded-xl bg-green-300 flex items-center justify-center'>
                <h1 className='text-4xl text-white font-bold'>Under 4999</h1>
              </div>
            </Link>
            <Link to="/">
              <div className='h-44 rounded-xl bg-yellow-200 flex items-center justify-center'>
                <h1 className='text-4xl text-white font-bold'>Under 1999</h1>
              </div>
            </Link>
            <Link to="/">
              <div className='h-44 rounded-xl bg-purple-300 flex items-center justify-center'>
                <h1 className='text-4xl text-white font-bold'>Under 999</h1>
              </div>
            </Link>
          </div>
        </section>
      </Suspense>
    </>
  )
}

export default HomePage
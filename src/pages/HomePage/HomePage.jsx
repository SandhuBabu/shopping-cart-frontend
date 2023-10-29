import React, { Suspense } from 'react'
import { 
  Carousal, 
  Header, 
  ItemCard, 
  NewItems 
} from '../../components'
import { Link } from 'react-router-dom'
import WomesSale from '../../assets/images/womens_fashion_sale.png'

const HomePage = () => {

  return (
    <>
      <Suspense fallback={<>Loading...Home...</>}>
      <Header />
      <Carousal />

      <h1 className='text-2xl mt-7 ml-4'>New Arrivals</h1>
      <NewItems />


      <section className='w-full px-3'>
        <h1 className='text-2xl mt-7 mb-4'>Womens Collections</h1>
        <Link to='/'>
          <div className="carousel-item relative w-full h-[18em] rounded-xl overflow-hidden">
            <img src={WomesSale} className="w-full" />
          </div>
        </Link>
      </section>

      <section>
        <h1 className='text-2xl mt-7 ml-4'>Budget Friendly</h1>

        <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-5'>
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
        <p className='text-right mt-3 mb-6'>
          <Link to="/">Show More</Link>
        </p>
      </section>

      <section className='w-full px-3'>
        <h1 className='text-2xl mt-1 mb-4'>Mens Collections</h1>
        <Link to="/">
          <div className="carousel-item relative w-full h-[18em] rounded-xl overflow-hidden">
            <img src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2023/10/25/913049a9-7bfe-450f-a09e-84eccf2482f21698217415424-Dussehra_Banner-MEN-Without-Date.jpg" className="w-full" />
          </div>
        </Link>
      </section>

      <section className='w-full px-3 mt-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
          <Link to="/">
            <div className='h-44 rounded-xl bg-green-300 flex items-center justify-center'>
              <h1 className='text-4xl text-white font-bold'>Under 4999</h1>
            </div>
          </Link>
          <Link to="/">
            <div className='h-44 rounded-xl bg-yellow-300 flex items-center justify-center'>
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
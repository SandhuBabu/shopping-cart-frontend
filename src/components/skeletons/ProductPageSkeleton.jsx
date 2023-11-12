import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const ProductPageSkeleton = () => {
  return (
    <section className='flex md:flex-row min-h-screen flex-col px-4 gap-[2em]'>
      <Skeleton height="70vh" width="40vw" />
      
      <div>
        <Skeleton className='w-full md:w-40vw' height='2em' />
        <br />
        <Skeleton width='25em' height='1em' count={6} />

        <br />
        <br />

        <Skeleton count={5} />
      </div>

    </section>
  )
}

export default React.memo(ProductPageSkeleton)
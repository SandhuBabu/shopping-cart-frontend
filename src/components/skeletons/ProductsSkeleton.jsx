import React from 'react'
import SkeletonCard from './SkeletonCard'
import Skeleton from 'react-loading-skeleton'
import { scrollToTop } from '../../utils/utils'

const ProductsSkeleton = () => {
    scrollToTop()
    
    return (
        <section className='flex gap-2'>
            <div className='sticky top-[]5em'>
                <Skeleton width='15em' height='87vh' />
            </div>
            <div className='grid sm:grid-cols-[repeat(2,_1fr)] md:grid-cols-[repeat(3,_1fr)] lg:grid-cols-[repeat(5,_1fr)] gap-4'>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        </section>
    )
}

export default React.memo(ProductsSkeleton)
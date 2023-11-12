import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SkeletonCard = () => {
    return (
        <div className='h-[20]'>
            <div>
                <Skeleton width='16em' height='17em' />
                <Skeleton height='1.5em' />
                <div className='flex justify-between pr-4'>
                    <Skeleton height='2em' width='10em' />
                    <Skeleton height='2em' width='2em' />
                </div>
            </div>
        </div>
    )
}

export default SkeletonCard
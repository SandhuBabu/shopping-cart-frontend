import React from 'react'
import { scrollToTop } from '../../utils/utils'
import { ProductsList } from '../../components'

const CategoryPage = () => {

    scrollToTop()
    return (
        <section className='grid grid-cols-[10em_1fr]'>
            <div className='sticky top-[5em] h-[90vh]'>
                Filters
            </div>
            <div className='bg-red-300 h-[150vh]'>
                <ProductsList />
            </div>
        </section>
    )
}

export default CategoryPage
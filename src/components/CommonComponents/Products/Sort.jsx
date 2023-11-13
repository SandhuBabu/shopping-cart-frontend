import React from 'react'
import Select from '../FormElements/Select'


const sortOptions = [
    { title: 'No Sort' },
    { title: 'Price Low to High' },
    { title: 'Price High to High' },
]


const Sort = ({handleSort}) => {
    return (
        <div className='w-[15em] h-[85vh] sticky top-[5em]'>
            <Select
                onChange={handleSort}
                defaultValue="No Sort"
                options={sortOptions}
                title="Sort By"
                name="price"
            />
        </div>
    )
}

export default React.memo(Sort)
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { setProductsEmpty } from '../../../features/productsSlice';

const ProductsFilter = ({ loading = false, handleGetProducts }) => {

    const [fullWidth, setFullWidth] = useState(false)
    const [params, setParams] = useSearchParams();
    const dispatch = useDispatch();


    /**
     * dont change params when value changed
     * only change after apply button clicked
     */

    const handleFilter = useCallback((e) => {
        const { name, value } = e.target
        params.set(name, value)
    }, [])

    const applyFilters = useCallback(() => {
        dispatch(setProductsEmpty());
        setParams(params)
        handleGetProducts(1, params.toString());
    }, [])

    const removeFilter = (e) => {
        console.log(e.target.name);
        params.delete(e.target.name);
        setParams(params)
    }

    return (
        <div className={`${fullWidth ? 'w-[18em] overflow-y-scroll filter-scrollbar' : 'w-[5em]'}  h-[88vh] sticky top-[5em] left-0 px-2 shadow rounded-md `}>
            <div className='flex items-center gap-4 mt-5'>
                <button
                    className='btn btn-circle'
                    onClick={() => setFullWidth(prev => !prev)}
                >
                    <span className="material-symbols-outlined">
                        tune
                    </span>
                </button>
                {fullWidth && <h4>Filters</h4>}
            </div>

            {
                fullWidth &&
                <section>

                    {/* price */}
                    <div className='mt-5'>
                        <h4 className='my-2 font-[500]'>Price</h4>
                        <p className='flex mt-3 items-center gap-2'>
                            <input
                                type="radio"
                                name="price"
                                className="radio radio-sm radio-primary"
                                value={500}
                                onChange={handleFilter}
                            />
                            <span className='whitespace-nowrap'>Less Than 500</span>
                        </p>
                        <p className='flex mt-3 items-center gap-2'>
                            <input
                                type="radio"
                                name="price"
                                className="radio radio-sm radio-primary"
                                value={1000}
                                onChange={handleFilter}
                            />
                            <span className='whitespace-nowrap'>Less Than 1000</span>
                        </p>
                        <p className='flex mt-3 items-center gap-2'>
                            <input
                                type="radio"
                                name="price"
                                className="radio radio-sm radio-primary"
                                value={1500}
                                onChange={handleFilter}
                            />
                            <span className='whitespace-nowrap'>Less Than 1500</span>
                        </p>
                        <p className='flex mt-3 items-center gap-2'>
                            <input
                                type="radio"
                                name="price"
                                className="radio radio-sm radio-primary"
                                onChange={removeFilter}
                            />
                            <span className='whitespace-nowrap'>Remove Price Filter</span>
                        </p>
                    </div>

                    {/* category */}
                    <div className='mt-5'>
                        <h4 className='my-2 font-[500]'>Category</h4>
                        <p className='flex mt-3 items-center gap-2'>
                            <input
                                type="radio"
                                name="category"
                                className="radio radio-sm radio-primary"
                                value='electronics'
                                onChange={handleFilter}
                            />
                            <span className='whitespace-nowrap'>Electronics</span>
                        </p>
                        <p className='flex mt-3 items-center gap-2'>
                            <input
                                type="radio"
                                name="category"
                                className="radio radio-sm radio-primary"
                                value='dress'
                                onChange={handleFilter}
                            />
                            <span className='whitespace-nowrap'>Dress</span>
                        </p>
                        <p className='flex mt-3 items-center gap-2'>
                            <input
                                type="radio"
                                name="category"
                                className="radio radio-sm radio-primary"
                                value='fashion'
                                onChange={handleFilter}
                            />
                            <span className='whitespace-nowrap'>Fashion</span>
                        </p>
                        <p className='flex mt-3 items-center gap-2'>
                            <input
                                type="radio"
                                name="category"
                                className="radio radio-sm radio-primary"
                                value='accessories'
                                onChange={handleFilter}
                            />
                            <span className='whitespace-nowrap'>Accessories</span>
                        </p>
                        <p className='flex mt-3 items-center gap-2'>
                            <input
                                type="radio"
                                name="category"
                                className="radio radio-sm radio-primary"
                                onChange={removeFilter}
                            />
                            <span className='whitespace-nowrap'>Remove Category Filter</span>
                        </p>
                    </div>

                    {/* gender */}
                    <div className='mt-5'>
                        <h4 className='my-2 font-[500]'>Gender</h4>
                        <p className='flex mt-3 items-center gap-2'>
                            <input
                                type="radio"
                                name="gender"
                                className="radio radio-sm radio-primary"
                                value='male'
                                onChange={handleFilter}
                            />
                            <span className='whitespace-nowrap'>Male</span>
                        </p>
                        <p className='flex mt-3 items-center gap-2'>
                            <input
                                type="radio"
                                name="gender"
                                className="radio radio-sm radio-primary"
                                value='female'
                                onChange={handleFilter}
                            />
                            <span className='whitespace-nowrap'>Female</span>
                        </p>
                        <p className='flex mt-3 items-center gap-2'>
                            <input
                                type="radio"
                                name="gender"
                                className="radio radio-sm radio-primary"
                                value='unisex'
                                onChange={handleFilter}
                            />
                            <span className='whitespace-nowrap'>Unisex</span>
                        </p>
                        <p className='flex mt-3 items-center gap-2'>
                            <input
                                type="radio"
                                name="gender"
                                className="radio radio-sm radio-primary"
                                onChange={removeFilter}
                            />
                            <span className='whitespace-nowrap'>Remove Gender Filter</span>
                        </p>
                    </div>

                    <p className='text-center my-5'>
                        <button
                            disabled={loading}
                            onClick={applyFilters}
                            className='btn btn-primary text-white'
                        >Apply Filter</button>
                    </p>
                </section>
            }
        </div>
    )
}

export default React.memo(ProductsFilter)
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { scrollToTop } from '../../utils/utils';
import { getSearchItems } from '../../services/productService';
import { addProducts, setProductsEmpty } from '../../features/productsSlice';
import { ProductsList, Select } from '../../components';
import NotFound404 from '../404/NotFound404'

const sortOptions = [
    { title: 'No Sort' },
    { title: 'Price Low to High' },
    { title: 'Price High to High' },
]

const Category = () => {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { cat } = useParams();

    const pageNo = useRef(1);
    const { last, empty, content } = useSelector(store => store.products)

    const controller = new AbortController();
    const signal = controller.signal;
    const [sort, sortReducer] = useReducer(content);


    useEffect(() => {
        console.log("SORT NOT PROVIDED");

        scrollToTop()
        handleGetProducts(pageNo.current);

        return () => {
            controller.abort();
            dispatch(setProductsEmpty())
        }
    }, [])


    const handleGetProducts = useCallback(async (pageNo) => {
        setLoading(true)
        const { error, ...data } = await getSearchItems(`category=${cat}`, pageNo, signal)
        if (!error) {
            dispatch(addProducts(data))
        }
        setLoading(false)
    }, [])

    const handleSort = ({target}) => {
        console.log(target.value);
    }

    if (!loading && content.length < 1) {
        return <NotFound404 message={<>No products available for the category <strong className='capitalize'>{cat}</strong></>} />
    }


    return (
        <div className='px-5'>
            <div className='w-[15em] my-5'>
                <Select
                    onChange={handleSort}
                    defaultValue="No Sort"
                    options={sortOptions}
                    title="Sort By"
                    name="price"
                />
            </div>
            {
                !loading
            }

            {content.length > 0 && <ProductsList />}

            <p className='text-center mt-[2em]'>
                {
                    !last && !empty &&
                    <button
                        onClick={() => handleGetProducts(++pageNo.current)}
                        disabled={loading}
                        className='btn hover:btn-primary'
                    >
                        <span>
                            {
                                loading ? 'Loading' : 'Load More'
                            }
                        </span>
                        {
                            loading &&
                            <span className="loading loading-spinner"></span>
                        }
                    </button>
                }
            </p>
        </div>
    )
}

export default Category
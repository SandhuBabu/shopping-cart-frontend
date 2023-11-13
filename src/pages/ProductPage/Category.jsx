import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { scrollToTop } from '../../utils/utils';
import { getSearchItems } from '../../services/productService';
import { addProducts, setProductsEmpty, updateContent } from '../../features/productsSlice';
import { ProductsList, Select, Sort } from '../../components';
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


    useEffect(() => {
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

    const handleSort = ({ target }) => {
        const type = target.value.replaceAll(" ", '');
        switch (type) {
            case 'PriceLowtoHigh':
                const lowToHigh = content.slice().sort((a, b) => a.price - b.price)
                dispatch(updateContent(lowToHigh))
                break;
            case 'PriceHightoHigh':
                const highToLow = content.slice().sort((a, b) => b.price - a.price)
                dispatch(updateContent(highToLow))
                break;
            case 'NoSort':
                const noSort = content.slice().sort((a, b) => a.id - b.id)
                dispatch(updateContent(noSort))
                break;
        }
    }

    if (!loading && content.length === 0) {
        return <NotFound404 message={<>No products available for the category <strong className='capitalize'>{cat}</strong></>} />
    }

    return (
        <div className='flex px-5'>
            <Sort handleSort={handleSort} />

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
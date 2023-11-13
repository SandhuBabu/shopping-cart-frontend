import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ProductsList, Sort } from '../../components'
import { scrollToTop } from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getSearchResults } from '../../services/productService'
import { addProducts, setProductsEmpty, updateContent } from '../../features/productsSlice'
import { NotFound404 } from '..'


const SearchResults = () => {

    const [loading, setLoading] = useState(true);
    const { term } = useParams();
    const dispatch = useDispatch();

    const pageNo = useRef(1);
    const { last, empty, content } = useSelector(store => store.products)

    const controller = new AbortController();
    const signal = controller.signal;
    const navigate = useNavigate();

    useEffect(() => {
        scrollToTop()
        handleGetProducts(pageNo.current, term);

        if (!term) {
            return navigate('/', { replace: true })
        }

        return () => {
            controller.abort();
            dispatch(setProductsEmpty())
        }
    }, [term])

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

    const handleGetProducts = useCallback(async (pageNo, term) => {
        setLoading(true)
        const { error, ...data } = await getSearchResults(term, pageNo, signal)

        if (!error) {
            dispatch(addProducts(data))
        }
        setLoading(false)
    }, [term])


    if (!loading && content.length < 1) {
        return <NotFound404 message={`No Search Results found for ${term}`} />
    }

    return (
        <div className='flex'>
            <Sort handleSort={handleSort} />
            <div className='px-5'>
                {content.length > 0 && <ProductsList />}

                <p className='text-center mt-[2em]'>
                    {
                        !last && !empty &&
                        <button
                            onClick={() => handleGetProducts(++pageNo.current, term)}
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
        </div>
    )
}

export default React.memo(SearchResults)
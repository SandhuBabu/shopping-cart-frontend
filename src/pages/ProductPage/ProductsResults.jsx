import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ProductsFilter, ProductsList } from '../../components'
import { scrollToTop } from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getSearchItems } from '../../services/productService'
import { addProducts, setProductsEmpty } from '../../features/productsSlice'


const ProductsResults = () => {

    const [loading, setLoading] = useState(true);
    const [params, setParams] = useSearchParams();
    const dispatch = useDispatch();

    const pageNo = useRef(1);
    const { last, empty, content } = useSelector(store => store.products)

    const controller = new AbortController();
    const signal = controller.signal;


    useEffect(() => {
        scrollToTop()
        handleGetProducts(pageNo.current, params.toString());

        return () => {
            controller.abort();
            dispatch(setProductsEmpty())
        }
    }, [])


    const handleGetProducts = useCallback(async (pageNo, params) => {
        setLoading(true)
        const { error, ...data } = await getSearchItems(params, pageNo, signal)

        if (!error) {
            dispatch(addProducts(data))
        }
        setLoading(false)
    }, [])

    return (
        <div className='flex'>
            <ProductsFilter loading={loading} handleGetProducts={handleGetProducts} />
            <div className='px-5'>

                {
                    !loading
                }

                {content.length > 0 && <ProductsList />}

                <p className='text-center mt-[2em]'>
                    {
                        !last && !empty &&
                        <button
                            onClick={() => handleGetProducts(++pageNo.current, params.toString())}
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

export default React.memo(ProductsResults)
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { setAdminTitle } from '../../utils/utils'
import { getAllProductsPaginated } from '../../services/productService'
import { DataTable } from '../../components'
import { refresh } from '../../services/authService'


const heading = [
  "ID",
  "Image",
  "Title",
  "Category",
  "Price (Rs)",
  "Stock Available",
]

const HomePage = () => {

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)

  setAdminTitle("Admin")

  useEffect(() => {
    handleGetProduct();
  }, [])

  const handleGetProduct = useCallback(async () => {
    const { error, data } = await getAllProductsPaginated(10);
    if (error) {
      setError(error)
      return
    }

    const filterProducts = data.map(item => {
      return {
        id: item.id,
        imageUrl: item.imageUrl,
        title: item.title,
        category: item.category,
        price: item.price,
        stockAvailable: item.stockAvailable
      }
    })

    setProducts(filterProducts)
  }, [])

  const handleDelete = useCallback((id) => {
    const newProducts = products.filter(item => item.id !== id);
    setProducts(newProducts)
  }, [products])



  return (
    <div>
      <h1 className='text-3xl my-4 mx-3'>Admin Home Page</h1>
      <Link to='/product/1' className='link text-blue-500 m-4'>products</Link>
      <Link to='/addProduct' className='link text-blue-500 m-4'>add products</Link>

      <div className='max-w-[50em] p-3 bg-base-300 rounded-lg'>
        {!error && <DataTable heading={heading} body={products} handleDelete={handleDelete} />}
      </div>

    </div>
  )
}

export default HomePage
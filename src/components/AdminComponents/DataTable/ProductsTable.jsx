import React from 'react'
import { Link } from 'react-router-dom'
import Select from '../../CommonComponents/FormElements/Select'

const pageOptions = [3, 5, 7, 10, 15]

const ProductsTable = ({ heading, body, totalPages, currentPage, handleDelete, handleEdit, setPageSize }) => {

    return (
        <div className="overflow-x-auto">
            <h1 className='text-3xl text-center my-5'>All Products</h1>

            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <td>SlNo</td>
                        {
                            heading.map((title, k) => (
                                <td key={k}>{title}</td>
                            ))
                        }
                    </tr>
                </thead>

                {/* body */}
                <tbody>
                    {
                        body.map((row, i) => (
                            <tr key={i} className='hover:bg-base-200'>
                                <td>{i + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="rounded-lg w-12 h-12">
                                            <img src={row?.imageUrl} alt="" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="tooltip" data-tip={`View ${row.title}`}>
                                        <Link to={`/product/${row?.id}`}>{row?.title}</Link>
                                    </div>
                                </td>
                                <td>{row?.category}</td>
                                <td className='text-center'>{row?.price}</td>
                                <td className='text-center'>{row?.stockAvailable}</td>
                                <td className='flex gap-3'>
                                    <button className='btn btn-circle' onClick={() => handleEdit(row.id)}>
                                        <span className="material-symbols-outlined text-yellow-400">
                                            edit
                                        </span>
                                    </button>
                                    <button className='btn btn-circle' onClick={() => handleDelete(row.id)}>
                                        <span className="material-symbols-outlined text-red-400">
                                            delete
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>

                {/* foot */}
                <tfoot>
                    <tr>
                        <td>SlNo</td>

                        {
                            heading.map((title, k) => (
                                <td key={k}>{title}</td>
                            ))
                        }
                    </tr>
                </tfoot>
            </table>
            <p className='mt-5 ml-3 tracking-wide font-[300]'>
                Showing
                <span> {currentPage}</span> of
                <span> {totalPages}</span> pages
            </p>
        </div>
    )
}

export default React.memo(ProductsTable)
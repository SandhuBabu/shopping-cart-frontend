import React from 'react'

const ProductsTable = ({ heading, body, handleDelete }) => {

    return (
        <div className="overflow-x-auto">
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
                        body.map((row, i) =>(
                        <tr key={i} className='hover:bg-base-200'>
                        <td>{i+1}</td>
                        {
                            Object.entries(row).map(([k, v], key) => (
                                <td key={key}>
                                    {
                                        k === "imageUrl" ?
                                            <div className="avatar">
                                                <div className="rounded-lg w-12 h-12">
                                                    <img src={v} alt="" />
                                                </div>
                                            </div>
                                            :
                                            v
                                    }
                                </td>
                            ))
                        }
                        <td>
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
        </div>
    )
}

export default React.memo(ProductsTable)
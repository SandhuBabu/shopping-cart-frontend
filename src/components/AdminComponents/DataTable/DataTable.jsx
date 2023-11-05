import React, { useCallback } from 'react'

const DataTable = ({ heading, body, handleDelete }) => {

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
                        body.map((row, k) => (
                            <Row slNo={k + 1} key={k} data={{ ...row }} handleDelete={handleDelete} />
                        ))
                    }
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

export default React.memo(DataTable)


const Row = React.memo(({ slNo, data, handleDelete }) => {

    return (
        <tr className='hover:bg-base-200'>
            <td>{slNo}</td>
            {
                Object.entries(data).map(([k, v], i) => (
                    <td key={i}>
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
                <button className='btn btn-circle' onClick={() => handleDelete(data.id)}>
                    <span className="material-symbols-outlined text-red-400">
                        delete
                    </span>
                </button>
            </td>
        </tr>
    )
})

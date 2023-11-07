import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumbs = ({ breadCrumbsOptions }) => {
    return (
        <div className="text-sm breadcrumbs my-8 pl-10">
            <ul>
                {
                    breadCrumbsOptions.map((opt, k) => (
                        <li key={k}>
                            {
                                opt?.path?
                                <Link to={opt?.path}>{opt?.title}</Link>
                                :
                                <span>{opt.title}</span>
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default BreadCrumbs
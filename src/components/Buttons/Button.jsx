import React from 'react'

const Button = ({children, classNames, onClick, ...rest}) => {
  return (
    <button className={classNames} onClick={onClick} {...rest}>
        {children}
    </button>
  )
}

export default Button
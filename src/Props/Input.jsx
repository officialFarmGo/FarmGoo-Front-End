import React from 'react'
import "../CSS/InputStyling.css"
const Input = (props) => {
  return (
    <input
      className={`input ${props.className}`}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  )
}

export default Input
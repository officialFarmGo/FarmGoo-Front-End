import React from 'react'
import '../CSS/InputStyling.css'
const Buttons = (props) => {
  return (
    <>
      <button 
      className={`button ${props.className}`}
      onClick={props.onClick}
      >{props.text}</button>
    </>
  )
}

export default Buttons

import React from 'react'

export default function Custom_buttons(props) {
  
  return (
    <div>
        <button
       onClick={props.onClick}
    className={
       
         props.className
      }
    
    >{props.text} {props.icon}</button>
         
        </div>
  )
}

import React from 'react'

export default function Custom_input(props) {
   
  return (
    <>
       
       
  <div className={props.width}>
    <label for="exampleNumber0" className={props.labelcolor}
      >{props.placeholder}</label>
    <input
       type={props.type}
       name={props.name}
       className={props.className}
       value={props.value}
       onChange={(e) => props.handleInputData(e.target.value)}
       placeholder={props.placeholder}
    />
    <span className='text-red-800 ml-3'>{props.errormessage}</span>
  </div>
</>
    
  )
}
